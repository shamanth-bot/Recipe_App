package com.recipies.Myrecipies_app.Entity;

 

import java.sql.Blob;

import java.sql.Timestamp;

 

import javax.persistence.Column;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;

import javax.persistence.GenerationType;

import javax.persistence.Id;

import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.CreationTimestamp;

 

@Entity

public class Comments {

               

                protected Comments(){

                               

                }

               

                @Id

                @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "COMM_SEQ")
                @SequenceGenerator(sequenceName = "comments_List_seq", initialValue = 1, allocationSize = 1, name ="COMM_SEQ")

                @Column(name="id")

                private Long id;

 

                private Long recipeId;   

               

                private Integer CusID;

               

                private String Comments;

               

                private String userName;

               

                @Column(name = "timestamp", nullable = true, updatable = false,columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")

                @CreationTimestamp

                public Timestamp timestamp;

 

                @Lob

    @Column(name = "profile_photo", columnDefinition="BLOB",nullable=true)

                private byte[] profile_Photo;

 

                public Comments(Long id, Long recipeId, Integer cusID, String comments, Timestamp timestamp,String username,byte[] profile_Photo) {

                                super();

                                this.id = id;

                                this.recipeId = recipeId;

                                this.CusID = cusID;

                                this.Comments = comments;

                                this.timestamp = timestamp;

                                this.userName= username;

                                this.profile_Photo=profile_Photo;

                }

 

               

               

                public String getUserName() {

                                return userName;

                }

 

 

 

                public void setUserName(String userName) {

                                this.userName = userName;

                }

 

 

 

                public byte[] getProfile_Photo() {

                                return profile_Photo;

                }

 

 

 

                public void setProfile_Photo(byte[] profile_Photo) {

                                this.profile_Photo = profile_Photo;

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







				public Integer getCusID() {

                                return CusID;

                }

 

                public void setCusID(Integer cusID) {

                                CusID = cusID;

                }

 

                public String getComments() {

                                return Comments;

                }

 

                public void setComments(String comments) {

                                Comments = comments;

                }

 

                public Timestamp getTimestamp() {

                                return timestamp;

                }

 

                public void setTimestamp(Timestamp timestamp) {

                                this.timestamp = timestamp;

                }

               

               

               

               

 

 

}

 

