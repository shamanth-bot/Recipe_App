package com.recipies.Myrecipies_app.Controller;

 

import java.net.URI;

import java.util.HashMap;

import java.util.List;

import java.util.Map;

import java.util.Optional;

import java.util.UUID;

 

import javax.validation.Valid;

 

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.SpringApplication;

import org.springframework.context.ApplicationContext;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

 

import com.recipies.Myrecipies_app.MyrecipiesAppApplication;

import com.recipies.Myrecipies_app.DAOService.ForgotPasswordDAOService;

import com.recipies.Myrecipies_app.DAOService.MailDAOService;

import com.recipies.Myrecipies_app.Email.MailService;

import com.recipies.Myrecipies_app.Email.MailServiceImpl;

import com.recipies.Myrecipies_app.Entity.Customer;

import com.recipies.Myrecipies_app.Entity.Login;

import com.recipies.Myrecipies_app.Entity.Mail;

import com.recipies.Myrecipies_app.Exception.NosuchUserException;

import com.recipies.Myrecipies_app.Repository.CustomerRepository;

import com.recipies.Myrecipies_app.Repository.LoginRepository;

 

@CrossOrigin(origins = "http://localhost:3000")

@RestController

public class Loginresource {

               

                @Autowired

                private LoginRepository LoginRepo;

               

                @Autowired

                private MailDAOService MailService;

               

                @Autowired

                private CustomerRepository RegisterRepo;

 

               

                @Autowired

                private ForgotPasswordDAOService forgotpwdService;;

               

               

               

               

                @GetMapping(path="/api/Login/Users")

                @ResponseBody

                public ResponseEntity<Object> getAllRegisterdCustomer(){

                    Map<String,String> response = new HashMap<String, String>();

        List<Login> users = LoginRepo.findAll();

        if(!users.isEmpty()&&users.size()>0){

                                                  return ResponseEntity.status(HttpStatus.OK).body(users);

 

        }

        else{

                                                response.put("Status","404 NOT_FOUND");

                                                response.put("message", "No registered users found");

 

               return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

        }

                               

                               

                }

 

               

                @GetMapping(path="/api/Login/Users/{cus_id}")

                @ResponseBody

                public ResponseEntity<Object> getRegisterdCustomer(@PathVariable Integer cus_id){

                    Map<String,String> response = new HashMap<String, String>();

        Login user = LoginRepo.getUserbyCusid(cus_id);

        if(user!=null){

                                                  return ResponseEntity.status(HttpStatus.OK).body(user);

 

        }

        else{

                                                response.put("Status","404 NOT_FOUND");

                                                response.put("message", "No registered users found");

 

               return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

        }

                               

                               

                }

 

                @GetMapping(path="/api/Login/User")

                @ResponseBody

                public ResponseEntity<Object> getAllRegisterdCustomer(@RequestParam("email") String email,@RequestParam("password") String password){

                    Map<String,String> response = new HashMap<String, String>();

        Login user = LoginRepo.getUserDetails(email, password);

        if(user==null){

                                                response.put("Status","404 NOT_FOUND");

                                                response.put("message", "customer with email "+email+"does not esist");

 

                                                  return ResponseEntity.status(HttpStatus.OK).body(response);

 

        }

        else{

               return ResponseEntity.status(HttpStatus.OK).body(user);

        }

                               

                               

                }

               

               

               

                @PostMapping(path="/api/Login/forgotPassword")

                @ResponseBody

                public ResponseEntity<Object> postRegisterCustomer(@RequestParam("email") String email){

                    Map<String,String> response = new HashMap<String, String>();

                   Login login_user  =LoginRepo.getUser(email);

                  

                   if(login_user==null){

                                   System.out.println("SAMPLE");

                                                response.put("Status","404 NOT_FOUND");

                                                response.put("message", "email is not registered.");

 

                                                  return ResponseEntity.status(HttpStatus.OK).body(response);

                   }

                  

                   if(login_user.getPwd_resetStatus()!=null){

                                                response.put("Status","404 Reset_Inprogress");

                                                response.put("message", "email is not registered.");

                                                  return ResponseEntity.status(HttpStatus.OK).body(response);

 

      

                   }

                   String url = forgotpwdService.generateURL(login_user);

                //Optional<Login> cus =  LoginRepo.findById(id);

    boolean getemail= MailService.sendEmailforForgotPassord(email.trim(),url,login_user.getFirstName());

    

                 

                  if(getemail==false){

                                                response.put("Status","EMAIL_POST_FAILED");

                                                response.put("message", "could not send the email from password reset");

 

                                  return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

 

                  }

                  else{

                                                response.put("Status","201 CREATED");

                                                response.put("message", "successfully generatedemail for passwrd reset");

 

                  return ResponseEntity.status(HttpStatus.OK).body(response);

                  }

 

                }

               

