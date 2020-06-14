package com.recipies.Myrecipies_app.Exception;

 

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.ResponseStatus;

 

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class NosuchUserException extends RuntimeException {

 

                public NosuchUserException(String message){

                                super(message);

                                new ExceptionResponse("Bad request","either empty data or missing data exception");

                               

                }             

               

}

