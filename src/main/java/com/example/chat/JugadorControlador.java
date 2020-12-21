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

@RestController
@RequestMapping(value="/chat/jugador")
public class JugadorControlador {
	private Jugador jugadores[]=new Jugador[2];
	
	@CrossOrigin
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Jugador postJugador(@RequestBody Jugador jugador){
		if(jugadores[0]==null) {
			jugadores[0]=jugador;
		}
		else {
			jugadores[1]=jugador;
		}
		return jugador;
	}
	
	@CrossOrigin
	@GetMapping
	public Jugador[] getJugadores(){	
	return jugadores;	
	}
	
	@CrossOrigin
	@DeleteMapping(value="/{jug}")
	public ResponseEntity<String> deleteJugador(@PathVariable String jug) {
		//MIRAR SI EL PRIMERO NULL
		if(jug.equals(jugadores[0].getNombre())) {
			jugadores[0]=null;
			return new ResponseEntity<>(jug,HttpStatus.OK);
		}
		else{
		jugadores[1]=null;
		return new ResponseEntity<>(jug,HttpStatus.OK);
		}
		
	}
	
}
