package com.recipies.Myrecipies_app.DAOService;

 

import java.util.Date;

import java.util.UUID;

 

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

 

import com.recipies.Myrecipies_app.Email.MailBodyTemplate;

import com.recipies.Myrecipies_app.Entity.Login;

import com.recipies.Myrecipies_app.Entity.Mail;

import com.recipies.Myrecipies_app.Repository.LoginRepository;

 

@Service

public class ForgotPasswordDAOService {

                @Autowired

                private LoginRepository loginRepo;

 

               

                public String generateURL(Login user){

                                try{

                                                   String token = UUID.randomUUID().toString();

                                                       user.setLogin_token(token);

                                                       user.setToken_expiry_Date(new Date());

                                                       user.setPwd_resetStatus("In Progress");

                                                       loginRepo.save(user);

                                       String url = "http://localhost:3000/password_reset/"+token;

              return url;

                                }

                                catch(Exception c){

                                                return null;

                                }

 

                }

 

 

}

