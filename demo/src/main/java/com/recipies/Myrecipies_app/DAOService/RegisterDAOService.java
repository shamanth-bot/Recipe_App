package com.recipies.Myrecipies_app.DAOService;

 

import java.util.Date;

import java.util.UUID;

 

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

 

import com.recipies.Myrecipies_app.Entity.Customer;

import com.recipies.Myrecipies_app.Entity.Login;

import com.recipies.Myrecipies_app.Exception.ResourceNotFounexception;

import com.recipies.Myrecipies_app.Exception.UBIExcpetionHAndler;

import com.recipies.Myrecipies_app.Repository.CustomerRepository;

import com.recipies.Myrecipies_app.Repository.LoginRepository;

 

@Service

public class RegisterDAOService {

               

                Logger logger = LoggerFactory.getLogger(RegisterDAOService.class);

               

                @Autowired

                private CustomerRepository CustomerRepo;

               

                @Autowired

                private LoginRepository loginRepo;

               

               

               

 

 

                public Customer postCustomer(Customer customer){

                                   String token = UUID.randomUUID().toString();

 

                                try{

                                                if(customer==null||customer.getEmail()==null)

                                                                throw new ResourceNotFounexception("Empty or missing data exception");

            customer.setRegisterToken(token);

                                                Customer register = CustomerRepo.save(customer);

                                                Login login = new Login(register.getCusid(),register.getEmail(),register.getPwd(),register.getFirstName());

                                                login.setCustomer_validated("No");

                                                loginRepo.save(login);

                                                return register;

                                }

                               

                                catch(Exception c){

                                                logger.error(c.toString());

                                                return null;

                                }             

                }

               

               

                public String generateURL(String token){

                                try{

                                       String url = "http://localhost:3000/Registration_Confirmation/"+token;

              return url;

                                }

                                catch(Exception c){

                                                return null;

                                }

 

                }

 

                public Login updateCustomer(Customer cus){

                                if(cus==null)

                                                throw new ResourceNotFounexception("Empty or missing data exception");

 

                      Integer cus_id =cus.getCusid();

                      System.err.println(cus_id);

                      cus.setRegisterToken(null);

                      CustomerRepo.save(cus);

                      Login login =loginRepo.getUserbyCusid(cus_id);

                      if(login==null){

                                                return null; 

                      }                       

                      else{

                                  System.out.println("login"+login.getCustomer_validated());

                                  login.setCustomer_validated("Yes");

                                  loginRepo.save(login);

                                  return login;

                      }

                                  

                                  

                      

                      

                      

 

                }

                                               

 

 

}

