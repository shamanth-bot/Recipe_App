package com.recipies.Myrecipies_app.Entity;

 

import javax.persistence.Column;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;

import javax.persistence.GenerationType;

import javax.persistence.Id;

import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

 

@Entity

@Table(name="Rating_details")

public class Rating {

               

                protected Rating(){

                               

                }

 

 

               

                @Id

                @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RATG_SEQ")
                @SequenceGenerator(sequenceName = "Rating_list_seq", initialValue = 1, allocationSize = 1, name ="RATG_SEQ")

                @Column(name="id")

                private Long id;

 

               

                private Long recipeId;   

               

                @Column(nullable=true)

                private String description;

 

    @Column(nullable=false)

                private Integer Rating_number;

   

    

    

    

 

                public Rating(Long id, Long recipeId, String description, Integer rating_number) {

                                super();

                                this.id = id;

                                this.recipeId = recipeId;

                                this.description = description;

                                this.Rating_number = rating_number;

                }

 

                public Long getId() {

                                return id;

                }

 

                public void setId(Long id) {

                                this.id = id;

                }

 

 

                public String getDescription() {

                                return description;

                }

 

                public void setDescription(String description) {

                                this.description = description;

                }



				

				public Long getRecipeId() {
					return recipeId;
				}



				public void setRecipeId(Long recipeId) {
					this.recipeId = recipeId;
				}



				public Integer getRating_NUMBER() {
					return Rating_number;
				}



				public void setRating_NUMBER(Integer rating_NUMBER) {
					this.Rating_number = rating_NUMBER;
				}




 


 

   

    

}

 

