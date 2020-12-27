package com.example.chat;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import java.util.Scanner;

import javax.annotation.PostConstruct;

import java.util.ArrayList;
import java.util.List;


import java.io.FileNotFoundException;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

@RestController
@RequestMapping(value = "chat")
public class ChatControlador {

	private int contador = 0;
	private List<Frase> chat = new ArrayList<>();
	private FileWriter myWriter;
	private List<String> lista=new ArrayList<>();
	private Scanner s;
	private Scanner a;
	private boolean llamadaTxt=false;
	
	@PostConstruct
	public void init() throws IOException {
			myWriter = new FileWriter("chat.txt", true);
			String[] arra ;
			String linea;
			a=new Scanner(new File("chat.txt"));
			if(new BufferedReader(new FileReader("chat.txt")).lines().count()>0) {
			if(new BufferedReader(new FileReader("chat.txt")).lines().count()<=5) {
					
				while (a.hasNextLine()){
				    linea=a.nextLine();
				    arra= linea.split(":");
				    chat.add(0,(new Frase(arra[0],arra[1])) );
				}
					
			}
			else {
				for(int i=0;i<new BufferedReader(new FileReader("chat.txt")).lines().count()-5;i++) {
					a.nextLine();
				}
				while (a.hasNextLine()){
				    linea=a.nextLine();
				    arra=linea.split(":");
				    chat.add(0, (new Frase(arra[0],arra[1])) );
				}
				}
			
			
			}
			a.close();
		
	}
	
	@CrossOrigin
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Frase postChat(@RequestBody Frase frase) throws FileNotFoundException {
		if (contador >= 99) {
			//chat.remove(99);
		} else {
			contador++;
		}
		chat.add(0, frase);
		meterTxt(frase);

		return frase;
	}

	@SuppressWarnings("resource")
	public synchronized void meterTxt(Frase frase) throws FileNotFoundException {

		try {
			myWriter = new FileWriter("chat.txt", true);
			if(new BufferedReader(new FileReader("chat.txt")).lines().count()>=100) {
				s=new Scanner(new File("chat.txt"));	
				s.nextLine();
				
				while (s.hasNextLine()){
				    lista.add(s.nextLine());
				}
				s.close();
				myWriter.close();
				myWriter = new FileWriter("chat.txt");
				for(int i=0;i<lista.size();i++) {
					myWriter.write(lista.get(i)+"\n");					
				}
				myWriter.write(frase.getId()+":"+frase.getFrase()+"\n");
				myWriter.close();
				lista.clear();
			}
			else {
				myWriter.write(frase.getId()+":"+frase.getFrase()+"\n");
				myWriter.close();
			}
			System.out.println("Lines"+new BufferedReader(new FileReader("chat.txt")).lines().count());
			
			//BufferedReader reader = new BufferedReader(new FileReader("chat.txt"));
			//reader.close();
			
			
			
		} catch (IOException e) {
			System.out.println("Ha ocurrido un error");
			e.printStackTrace();
		}

	}

	@CrossOrigin
	@GetMapping
	public List<Frase> getTodoElChat() {		
		
		return chat;
	}

}
