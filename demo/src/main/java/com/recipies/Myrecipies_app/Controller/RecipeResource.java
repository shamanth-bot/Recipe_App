package com.recipies.Myrecipies_app.Controller;

 

import java.net.URI;

import java.util.ArrayList;

import java.util.Date;

import java.util.HashMap;

import java.util.List;

import java.util.Map;

 

import javax.validation.Valid;

 

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.DeleteMapping;

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

 

import com.recipies.Myrecipies_app.DAOService.RecipeDAOService;

import com.recipies.Myrecipies_app.Entity.Comments;

import com.recipies.Myrecipies_app.Entity.Customer;

import com.recipies.Myrecipies_app.Entity.Login;

import com.recipies.Myrecipies_app.Entity.Photos_List;

import com.recipies.Myrecipies_app.Entity.Rating;

import com.recipies.Myrecipies_app.Entity.Recipe_detail;

import com.recipies.Myrecipies_app.Repository.CommentsRepository;

import com.recipies.Myrecipies_app.Repository.CustomerRepository;

import com.recipies.Myrecipies_app.Repository.PhotolistRepository;

import com.recipies.Myrecipies_app.Repository.RatingRepository;

import com.recipies.Myrecipies_app.Repository.RecipeListRepository;

 

@CrossOrigin(origins = "http://localhost:3000")

@RestController

public class RecipeResource {

 

               

               

                @Autowired

                private RecipeListRepository recipeRepo;

               

                @Autowired

                private PhotolistRepository photoRepo;

               

               

                @Autowired

                private RatingRepository ratngRepo;

               

                @Autowired

                private CommentsRepository comentsRepo;

               

                @Autowired

                private RecipeDAOService recipeService;

               

                @GetMapping(path="/api/RecipeList/recipes")

                public ResponseEntity<Object> getCustomers(){

                  return ResponseEntity.status(HttpStatus.OK).body(recipeRepo.findAll());

                }

 

                @GetMapping(path="/api/RecipeList/recipe")

                @ResponseBody

                public ResponseEntity<Object> getCustomers(@RequestParam("id") Long recipeId){

                  Recipe_detail detail = recipeRepo.getRecipebyId(recipeId);

                  if(detail!=null){

                                  return ResponseEntity.status(HttpStatus.OK).body(detail);        

 

                  }

                  else{

                                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

 

                  }

                 

                }

 

               

                @GetMapping(path="/api/RecipeList/recipesByName")

                @ResponseBody

                public ResponseEntity<Object> getRecipiesByName(@RequestParam("recipeName") String RecipeName){

       return recipeService.getRecipe(RecipeName);

                }

 

 

                @GetMapping(path="/api/RecipeList/recipeByCusid")

                public ResponseEntity<Object> getCustomersByCusID(@RequestParam("CusID") Integer CustomerID){

                    Map<String,String> response = new HashMap<String, String>();

 

                                List<Recipe_detail> recipe_detail= recipeRepo.getRecipebyCusId(CustomerID);

                                    if(recipe_detail!=null){

                                                  return ResponseEntity.status(HttpStatus.OK).body(recipe_detail);         

                                    }else{

                                                return new ResponseEntity<>(HttpStatus.OK);

                                    }

                               

                  

                }

               

 

               

                @GetMapping(path="/api/RecipeList/recipesByCategory")

                @ResponseBody

                public ResponseEntity<Object> getRecipiesByName_category(@RequestParam("recipeName") String RecipeName,@RequestParam("Category")String Category){

       return recipeService.getRecipeByCategory(RecipeName,Category);

                }

 

               

                @PostMapping(path="/api/RecipeList/recipes")

                @ResponseBody

