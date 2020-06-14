package com.recipies.Myrecipies_app.Controller;

 

import java.net.URI;

import java.util.ArrayList;

import java.util.HashMap;

import java.util.HashSet;

import java.util.List;

import java.util.Map;

import java.util.Optional;

 

import javax.validation.Valid;

 

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;

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

import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

 

import com.recipies.Myrecipies_app.DAOService.MailDAOService;

import com.recipies.Myrecipies_app.DAOService.RegisterDAOService;

import com.recipies.Myrecipies_app.Entity.Customer;

import com.recipies.Myrecipies_app.Entity.Login;

import com.recipies.Myrecipies_app.Entity.Photos_List;

import com.recipies.Myrecipies_app.Entity.Recipe_detail;

import com.recipies.Myrecipies_app.Exception.ResourceNotFounexception;

import com.recipies.Myrecipies_app.Repository.CustomerRepository;

import com.recipies.Myrecipies_app.Repository.LoginRepository;

 

@CrossOrigin(origins = "http://localhost:3000")

@RestController

public class Registerresource {

 

               

                Logger  registerLogger= LoggerFactory.getLogger(Registerresource.class);

               

                @Autowired

                private CustomerRepository registerRepo;

               

                @Autowired

                private LoginRepository LoginRepo;

               

               

                @Autowired

                private RegisterDAOService regDAOSservice;

               

               

                @Autowired

                private MailDAOService MailService;

 

                @GetMapping(path="/api/Register/Users")

                public List<Customer> getCustomers(){

                  return registerRepo.findAll();

                }

 

               

                @GetMapping(path="/api/Register/UsernameEmail_Details")

                public ResponseEntity<Object> getCustomersUserName(){

                    Map<String,HashSet<String>> valid_response = new HashMap<String, HashSet<String>>();

                    Map<String,String> invalid_response = new HashMap<String,String>();

 

                    HashSet<String> uname = new HashSet<String>();

                    HashSet<String> email = new HashSet<String>();

 

                                List<Customer> cus= registerRepo.findAll();

                                  if(cus==null){

                                                  registerLogger.error("Unable to find any customer");

                                                  invalid_response.put("Status","404 not found");

                                                  invalid_response.put("message", "unable to find the any Customer data at all");

 

                                                  return ResponseEntity.status(HttpStatus.NOT_FOUND).body(invalid_response);

                 

                                  }

 

                               

                                for(int i =0;i<cus.size();i++){

                                                uname.add(cus.get(i).getUserName());

                                                email.add(cus.get(i).getEmail());

                                }

                                valid_response.put("username_List", uname);

                               

                                valid_response.put("email_list", email);

                                  return ResponseEntity.status(HttpStatus.OK).body(valid_response);

 

                               

                }

               

               

                /*@GetMapping(path="/api/Register/{id}/login")

                public Login getCustomers(@PathVariable Integer id){

                                Optional<Customer> cus = registerRepo.findById(id);

                                System.out.println(cus.get().getEmail());

                                Login login= cus.get().getLoginPosts();

                  System.out.println(login.getPassword());

                  System.out.println(login);

                                return login;

                }*/

               

               

 

                @GetMapping(path="/api/Register/User")

                @ResponseBody

                public ResponseEntity<Object> getCustomer(@RequestParam("id") Integer id){

                    Map<String,String> response = new HashMap<String, String>();

 

                //Optional<Customer> cus =  registerRepo.findById(id);

                  Customer cus = registerRepo.getCustomer(id);

                  if(cus==null){

                                  registerLogger.error("Unable to find any customer");

 

                                                response.put("Status","404 not found");

                                                response.put("message", "unable to find the Customer with id "+id);

 

                                  return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

 

                  }

                  else{

                                  registerLogger.info("Customer with id"+id+" is fetched");

                  return ResponseEntity.status(HttpStatus.OK).body(cus);

                  }

                }             

                               

                @PostMapping(path="/api/Register/Users")

                @ResponseBody

