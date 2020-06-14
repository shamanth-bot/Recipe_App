package com.recipies.Myrecipies_app.Entity;

 

import java.util.ArrayList;

import java.util.Date;

import java.util.List;

 

import javax.persistence.CascadeType;

import javax.persistence.Column;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;

import javax.persistence.GenerationType;

import javax.persistence.Id;

import javax.persistence.JoinColumn;

import javax.persistence.Lob;

import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import javax.validation.constraints.PastOrPresent;

 

import org.hibernate.annotations.Cascade;

 

@Entity

@Table(name="recipe_Details")

public class Recipe_detail {

               

               

                protected Recipe_detail(){

                               

                }

               

               

               

                @Id

                @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "recipe_SEQ")
                @SequenceGenerator(sequenceName = "recipe_req", initialValue = 1, allocationSize = 1, name ="recipe_SEQ")

                @Column(name="recipeId")

                private Long recipeId;

               

                @Column(nullable=false)

                private Integer cusID;

               

                private String Author;

               

                private String Recipe_Name;

               

 

                @Lob

    @Column(name = "Recipe_photo", columnDefinition="BLOB",nullable=true)

                private byte[] profile_Photo;

               

 

 

 

 

                private Date created_dt;

 

 

                private String Category;

                               

                @Column()

                private Boolean glutenFee=false;

               

                @Column()

                private Boolean dairyFree=false;

               

                @Column()

                private Boolean vegan=false;

               

                @Column()

                private Boolean NutFree=false;

               

                @Column(nullable=true)

                private Integer duration_mts;

               

                @Column(nullable=true)             

                private Integer duration_hrs;

               

                @Column(nullable=true)

                private Integer Servings;

               

                @Column(columnDefinition="varchar(255) default null")

                private String video;

               

                @OneToMany(cascade = CascadeType.ALL,orphanRemoval=true)

                @JoinColumn(name="recipeId",referencedColumnName="recipeId")

    private List<IngredientsList> ingredients_list;

 

               

                @OneToMany(cascade = CascadeType.ALL,orphanRemoval=true)

                @JoinColumn(name="recipeId",referencedColumnName="recipeId")

    private List<Directions_list> Directions_list;

 

 

                @OneToMany(cascade = CascadeType.ALL,orphanRemoval=true)

                @JoinColumn(name="recipeId",referencedColumnName="recipeId")

    private List<Photos_List> photos_list;

 

                @OneToMany(cascade = CascadeType.ALL,orphanRemoval=true)

                @JoinColumn(name="recipeId",referencedColumnName="recipeId")

    private List<Rating> Rating_list;

   

    

                @OneToMany(cascade = CascadeType.ALL,orphanRemoval=true)

                @JoinColumn(name="recipeId",referencedColumnName="recipeId")

    private List<Comments> comments_List;

 

 

   

 

                public Recipe_detail(Long recipeId, Integer cusID, String author, String recipe_Name, String category,

                                                Boolean glutenFee, Boolean dairyFree, Boolean vegan, Boolean nutFree, Integer duration_mts,

                                                Integer duration_hrs, Integer servings, String video, List<IngredientsList> ingredients_list,

                                                List<Directions_list> directions_list, List<Photos_List> photos_list) {

                                super();

                                this.recipeId = recipeId;

                                this.cusID = cusID;

                                this.Author = author;

                                this.Recipe_Name = recipe_Name;

                                this.Category = category;

                                this.glutenFee = glutenFee;

                                this.dairyFree = dairyFree;

                                this.vegan = vegan;

                                this.NutFree = nutFree;

                                this.duration_mts = duration_mts;

                                this.duration_hrs = duration_hrs;

                                this.Servings = servings;

                                this.video = video;

                                this.ingredients_list = ingredients_list;

                                this.Directions_list = directions_list;

                                this.photos_list = photos_list;

                }

 

                public Long getRecipeId() {

                                return recipeId;

                }

 

                public void setRecipeId(Long recipeId) {

                                this.recipeId = recipeId;

                }

 

                public Integer getCusID() {

                                return cusID;

                }

 

                public void setCusID(Integer cusID) {

                                this.cusID = cusID;

                }

 

                public String getAuthor() {

                                return Author;

                }

 

                public void setAuthor(String author) {

                                Author = author;

                }

 

                public String getRecipe_Name() {

                                return Recipe_Name;

                }

 

                public void setRecipe_Name(String recipe_Name) {

                                Recipe_Name = recipe_Name;

                }

 

                public String getCategory() {

                                return Category;

                }

 

                public void setCategory(String category) {

                                Category = category;

                }

 

                public Boolean getGlutenFee() {

                                return glutenFee;

                }

 

                public void setGlutenFee(Boolean glutenFee) {

                                this.glutenFee = glutenFee;

                }

 

                public Boolean getDairyFree() {

                                return dairyFree;

                }

 

                public void setDairyFree(Boolean dairyFree) {

                                this.dairyFree = dairyFree;

                }

 

                public Boolean getVegan() {

                                return vegan;

                }

 

                public void setVegan(Boolean vegan) {

                                this.vegan = vegan;

                }

 

                public Boolean getNutFree() {

                                return NutFree;

                }

 

                public void setNutFree(Boolean nutFree) {

                                NutFree = nutFree;

                }

 

                public Integer getDuration_mts() {

                                return duration_mts;

                }

 

                public void setDuration_mts(Integer duration_mts) {

                                this.duration_mts = duration_mts;

                }

 

                public Integer getDuration_hrs() {

                                return duration_hrs;

                }

 

                public void setDuration_hrs(Integer duration_hrs) {

                                this.duration_hrs = duration_hrs;

                }

 

 

                public Integer getServings() {

                                return Servings;

                }

 

                public void setServings(Integer servings) {

                                Servings = servings;

                }

 

                public String getVideo() {

                                return video;

                }

 

                public void setVideo(String video) {

                                this.video = video;

                }

 

                public List<IngredientsList> getIngredients_list() {

                                return ingredients_list;

                }

 

                public void setIngredients_list(List<IngredientsList> ingredients_list) {

                                if(this.ingredients_list==null){

                                                this.ingredients_list= ingredients_list;

                                }else{

                                                this.ingredients_list.retainAll(ingredients_list);

                                                this.ingredients_list.addAll(ingredients_list);

                                }

 

                }

               

               

                public List<Directions_list> getDirections_list() {

                                return Directions_list;

                }

 

                public void setDirections_list(List<Directions_list> directions_list) {

                                if(this.Directions_list==null){

                                                this.Directions_list= directions_list;

                                }else{

                                                this.Directions_list.retainAll(directions_list);

                                                this.Directions_list.addAll(directions_list);

                                }

 

                }

 

                public List<Photos_List> getPhotos_list() {

                                return photos_list;

                }

 

                public void setPhotos_list(List<Photos_List> photos_list) {

                                if(this.photos_list==null){

                                                this.photos_list= photos_list;

                                }else{

                                                this.photos_list.retainAll(photos_list);

                                                this.photos_list.addAll(photos_list);

                                }

 

                }

 

                public Date getCreated_dt() {

                                return created_dt;

                }

 

                public void setCreated_dt(Date created_dt) {

                                this.created_dt = created_dt;

                }

                public byte[] getProfile_Photo() {

                                return profile_Photo;

                }

 

                public List<Comments> getComments_List() {

                                return comments_List;

                }

 

                public void setComments_List(List<Comments> comments_List) {

                                this.comments_List = comments_List;

                }

 

                public void setProfile_Photo(byte[] profile_Photo) {

                                this.profile_Photo = profile_Photo;

                }

               

                public List<Rating> getRating_list() {

                                return Rating_list;

                }

 

                public void setRating_list(List<Rating> rating_list) {

                                Rating_list = rating_list;

                }

 

               

 

}