                public ResponseEntity<Object> postRecipe(@RequestParam("CusID") Integer CusID, @RequestBody Recipe_detail recipe){

                                Recipe_detail updated_recipe= null;

                    Map<String,String> response = new HashMap<String, String>();

           try{

                  recipe.setCusID(CusID);

             /* System.out.println(files.length);

                  if(files.length>0){

                                  ArrayList<Photos_List> photo = new ArrayList<Photos_List>();

                                  for(MultipartFile file:files){

                                                  Photos_List photos = new Photos_List(file.getBytes());

                                                  photo.add(photos);

                                  }

                                                   System.out.println("phtos"+photo.get(0).getPhoto());

 

                                  recipe.setPhotos_list(photo);

                  }*/

                  if(recipe.getIngredients_list().isEmpty()&&recipe.getIngredients_list().isEmpty()){

                                  if(recipe.getVideo()!=null&(!recipe.getVideo().isEmpty())){

                                                  recipe.setCreated_dt(new Date());

                                                  updated_recipe=   recipeRepo.save(recipe);

 

                                  }else{

                                                  response.put("status", "422");

                                                  response.put("description", "cant post since no ingredients and directions have been given and no viodes link is shared");

                                                                 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

 

                                  }

                  }

                  else{

                                                  recipe.setCreated_dt(new Date());

 

                                 updated_recipe = recipeRepo.save(recipe);

 

                  }

                  if(updated_recipe!=null){

                                               URI location = ServletUriComponentsBuilder.fromCurrentRequest().replaceQuery("").path("/{id}").buildAndExpand(updated_recipe.getRecipeId()).toUri();

 

                                                                  return ResponseEntity.status(HttpStatus.CREATED).location(location).body(updated_recipe);


                  }

                  else{

                                                                  return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);


                  }

                                                                                               

                                   

           }

