package com.recipies.Myrecipies_app.Exception;

 

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.ResponseStatus;

 

@ResponseStatus(HttpStatus.NOT_FOUND)

public class ResourceNotFounexception extends RuntimeException {

 

                public ResourceNotFounexception(String message){

                                super(message);

                                new ExceptionResponse("error posting record",message);

                               

                }             

               

}

