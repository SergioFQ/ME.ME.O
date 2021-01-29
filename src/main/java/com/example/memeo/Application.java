package com.example.memeo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class Application implements WebSocketConfigurer{

	@Override
	public void registerWebSocketHandlers(
			WebSocketHandlerRegistry registry) {
		registry.addHandler(socketHandler(), "/socket")
		.setAllowedOrigins("*");
	}
	
	@Bean
	public Web socketHandler() {
		return new Web();
	}
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
