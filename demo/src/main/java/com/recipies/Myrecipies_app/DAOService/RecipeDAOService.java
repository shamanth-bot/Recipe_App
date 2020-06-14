package com.recipies.Myrecipies_app.DAOService;

 

import java.util.ArrayList;

import java.util.List;

import java.util.UUID;

import java.util.Arrays;

 

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Service;

 

import com.recipies.Myrecipies_app.Entity.Customer;

import com.recipies.Myrecipies_app.Entity.Login;

import com.recipies.Myrecipies_app.Entity.Recipe_detail;

import com.recipies.Myrecipies_app.Exception.ResourceNotFounexception;

import com.recipies.Myrecipies_app.Repository.CustomerRepository;

import com.recipies.Myrecipies_app.Repository.LoginRepository;

import com.recipies.Myrecipies_app.Repository.RecipeListRepository;

 

@Service

public class RecipeDAOService {

               

                Logger logger = LoggerFactory.getLogger(RecipeDAOService.class);

               

                @Autowired

                private RecipeListRepository ResipeRepo;

               

               

               

               

 

 

                public ResponseEntity<Object> getRecipe(String recipe_Name){

                                String [] Recipename=recipe_Name.split(" ");

        String[] recipe_Names = Arrays.stream(Recipename)

                .filter(value ->

                        value != null && value.length() > 0 && value!=""

                )

                .toArray(size -> new String[size]);

 

                                Arrays.asList(Recipename).removeIf(item -> item == null || "".equals(item));

                                List<Recipe_detail> list = new ArrayList<Recipe_detail>();

                                String previous_name="";

                                List<Boolean> val = new ArrayList<Boolean>();

                                try{

                                                List<Recipe_detail> details = ResipeRepo.findAll();

                                                if(details!=null){

                                                                for(Recipe_detail detail:details){

                                                                                if(detail.getRecipe_Name().trim().equalsIgnoreCase(recipe_Name)){

                                                                                                list.add(0,detail);

                                                                                }

                                                                                else{

                                                                                                for(String name:recipe_Names){

 

                                                                                                                if(detail.getRecipe_Name().trim().toLowerCase().contains(name.toLowerCase().trim())){

                                                                                                                                val.add(true);   

 

                                                                                                                }else{

                                                                                                                                val.add(false);

 

                                                                                                                }            

                                                                                                }

                                                                                                if(val.indexOf(false)==-1){

                                                                                                                list.add(0,detail);

 

                                                                                                }

                                                                                                else if(val.indexOf(true)!=-1){

                                                                                                                list.add(detail);

 

                                                                                                }

                                                                                }

                                                                               

 

                                                                                val.clear();

 

                                                                }

                                                                return ResponseEntity.status(HttpStatus.OK).body(list);

 

                                                               

                                                }

                                                else{

                                                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

                                                }

                                }

                               

                                catch(Exception c){

                                                logger.error(c.toString());

                                                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

                                }             

                }

               

               

 

                public ResponseEntity<Object> getRecipeByCategory(String recipe_Name,String Category){

                               

 

                                String [] Recipename=recipe_Name.split(" ");

        String[] recipe_Names = Arrays.stream(Recipename)

                .filter(value ->

                        value != null && value.length() > 0 && value!=""

                )

                .toArray(size -> new String[size]);

 

                                Arrays.asList(Recipename).removeIf(item -> item == null || "".equals(item));

                                List<Recipe_detail> list = new ArrayList<Recipe_detail>();

                                String previous_name="";

                                List<Boolean> val = new ArrayList<Boolean>();

                                try{

                                                List<Recipe_detail> details = ResipeRepo.getRecipebyCategory(Category);

                                                if(details!=null){

                                                                for(Recipe_detail detail:details){

                                                                                if(detail.getRecipe_Name().trim().equalsIgnoreCase(recipe_Name)){

                                                                                                list.add(0,detail);

                                                                                }

                                                                                else{

                                                                                                for(String name:recipe_Names){

 

                                                                                                                if(detail.getRecipe_Name().trim().toLowerCase().contains(name.toLowerCase().trim())){

                                                                                                                                val.add(true);   

 

                                                                                                                }else{

                                                                                                                                val.add(false);

 

                                                                                                                }            

                                                                                                }

                                                                                                if(val.indexOf(false)==-1){

                                                                                                                list.add(0,detail);

 

                                                                                                }

                                                                                                else if(val.indexOf(true)!=-1){

                                                                                                                list.add(detail);

 

                                                                                                }

                                                                                }

                                                                               

 

                                                                                val.clear();

 

                                                                }

                                                                return ResponseEntity.status(HttpStatus.OK).body(list);

 

                                                               

                                                }

                                                else{

                                                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

                                                }

                                }

                               

                                catch(Exception c){

                                                logger.error(c.toString());

                                                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

                                }             

                }

 

 

 

               

               

 

}

 

