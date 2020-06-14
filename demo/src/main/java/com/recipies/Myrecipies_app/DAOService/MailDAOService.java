package com.recipies.Myrecipies_app.DAOService;

 

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.env.Environment;

import org.springframework.stereotype.Service;

 

import com.recipies.Myrecipies_app.Email.MailBodyTemplate;

import com.recipies.Myrecipies_app.Email.MailServiceImpl;

import com.recipies.Myrecipies_app.Entity.Mail;

 

@Service

public class MailDAOService {

                public static final String forgot_password_subject =  "My Recipes  password  Reset link";

                public static final String sent_from=  "spring.mail.sentFrom";

                public static final String Register_user =  "Registartion confirmation for Myrecipes";

 

                Logger logger = LoggerFactory.getLogger(MailDAOService.class);

 

                @Autowired

                private MailServiceImpl mailservice;

               

    @Autowired

    private Environment env;

 

 

                public boolean sendEmailforForgotPassord(String email,String url,String name){

                                try{

                                MailBodyTemplate template = new MailBodyTemplate();

                               

                     Mail mail = new Mail();

                     mail.setMailFrom(env.getProperty(sent_from));
                     
                     mail.setMailTo(email);

                     mail.setMailSubject(forgot_password_subject);

                     mail.setMailContent(template.getForgetPasswordBody(name,url));

                     mailservice.sendEmail(mail);

                                return true;

                                }

                                catch(Exception c){

                                                logger.error(c.toString());

                                                return false;

                                }

 

                }

               

                public boolean sendEmailforRegisterUSer(String email,String url,String name){

                                try{

                                MailBodyTemplate template = new MailBodyTemplate();

                               

                     Mail mail = new Mail();

                     mail.setMailFrom(env.getProperty(sent_from));

                     mail.setMailTo(email);

                    mail.setMailSubject(Register_user);

                     mail.setMailContent(template.getRegisterBody(name, url));

                     mailservice.sendEmail(mail);

                                return true;

                                }

                                catch(Exception c){

                                                logger.error(c.toString());

                                                return false;

                                }

 

                }

               

 

}