                public ResponseEntity<Object> postRegisterCustomer(@Valid @RequestBody Customer customer){

                    Map<String,String> response = new HashMap<String, String>();

 

                                if(customer==null&&customer.getEmail()==null)

                                                throw new ResourceNotFounexception("Empty or missing data exception");

               

 

                                Customer postedCustomer = regDAOSservice.postCustomer(customer);

 

                                if(postedCustomer!=null){

                                                String Url = regDAOSservice.generateURL(postedCustomer.getRegisterToken());

                                    boolean getemail= MailService.sendEmailforRegisterUSer(customer.getEmail().trim(),Url,postedCustomer.getFirstName());

              if(!getemail){

                                               response.put("Status","500");

                                                response.put("message", ""+"cant send an email for register");

 

                                                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);


              }

                                                response.put("Status","201 Created");

                                                response.put("message", "Successfully posted Customer with id "+postedCustomer.getCusid());

                                                  registerLogger.info("Customer with id"+postedCustomer.getCusid()+" Successfully posted");

 

                                URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(postedCustomer.getCusid()).toUri();

                                return ResponseEntity.status(HttpStatus.CREATED).location(location).body(response);

                               

                               

                }

                                else{

                                                response.put("Status","501 internal server error");

                                                response.put("message", ""+"Unable to post the customer,email might not be unique");

 

                                                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

 

                                }

               

                }

               

               

                @GetMapping(path="/api/Register/getToken")

                @ResponseBody

                public ResponseEntity<Object> getToken(@RequestParam("token") String token){

                    Map<String,String> response = new HashMap<String, String>();

                    System.out.println(token);

           try{

                                   Customer login_user  =registerRepo.getToken(token);

                                  

                                   if(login_user==null){

                                                                response.put("Status","404 NOT_FOUND");

                                                                response.put("message", "Token "+ token +" Does not exist");

 

                                                                  return ResponseEntity.status(HttpStatus.OK).body(response);

                                   }

                                   else{

                                                                response.put("Status","200");

                                                                response.put("message", "Token"+token +" is valid");

                                                                  return ResponseEntity.status(HttpStatus.OK).body(response);

 

                                   }

           }

           catch(Exception c){

                                                                response.put("Status","500 internal server error");

                                                                response.put("message", "could not connect for solution");

                                                                  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

                  

           }

 

               

                }

               

               

    @PostMapping(path ="api/Register/User/uploadProfilePhoto")

    @ResponseBody

    public  ResponseEntity<Object> upload_MultipleFilestoDB(@RequestParam("cusID") Integer CusiD,@RequestParam("file") MultipartFile  files) {

                Map<String,String> response = new HashMap<String, String>();

                                try{

                                Customer detail =             registerRepo.getCustomer(CusiD);

                                                if(detail==null){

                                                                response.put("Status","404");

                                                                response.put("message", "No data Found");

 

                                                                  return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

 

                                                }

                               

                                detail.setProfile_photo(files.getBytes());

                                registerRepo.save(detail);

                                URI location = ServletUriComponentsBuilder.fromCurrentRequest().replaceQuery("").path("/{id}").buildAndExpand(CusiD).toUri();

                                                  return ResponseEntity.status(HttpStatus.CREATED).location(location).body(detail);

                              

                                }

                                catch(Exception c){

                                                response.put("Status","501");

                                                response.put("message", "Internal server error");

                                                  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

 

                                }

       

 

        }

 

 

   

    @PostMapping(path ="api/Register/User/uploadCoverPhoto")

    @ResponseBody

    public  ResponseEntity<Object> upload_CoverPhototoDB(@RequestParam("cusID") Integer CusiD,@RequestParam("file") MultipartFile  files) {

                Map<String,String> response = new HashMap<String, String>();

                                try{

                                Customer detail =             registerRepo.getCustomer(CusiD);

                                                if(detail==null){

                                                                response.put("Status","404");

                                                                response.put("message", "No data Found");

 

                                                                  return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

 

                                                }

                               

                                detail.setCover_photo(files.getBytes());

                                registerRepo.save(detail);

                                URI location = ServletUriComponentsBuilder.fromCurrentRequest().replaceQuery("").path("/{id}").buildAndExpand(CusiD).toUri();

                                                  return ResponseEntity.status(HttpStatus.CREATED).location(location).body(detail);

                              

                                }

                                catch(Exception c){

                                                response.put("Status","501");

                                                response.put("message", "Internal server error");

                                                  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

 

                                }

       

 

        }

 

               

                @PostMapping(path="/api/Register/UpdateToken")

                @ResponseBody

                public ResponseEntity<Object> updateToken(@RequestParam("token") String token){

                               

                    Map<String,String> response = new HashMap<String, String>();

                    System.out.println(token);

           try{

                                   Customer login_user= registerRepo.getToken(token);

                                   if(login_user==null){

                                                                response.put("Status","404 NOT_FOUND");

                                                                response.put("message", "Token "+ token +" Does not exist");

 

                                                                  return ResponseEntity.status(HttpStatus.OK).body(response);

                                   }

                                   else{

                                                      Login login =regDAOSservice.updateCustomer(login_user);

                                                      if(login!=null){

                                                                                                response.put("Status","201");

                                                                                                response.put("message", "The customer with cusID "+login_user.getCusid()+"updated");

                 

                                                      }

                                                                  return ResponseEntity.status(HttpStatus.OK).body(response);

                                                                                               

                                   }

           }

           catch(Exception c){

                                                                response.put("Status","500 internal server error");

                                                                response.put("message", "could not connect for solution");

                                                                  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

                  

           }

 

                }

               

               

                @PutMapping(path="/api/Register/Users")

                @ResponseBody

                public ResponseEntity<Object> updateAccountDetails(@Valid @RequestBody Customer user, @RequestParam("id") Integer id){

                    Map<String,String> response = new HashMap<String, String>();                

                                try{

                                                System.out.println(user.getDob());

                    Customer updated_User = registerRepo.findById(id).map(cus->{

                    if(user.getFirstName()!=null&&(user.getFirstName()!="")&&(!user.getFirstName().isEmpty()))cus.setFirstName(user.getFirstName());

                    if(user.getLastName()!=null&&(user.getLastName()!="")&&(!user.getLastName().isEmpty()))cus.setLastName(user.getLastName());

                    if(user.getUserName()!=null&&(user.getUserName()!="")&&(!user.getUserName().isEmpty()))cus.setUserName(user.getUserName());

                                if(user.getDob()!=null)cus.setDob(user.getDob());

                    if(user.getOccupation()!=null&&(user.getOccupation()!="")&&(!user.getOccupation().isEmpty()))cus.setOccupation(user.getOccupation());

                    if(user.getWebSite()!=null&&(user.getWebSite()!="")&&(!user.getWebSite().isEmpty()))cus.setWebSite(user.getWebSite());

 

                    if(user.getEbtYourself()!=null&&(user.getEbtYourself()!="")&&(!user.getEbtYourself().isEmpty()))cus.setEbtYourself(user.getEbtYourself());

 

           return registerRepo.saveAndFlush(cus);

                    }).orElseGet(() -> {

                                user.setCusid(id);

                        return registerRepo.save(user);

                      });

                   

                          if(updated_User==null){

                                                                  registerLogger.error("cant update user for id"+id);

 

                                 response.put("Status", "404");

                                 response.put("message", "Cannot update user details");

 

                                                  return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

 

                          }

                          else{

                                 Login login = LoginRepo.getUserbyCusid(id);

                                 if(user.getFirstName()!=null&&(user.getFirstName()!="")&&(!user.getFirstName().isEmpty()))

                                 login.setFirstName(user.getFirstName());

                                 LoginRepo.save(login);

                                               URI location = ServletUriComponentsBuilder.fromCurrentRequest().replaceQuery("").path("/{id}").buildAndExpand(updated_User.getCusid()).toUri();

                                                return ResponseEntity.status(HttpStatus.CREATED).location(location).body(updated_User);

 

                          }

                                }

                                catch(Exception c){

                                                  registerLogger.error("cant update user for id"+id);

 

                                                response.put("Status", "501");

                 response.put("message", "Incrrect URl or data format");

                                return ResponseEntity.status(HttpStatus.CREATED).body(response);

 

 

                                }

               

                }

 

               

 

 

               

}

 

