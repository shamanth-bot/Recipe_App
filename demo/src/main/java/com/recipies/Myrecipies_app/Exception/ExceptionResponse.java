package com.recipies.Myrecipies_app.Exception;

 

import java.util.Date;

 

public class ExceptionResponse {

      

      

       private String message;

      

       private String description;

      

      

       public ExceptionResponse(String message,String description){

              this.message = message;

              this.description= description;

       }

 

 

       public String getMessage() {

              return message;

       }

 

       public void setMessage(String message) {

              this.message = message;

       }

 

       public String getDescription() {

              return description;

       }

 

       public void setDescription(String description) {

              this.description = description;

       }

      

      

 

}

 