           catch(Exception c){

                                                                response.put("Status","500 internal server error");

                                                                response.put("message", "could not psot the recipe");

                                                                  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

                  

           }

 

                }

               

               

                @PutMapping(path="/api/RecipeList/recipes")

                @ResponseBody

                public ResponseEntity<Object> updateAccountDetails(@RequestParam("recipeID") Long recipe_Id,@RequestParam("CusID") Integer CusID, @RequestBody Recipe_detail recipe){

                    Map<String,String> response = new HashMap<String, String>();            

                    System.out.println(recipe_Id);

                                try{

                    Recipe_detail updated_Recipe = recipeRepo.findById(recipe_Id).map(cus->{

                    if(recipe.getRecipe_Name()!=null&&(recipe.getRecipe_Name()!="")&&(!recipe.getRecipe_Name().isEmpty()))cus.setRecipe_Name(recipe.getRecipe_Name());

                    if(recipe.getCategory()!=null&&(recipe.getCategory()!="")&&(!recipe.getCategory().isEmpty()))cus.setCategory(recipe.getCategory());

                               

                                if(recipe.getDuration_hrs()!=null)cus.setDuration_hrs(recipe.getDuration_hrs());

                                if(recipe.getDuration_mts()!=null)cus.setDuration_mts(recipe.getDuration_mts());

                                if(recipe.getServings()!=null)cus.setServings(recipe.getServings());

                                if(recipe.getVideo()!=null)cus.setVideo(recipe.getVideo());

                                if(recipe.getDairyFree()!=null)cus.setDairyFree(recipe.getDairyFree());

                                if(recipe.getGlutenFee()!=null)cus.setGlutenFee(recipe.getGlutenFee());

                                if(recipe.getNutFree()!=null)cus.setNutFree(recipe.getNutFree());

                                if(recipe.getVegan()!=null)cus.setVegan(recipe.getVegan());

                    if(recipe.getIngredients_list()!=null&&!recipe.getIngredients_list().isEmpty())cus.setIngredients_list(recipe.getIngredients_list());

                    if(recipe.getDirections_list()!=null&&!recipe.getDirections_list().isEmpty())cus.setDirections_list(recipe.getDirections_list());

 

                                return recipeRepo.save(cus);

                    }).orElseGet(() -> {

            recipe.setCusID(CusID);

                                recipe.setRecipeId(recipe_Id);

                        return recipeRepo.save(recipe);

                      });

                   

                          if(updated_Recipe==null){

                                 response.put("Status", "404");

                                 response.put("message", "Cannot update user details");

 

                                                  return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

 

                          }

                          else{

                                                               URI location = ServletUriComponentsBuilder.fromCurrentRequest().replaceQuery("").path("/{id}").buildAndExpand(updated_Recipe.getRecipeId()).toUri();

                                                                return ResponseEntity.status(HttpStatus.CREATED).location(location).body(updated_Recipe);

 

                          }

                                }

                                catch(Exception c){

                                                response.put("Status", "501");

                 response.put("message", "Incrrect URl or data format");

                                return ResponseEntity.status(HttpStatus.CREATED).body(response);

 

 

                                }

               

                }

 

               

 

    @PostMapping(path ="/api/RecipeList/recipePhotosUpload/{RecipeID}")

    @ResponseBody

    public  ResponseEntity<Object> upload_MultipleFilestoDB(@PathVariable Long RecipeID,@RequestParam("file") MultipartFile [] files) {

                  System.out.println(RecipeID);

                Map<String,String> response = new HashMap<String, String>();

                                try{

                                Recipe_detail detail =     recipeRepo.getRecipebyId(RecipeID);

                                                if(detail==null){

                                                                response.put("Status","404");

                                                                response.put("message", "No data Found");

 

                                                                  return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

 

                                                }

                for(MultipartFile file:files){

                                                Photos_List list = new Photos_List(RecipeID,file.getBytes());

                                                detail.setProfile_Photo(file.getBytes());

                                                photoRepo.save(list);

                                                recipeRepo.save(detail);

                                }

                               URI location = ServletUriComponentsBuilder.fromCurrentRequest().replaceQuery("").path("/{id}").buildAndExpand(RecipeID).toUri();

                                                response.put("Status","201");

                                                response.put("message", "craeted");

 

                                                  return ResponseEntity.status(HttpStatus.CREATED).location(location).body(response);

                              

                                }

                                catch(Exception c){

                                                response.put("Status","501");

                                                response.put("message", "Internal server error");

                                                  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

 

                                }

       

 

        }

   

    @DeleteMapping(path="/api/RecipeList/Delete")

    @ResponseBody

    public  ResponseEntity<Object> deleteRecipeByID(@RequestParam("id") Long RecipeID) {

                Map<String,String> response = new HashMap<String, String>();

 

                try{

                    recipeRepo.deleteById(RecipeID);

                                response.put("Status", "204");

                                response.put("description", "No Content available");

 

                return ResponseEntity.status(HttpStatus.OK).body(response);

        }

                catch(Exception c){

                                response.put("Status", "404");

                                response.put("description", "No data found");

 

               return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

 

                }

 

    }

   

    @DeleteMapping(path="/api/RecipeList/Photos/Delete")

    @ResponseBody

    public  ResponseEntity<Object> deleteRecipeByID(@RequestParam("id") List<Photos_List> photos) {

                Map<String,String> response = new HashMap<String, String>();

 

                try{

                                photoRepo.deleteAll(photos);

                                response.put("Status", "204");

                                response.put("description", "No Content available");

 

                return ResponseEntity.status(HttpStatus.OK).body(response);

        }

                catch(Exception c){

                                response.put("Status", "404");

                                response.put("description", "No data found");

 

               return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

 

                }

 

    }

   

    

                @PostMapping(path="/api/RecipeList/Rating")

                @ResponseBody

                public ResponseEntity<Object> postRating(@RequestParam("recipeID") Long recipeID,@RequestBody Rating rating){

                                Recipe_detail updated_recipe= null;

                    Map<String,String> response = new HashMap<String, String>();

           try{

                  rating.setRecipeId(recipeID);

                Rating Updated_Rating=  ratngRepo.save(rating);

                  

                  if(Updated_Rating!=null){

                                              URI location = ServletUriComponentsBuilder.fromCurrentRequest().replaceQuery("").path("/{id}").buildAndExpand(Updated_Rating.getId()).toUri();

 

                                                                 return ResponseEntity.status(HttpStatus.CREATED).location(location).body(Updated_Rating);


                  }

                  else{

                                  response.put("status", "422");

                                  response.put("message", "Data entered is not supported");


                                                                  return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(response);


                  }

                  

           }

           catch(Exception c){

                                                                response.put("Status","500 internal server error");

                                                                response.put("message", "could not psot the rating");

                                                                  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

                  

           }

 

                }

 

   

 

               

                @PostMapping(path="/api/RecipeList/Comments")

                @ResponseBody

                public ResponseEntity<Object> postComments(@RequestParam("recipeID") Long recipeID,@RequestBody Comments Comment){

                    Map<String,String> response = new HashMap<String, String>();

        try{

               Comment.setRecipeId(recipeID);

                Comments Updated_Rating=  comentsRepo.save(Comment);

                  

                  if(Updated_Rating!=null){

                                               URI location = ServletUriComponentsBuilder.fromCurrentRequest().replaceQuery("").path("/{id}").buildAndExpand(Updated_Rating.getId()).toUri();

 

                                                                  return ResponseEntity.status(HttpStatus.CREATED).location(location).body(Updated_Rating);

 

                  }

                  else{

                                  response.put("status", "422");

                                  response.put("message", "Data enetred is not supported");

 

                                                                  return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(response);

 

                  }

                  

        }

        catch(Exception c){

                                                                response.put("Status","500 internal server error");

                                                                response.put("message", "could not psot the rating");

                                                                  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

                  

        }

 

 

                }

                }



