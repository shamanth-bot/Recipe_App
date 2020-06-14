package com.recipies.Myrecipies_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.recipies")
public class MyrecipiesAppApplication {
	public static void main(String[] args) {
		SpringApplication.run(MyrecipiesAppApplication.class,args);
	}
	

}
