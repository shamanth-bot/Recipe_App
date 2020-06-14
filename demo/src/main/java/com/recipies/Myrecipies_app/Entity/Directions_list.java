package com.recipies.Myrecipies_app.Entity;

 

import javax.persistence.Column;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;

import javax.persistence.GenerationType;

import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

 

@Entity

@Table(name="Directions_list")

public class Directions_list {

               

                protected Directions_list(){

                               

                }

               

 

                @Id

                @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DIRECTIONS_SEQ")
                @SequenceGenerator(sequenceName = "directions_list_sequence", initialValue = 1, allocationSize = 1, name ="DIRECTIONS_SEQ")

                @Column(name="id")

                private Long id;

 

                private String Directions;

               

                private Long recipeId;   

               

               

               

                public Long getId() {

                                return id;

                }

 

                public void setId(Long id) {

                                this.id = id;

                }

 

                public String getDirections() {

                                return Directions;

                }

 

                public void setDirections(String directions) {

                                Directions = directions;

                }



				public Long getRecipeId() {
					return recipeId;
				}



				public void setRecipeId(Long recipeId) {
					this.recipeId = recipeId;
				}

 

 

 

}

