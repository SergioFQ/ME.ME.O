package com.example.memeo;

import java.io.Serializable;

public class Frase implements Serializable{

	private String frase;
	private String id;
	private String fecha;

	
	public Frase(){}
	public Frase(String id,String frase,String fecha){
		this.id=id;
		this.frase=frase;
		this.fecha=fecha;
	}
	
	public String getFrase() {
		return frase;
	}
	public void setFrase(String frase) {
		this.frase = frase;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha=fecha;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
}
