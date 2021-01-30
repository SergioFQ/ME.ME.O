package com.example.memeo;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import javax.swing.Timer;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class Web extends TextWebSocketHandler {
	
	private ObjectMapper lectorJson = new ObjectMapper();
	private Map<String, WebSocketSession> clientes = new ConcurrentHashMap<>();
	private List<WebSocketSession> jugadoresListos = new ArrayList<>();
	private int readyPlayers = 0;
	private ObjectNode nodeTimer;
	private ObjectNode nodeTimer1;
	private boolean started = false;
	Random r = new Random();
	
	Timer timerJug0 = new Timer(2000, new ActionListener(){
        @Override
        public void actionPerformed(ActionEvent e) {
        	nodeTimer = lectorJson.createObjectNode();
        	nodeTimer.put("event", "BALA");
        	for(WebSocketSession participant : clientes.values()) {
					try {
						participant.sendMessage(new TextMessage(nodeTimer.toString()));
					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}				
			}
        	timerJug0.stop();
			timerJug0.restart();
        }
    });
	
	/*Timer timerJug1 = new Timer(1000, new ActionListener(){
        @Override
        public void actionPerformed(ActionEvent e) { 
			System.out.println("plataforma loca: ");       	
        	nodeTimer1 = lectorJson.createObjectNode();
        	nodeTimer1.put("event", "PLATAFORMAS");
        	for(WebSocketSession participant : clientes.values()) {
					try {
						participant.sendMessage(new TextMessage(nodeTimer1.toString()));
					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}				
			}
        	//timerJug1.restart();

        	if(started>30) {
            	timerJug1.stop();        		
        	}
        	started++;
        }
    });*/
	
	public void generateMap() throws Exception{
		System.out.println("plataforma loca: ");
		int randomNum = (int)r.nextInt(3);
    	nodeTimer1 = lectorJson.createObjectNode();
    	nodeTimer1.put("event", "PLATAFORMAS");
    	nodeTimer1.put("randNumberPlat", randomNum);
    	for(WebSocketSession participant : clientes.values()) {				
					participant.sendMessage(new TextMessage(nodeTimer1.toString()));			
		}
	}
	@Override
	public synchronized void afterConnectionEstablished(WebSocketSession session) throws Exception {
		if(clientes.size()<2) {
			System.out.println("New user: " + session.getId());			
			clientes.put(session.getId(), session);	
		}	
	}
		
	@Override
	protected synchronized void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		//System.out.println("Message received: " + message.getPayload());
		JsonNode node = lectorJson.readTree(message.getPayload());
		
		sendMessage(session, node);
	}
	
	private synchronized void sendMessage(WebSocketSession session, JsonNode node) throws Exception {

		//System.out.println("Message sent: " + node.toString());
		//System.out.println("Ready players: " + readyPlayers);
		ObjectNode newNode = lectorJson.createObjectNode();
		switch(node.get("event").asText()){
			case "UPDATE MOVEMENT":
			newNode.put("event", "UPDATE MOVEMENT");
			newNode.put("x", node.get("movement").get("x").asDouble());
			newNode.put("y", node.get("movement").get("y").asDouble());
			newNode.put("posX", node.get("movement").get("posX").asDouble());
			newNode.put("posY", node.get("movement").get("posY").asDouble());
			for(WebSocketSession participant : clientes.values()) {
				if(!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}
			if(!started && jugadoresListos.get(1)!=null) {
				started = true;
				generateMap();
			}
			break;
			
			case "EMOJI":
				newNode.put("event", "EMOJI");
				newNode.put("idEmoji", node.get("idEmoji").asInt());
				for(WebSocketSession participant : clientes.values()) {
					if(!participant.getId().equals(session.getId())) {
						participant.sendMessage(new TextMessage(newNode.toString()));
					}
				}
				break;
			case "READY":
				readyPlayers++;
				jugadoresListos.add(session);
				//System.out.println("Ready players: " + readyPlayers);	
				newNode.put("event", "READY");				
				if(readyPlayers>=2) {
					readyPlayers = 0;
					newNode.put("startGame",true);
					for(WebSocketSession participant : clientes.values()) {
						//if(!participant.getId().equals(session.getId())) {
							participant.sendMessage(new TextMessage(newNode.toString()));
						//}
					}
					timerJug0.start();
				}
				
				break;
			case "VICTORY":
				newNode.put("event", "VICTORY");
				newNode.put("idSprite", node.get("victoryId").get("sprite").asText());
				newNode.put("nameVictory", node.get("victoryId").get("name").asText());

				System.out.println("idSprite: "+node.get("victoryId").get("sprite").asText());
				System.out.println("nameVictory: "+node.get("victoryId").get("name").asText());
				for(WebSocketSession participant : clientes.values()) {
					//if(!participant.getId().equals(session.getId())) {
						participant.sendMessage(new TextMessage(newNode.toString()));
					//}
				}
				break;
		}
		
		
		/*for(WebSocketSession participant : clientes.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}*/
	}
	
	@Override
	public synchronized void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		//Player player = (Player) session.getAttributes().get(PLAYER_ATTRIBUTE);
		//game.removePlayer(player);
		System.out.println("User removed: " + session.getId());
		started = false;
		if(readyPlayers!=0) {
			if(jugadoresListos.get(0).getId().equals(session.getId())) {
				readyPlayers--;
				jugadoresListos.remove(0);
			}else if(jugadoresListos.get(1).getId().equals(session.getId())) {
				readyPlayers--;
				jugadoresListos.remove(1);
			}
		}
		ObjectNode msg = lectorJson.createObjectNode();
		//msg.put("event", "REMOVE PLAYER");
		//msg.put("id", player.getPlayerId());
		//game.broadcast(msg.toString());
		clientes.remove(session.getId(), session);
	}
	

	
}
