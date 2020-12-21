package com.example.chat;

public class Jugador {
	private String nombre;

	public Jugador(){
		nombre=null;
	}
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public void delete() {
		nombre=null;
	}
	
}
