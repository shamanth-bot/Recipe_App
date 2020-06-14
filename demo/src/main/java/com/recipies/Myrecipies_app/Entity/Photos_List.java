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

@Table(name="photos_list")

public class Photos_List {

               

                protected Photos_List(){

                               

                }

               

                @Id

                @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PHOTO_SEQ")
                @SequenceGenerator(sequenceName = "photos_list_sequence", initialValue = 1, allocationSize = 1, name ="PHOTO_SEQ")

                @Column(name="id")

                private Long id;

 

               

                private Long recipeId;   

               

                @Column(nullable=true)

                private String description;

 

                @Lob

    @Column(name = "Recipe_photo", columnDefinition="BLOB")

                private byte[] photo;

               

 

 

 

                public Photos_List( Long recipeId, byte[] photo) {

                                super();

                                this.recipeId = recipeId;

                                this.photo = photo;

                }

               

                public Photos_List(byte[] photo) {

                                super();

                                this.photo = photo;

                }

               

 

                public Long getId() {

                                return id;

                }

 

                public void setId(Long id) {

                                this.id = id;

                }

 


 

                public Long getRecipeId() {
					return recipeId;
				}



				public void setRecipeId(Long recipeId) {
					this.recipeId = recipeId;
				}



				public String getDescription() {

                                return description;

                }

 

                public void setDescription(String description) {

                                this.description = description;

                }

 

                public byte[] getPhoto() {

                                return photo;

                }

 

                public void setPhoto(byte[] photo) {

                                this.photo = photo;

                }

               

               

 

 

}

 

