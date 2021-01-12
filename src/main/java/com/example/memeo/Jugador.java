package com.example.memeo;

public class Jugador {
	private String nombre;
	private int sprite;
	
	public Jugador(){
		nombre=null;
		sprite = -1;
	}
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public int getSprite() {
		return sprite;
	}
	public void setSprite(int sprite) {
		this.sprite = sprite;
	}
	public void delete() {
		nombre=null;
	}
	
}