                @GetMapping(path="/api/Login/Passwordreset/getToken")

                @ResponseBody

                public ResponseEntity<Object> getToken(@RequestParam("token") String token){

                    Map<String,String> response = new HashMap<String, String>();

                    System.out.println(token);

           try{

                                   Login login_user  =LoginRepo.getToken(token);

                                   System.out.println(login_user.getLogin_token());

                                   if(login_user==null){

                                                                response.put("Status","404 NOT_FOUND");

                                                                response.put("message", "Token Does not exist");

 

                                                                  return ResponseEntity.status(HttpStatus.OK).body(response);

                                   }

                                   else{

                                                                response.put("Status","200");

                                                                response.put("message", "Token is valid");

                                                                  return ResponseEntity.status(HttpStatus.OK).body(response);

 

                                   }

           }

           catch(Exception c){

                                                                response.put("Status","500 internal server error");

                                                                response.put("message", "could not connect for solution");

                                                                  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

                  

           }

 

               

                }

               

                @PostMapping(path="/api/Login/Passwordreset/resetPassword")

                @ResponseBody

                public ResponseEntity<Object> setPassword(@RequestParam("password") String password,@RequestParam("token") String token){

                    Map<String,String> response = new HashMap<String, String>();

                System.out.println("token"+token);

                                   Login login_user  =LoginRepo.getToken(token);

                                   if(login_user==null){

                                                                response.put("Status","404 NOT_FOUND");

                                                                response.put("message", "Token Does not exist");

 

                                                                  return ResponseEntity.status(HttpStatus.OK).body(response);

                                   }

                                   else{

                                                   login_user.setLogin_Password(password);

                                                   login_user.setLogin_token(null);

                                                   login_user.setPwd_resetStatus(null);;

                                                   login_user.setToken_expiry_Date(null);

                                                   LoginRepo.save(login_user);

                                                                response.put("Status","200");

                                                                response.put("message", "Password reset successful");

 

                                                                  return ResponseEntity.status(HttpStatus.OK).body(response);

 

                                   }

 

 

               

                }

               

                @PutMapping(path="/api/Login/Users")

                @ResponseBody

                public ResponseEntity<Object> updateAccountDetails(@Valid @RequestBody Login user, @RequestParam("id") Integer id){

                    Map<String,String> response = new HashMap<String, String>();

                    try {

                                                Thread.sleep(10000);

                                } catch (InterruptedException e) {

                                                // TODO Auto-generated catch block

                                                e.printStackTrace();

                                }

                   

                    Login updated_User = LoginRepo.getUserbyCustomerId(id).map(login->{

                                if(user.getLogin_Password()!=null)login.setLogin_Password(user.getLogin_Password());

                                if(user.getLogin_countryCode()!=null)login.setLogin_countryCode(user.getLogin_countryCode());

                                    if(user.getLogin_ContactNumber()!=null)login.setLogin_ContactNumber(user.getLogin_ContactNumber());

           return LoginRepo.save(login);

                    }).orElseGet(() -> {

                                user.setId(id);

                        return LoginRepo.save(user);

                      });

                   

                          if(updated_User==null){

                                 response.put("Status", "404");

                                 response.put("message", "Cannot update user details");

 

                                                  return ResponseEntity.status(HttpStatus.OK).body(response);

 

                          }

                          else{

                                 if(user.getLogin_Password()!=null){

                                                 Customer customer = RegisterRepo.getCustomer(id);

                                                 customer.setPwd(user.getLogin_Password());

                                                 RegisterRepo.save(customer);

                                 }

 

                                 URI location = ServletUriComponentsBuilder.fromCurrentRequest().replaceQuery("").path("/{id}").buildAndExpand(updated_User.getId()).toUri();

                                 return ResponseEntity.status(HttpStatus.CREATED).location(location).body(updated_User);



           }





 }







}

