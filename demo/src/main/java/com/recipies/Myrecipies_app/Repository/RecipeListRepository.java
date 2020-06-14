package com.recipies.Myrecipies_app.Repository;

 

import java.util.List;

import java.util.Optional;

 

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

 

import com.recipies.Myrecipies_app.Entity.Login;

import com.recipies.Myrecipies_app.Entity.Recipe_detail;

 

public interface RecipeListRepository extends JpaRepository<Recipe_detail, Long>{

               

                @Query(value = "SELECT * FROM RECIPE_DETAILS u where u.Recipe_id=?1", nativeQuery = true)

                public Recipe_detail getRecipebyId(Long id);

 

                @Query(value = "SELECT * FROM RECIPE_DETAILS u where u.CUSID=?1", nativeQuery = true)

                public List<Recipe_detail> getRecipebyCusId(Integer Cus_id);

 

                @Query(value = "SELECT * FROM RECIPE_DETAILS u where u.CATEGORY=?1", nativeQuery = true)

                public List<Recipe_detail> getRecipebyCategory(String Category);

 

}

