package com.example.chat;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping(value="/chat")
public class ChatControlador {

	private int contador=0;
	private List<Frase>chat=new ArrayList<>();	
	
	@CrossOrigin
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Frase postChat(@RequestBody Frase frase){
	if(contador>=99) {
		chat.remove(99);
	}
	else {
		contador++;
	}
	chat.add(0,frase);
	
	
	return frase;	
	}
	
	@CrossOrigin
	@GetMapping
	public List<Frase> getTodoElChat(){	
	return chat;	
	}
	
	
/*	@CrossOrigin(value="/jugadores")
	@GetMapping(value="/jugadores")
	public Jugador[] getJugadores(){	
	return jugadores;	
	}
	
	@CrossOrigin(value="/jugadores")
	@PostMapping(value="/jugadores")
	@ResponseStatus(HttpStatus.CREATED)
	public Jugador postChat(@RequestBody Jugador jugador){
		if(jugadores[0]==null) {
			jugadores[0]=jugador;
		}
		else {
			jugadores[1]=jugador;
		}
		return jugador;
	}*/
	
}
