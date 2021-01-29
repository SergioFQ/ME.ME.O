package com.example.memeo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
	
	private void sendMessage(WebSocketSession session, JsonNode node) throws IOException {

		//System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = lectorJson.createObjectNode();
		switch(node.get("event").asText()){
			case "UPDATE MOVEMENT":
			newNode.put("event", "UPDATE MOVEMENT");
			newNode.put("x", node.get("movement").get("x").asDouble());
			newNode.put("y", node.get("movement").get("y").asDouble());
			newNode.put("posX", node.get("movement").get("posX").asDouble());
			newNode.put("posY", node.get("movement").get("posY").asDouble());
			break;
			
			case "EMOJI":
				newNode.put("event", "EMOJI");
				newNode.put("idEmoji", node.get("idEmoji").asInt());
				break;
		}
		
		
		for(WebSocketSession participant : clientes.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}
	
	@Override
	public synchronized void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		//Player player = (Player) session.getAttributes().get(PLAYER_ATTRIBUTE);
		//game.removePlayer(player);

		ObjectNode msg = lectorJson.createObjectNode();
		//msg.put("event", "REMOVE PLAYER");
		//msg.put("id", player.getPlayerId());
		//game.broadcast(msg.toString());
		clientes.remove(session.getId(), session);
	}
	

	
}
