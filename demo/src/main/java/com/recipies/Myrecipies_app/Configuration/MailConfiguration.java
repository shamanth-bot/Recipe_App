package com.recipies.Myrecipies_app.Configuration;

 

import java.util.Properties;

 

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.ComponentScan;

import org.springframework.context.annotation.Configuration;

import org.springframework.core.env.Environment;

import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.mail.javamail.JavaMailSenderImpl;

 

import com.recipies.Myrecipies_app.Email.MailService;

import com.recipies.Myrecipies_app.Email.MailServiceImpl;

 

@Configuration

@ComponentScan("com.recipies")

 

public class MailConfiguration {

               

    @Autowired

    private Environment env;

 

               

    @Bean

    public JavaMailSender getMailSender() {

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();


        mailSender.setHost(env.getProperty("spring.mail.host"));

        mailSender.setPort(587);

        mailSender.setUsername(env.getProperty("spring.mail.username"));

        mailSender.setPassword(env.getProperty("spring.mail.password"));

        Properties javaMailProperties = new Properties();

        javaMailProperties.put("mail.smtp.starttls.enable", "true");

        javaMailProperties.put("mail.smtp.auth", "true");

        javaMailProperties.put("mail.transport.protocol", "smtp");

        javaMailProperties.put("mail.debug", "true");


        mailSender.setJavaMailProperties(javaMailProperties);

        return mailSender;

    }

 

    @Bean

    public MailService getMailservice() {

    return new MailServiceImpl();

    }

   

    

 

}

