package com.recipies.Myrecipies_app.Email;

 

import java.io.UnsupportedEncodingException;

 

import javax.mail.MessagingException;

import javax.mail.internet.InternetAddress;

import javax.mail.internet.MimeMessage;

 

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.mail.javamail.MimeMessageHelper;

import org.springframework.stereotype.Service;

 

import com.recipies.Myrecipies_app.DAOService.RegisterDAOService;

import com.recipies.Myrecipies_app.Entity.Mail;

 

 

@Service

public class MailServiceImpl implements MailService{

 

                Logger logger = LoggerFactory.getLogger(MailServiceImpl.class);

 

    @Autowired

    JavaMailSender mailSender;

 

               

                public boolean sendEmail(Mail mail) {

                               

       

        try {

            MimeMessage mimeMessage = mailSender.createMimeMessage();

 

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);


            mimeMessageHelper.setSubject(mail.getMailSubject());

            mimeMessageHelper.setFrom(new InternetAddress(mail.getMailFrom()));

            mimeMessageHelper.setTo(mail.getMailTo());

            mimeMessageHelper.setText(mail.getMailContent(),true);


            mailSender.send(mimeMessageHelper.getMimeMessage());

            return true;

 

        } catch (MessagingException e) {

               logger.error(e.toString());

               return false;

           

        }

 

 

                                // TODO Auto-generated method stub

                               

                }






 

}

