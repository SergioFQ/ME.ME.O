package com.example.chat;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.Timer;

@RestController
@RequestMapping(value="chat/jugador")
public class JugadorControlador {
	private Jugador jugadores[]=new Jugador[2];
	private int numberPlayers = 0;
	
	Timer timerJug0 = new Timer(4000, new ActionListener(){
        @Override
        public void actionPerformed(ActionEvent e) {
        	if(jugadores[0]!=null) {
        	
            jugadores[0]=null;
            numberPlayers=numberPlayers-1;
        	}
        }
    });
	
	Timer timerJug1 = new Timer(4000, new ActionListener(){
        @Override
        public void actionPerformed(ActionEvent e) {
        	if(jugadores[1]!=null) {           	
        	 jugadores[1]=null;
        	 numberPlayers=numberPlayers-1;
        	}
        }
    });
	
	@CrossOrigin
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Jugador postJugador(@RequestBody Jugador jugador){
		if(numberPlayers<2) {
			if(jugadores[0]==null) {
				jugadores[0]=jugador;
				timerJug0.start();
			}
			else {
				jugadores[1]=jugador;
				timerJug1.start();
			}
			numberPlayers++;
		}
		return jugador;	
	}
	
	@CrossOrigin
	@PostMapping(value="/estado")
	@ResponseStatus(HttpStatus.CREATED)
	public Jugador postJugadorEstado(@RequestBody Jugador jugador){
		if(jugadores[0]!=null) {
			if(jugadores[0].getNombre().equals(jugador.getNombre())) {
				//RESET TIMER JUG 0
				timerJug0.stop();
				timerJug0.restart();
				return jugador;
			}
		}
		if(jugadores[1]!=null) {
			if(jugadores[1].getNombre().equals(jugador.getNombre())) {
				//RESET TIMER JUG 1
				timerJug1.stop();
				timerJug1.restart();
				return jugador;
			}
		}
		return jugador;
		//return jugador;
	}
	@CrossOrigin
	@GetMapping
	public Jugador[] getJugadores(){	
	return jugadores;	
	}
	
	@CrossOrigin
	@DeleteMapping(value="/{jug}")
	public ResponseEntity<String> deleteJugador(@PathVariable String jug) {
		if(jugadores[0]==null&&numberPlayers>0) {
			jugadores[1] = null;
			timerJug1.restart();
			timerJug1.stop();
			
		}else if(numberPlayers>0) {

			if(jug.equals(jugadores[0].getNombre())) {
				jugadores[0]=null;
				timerJug0.restart();
				timerJug0.stop();
			} 
			else{
			jugadores[1]=null;
			timerJug1.restart();
			timerJug1.stop();
			}
		}
		else {
			return null;
		}
		numberPlayers--;
		return new ResponseEntity<>(jug,HttpStatus.OK);
		
	}
	
}
