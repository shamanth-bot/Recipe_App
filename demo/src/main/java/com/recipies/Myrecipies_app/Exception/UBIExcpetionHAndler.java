package com.recipies.Myrecipies_app.Exception;

 

import java.util.Date;

 

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ControllerAdvice;

import org.springframework.web.bind.annotation.ExceptionHandler;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.context.request.WebRequest;

import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

 

 


@ControllerAdvice

@RestController

 

public class UBIExcpetionHAndler extends ResponseEntityExceptionHandler{

               

                @ExceptionHandler(Exception.class)

                public final ResponseEntity<Object> handleExcpetion(Exception ex,WebRequest w){

                                ExceptionResponse resp=            new ExceptionResponse(ex.getMessage(),w.getDescription(false));

                                return new ResponseEntity(resp,HttpStatus.INTERNAL_SERVER_ERROR);

                               

                }

 

               

                @ExceptionHandler(NosuchUserException.class)

                public final ResponseEntity<Object> habdleExcpetion(Exception ex,WebRequest w){

                                ExceptionResponse resp=            new ExceptionResponse("no such user found",w.getDescription(false));

                                return new ResponseEntity(resp,HttpStatus.NOT_FOUND);

                               

                }

 

               

                @ExceptionHandler(ResourceNotFounexception.class)

                public final ResponseEntity<Object> reourcenotfound(Exception ex,WebRequest w){

                                ExceptionResponse resp=            new ExceptionResponse("no such user found",w.getDescription(false));

                                return new ResponseEntity(resp,HttpStatus.BAD_REQUEST);

                               

                }

 

}

 

 

