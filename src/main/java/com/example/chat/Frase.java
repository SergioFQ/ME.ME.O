package com.example.chat;

import java.io.Serializable;

public class Frase implements Serializable{

	private String frase;
	private String id;

	
	public Frase(){}
	public Frase(String id,String frase){
		this.id=id;
		this.frase=frase;
	}
	
	public String getFrase() {
		return frase;
	}
	public void setFrase(String frase) {
		this.frase = frase;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
}
