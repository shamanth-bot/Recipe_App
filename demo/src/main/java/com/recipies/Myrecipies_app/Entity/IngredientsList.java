package com.recipies.Myrecipies_app.Entity;

 

import javax.persistence.Column;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;

import javax.persistence.GenerationType;

import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

 

import org.hibernate.annotations.Generated;

 

@Entity

@Table(name="ingredients_list")

public class IngredientsList {

               

               

 

                @Id

                @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ING_SEQ")
                @SequenceGenerator(sequenceName = "ingredients_list_sequence", initialValue = 1, allocationSize = 1, name ="ING_SEQ")

                @Column(name="ingredient_id")

                private Long ingredient_id;

               

                private String Ingredients;

               

                private Long recipeId;   

 

                protected IngredientsList(){

                               

                }

 

 

                public IngredientsList(Long ingredient_id, String ingredients, Long recipeId) {

                                super();

                                this.ingredient_id = ingredient_id;

                                this.Ingredients = ingredients;

                                this.recipeId = recipeId;

                }

 

 

                public Long getIngredient_id() {

                                return ingredient_id;

                }

 

 

                public void setIngredient_id(Long ingredient_id) {

                                this.ingredient_id = ingredient_id;

                }

 

 

                public String getIngredients() {

                                return Ingredients;

                }

 

                public void setIngredients(String ingredients) {

                                Ingredients = ingredients;

                }





				public Long getRecipeId() {
					return recipeId;
				}





				public void setRecipeId(Long recipeId) {
					this.recipeId = recipeId;
				}

               

 

 

}

