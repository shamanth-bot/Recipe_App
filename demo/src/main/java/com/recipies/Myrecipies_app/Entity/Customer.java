package com.recipies.Myrecipies_app.Entity;

 

import java.sql.Timestamp;

import java.util.Date;

import java.util.List;

 

import javax.persistence.CascadeType;

import javax.persistence.Column;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;

import javax.persistence.GenerationType;

import javax.persistence.Id;

import javax.persistence.Lob;

import javax.persistence.OneToMany;

import javax.persistence.OneToOne;

import javax.persistence.SequenceGenerator;

import javax.validation.constraints.Past;

 

import org.hibernate.annotations.CreationTimestamp;

 

@Entity

public class Customer {

                @Id

                @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CUST_SEQ")
                @SequenceGenerator(sequenceName = "customer_sequence", initialValue = 1, allocationSize = 1, name = "CUST_SEQ")

                private Integer Cusid;

               

                private String firstName;

               

                private String lastName;

               

                private String UserName;

               

                @Column(unique=true)

                private String email;

               

                private String pwd;

               

                private String Gender;

 

                @Past

                private Date dob;

 

/*           @OneToOne(mappedBy="customer",cascade= CascadeType.ALL)

                private Login loginPosts;*/

               

    @Column(nullable=true)

    private Long Followers;

   

                private String Occupation;

 

                private String webSite;

 

                private String ebtYourself;

 

                @Column(nullable=true)

                private String RegisterToken;

               

                @Lob

    @Column(name = "cover_photo", columnDefinition="BLOB",nullable=true)

                private byte[] cover_photo;

               

 

                @Lob

    @Column(name = "profile_photo", columnDefinition="BLOB",nullable=true)

                private byte[] profile_photo;

               

               

                @Column(name = "timestamp", nullable = true, updatable = false,columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")

                @CreationTimestamp

                public Timestamp created_dt;

 

               

                protected  Customer(){

                               

                }

 

               

                public Customer(Integer cusid, String firstName, String lastName, String userName, String email, String pwd,

                                                String gender, Date dob, String occupation, String webSite, String ebtYourself) {

                                super();

                                this.Cusid = cusid;

                                this.firstName = firstName;

                                this.lastName = lastName;

                                this.UserName = userName;

                                this.email = email;

                                this.pwd = pwd;

                                this.Gender = gender;

                                this.dob = dob;

                                this.Occupation = occupation;

                                this.webSite = webSite;

                                this.ebtYourself = ebtYourself;

                }

 

               

 

                public byte[] getCover_photo() {

                                return cover_photo;

                }

 

 

                public void setCover_photo(byte[] cover_photo) {

                                this.cover_photo = cover_photo;

                }

 

 

                public byte[] getProfile_photo() {

                                return profile_photo;

                }

 

 

                public void setProfile_photo(byte[] profile_photo) {

                                this.profile_photo = profile_photo;

                }

 

 

                public Integer getCusid() {

                                return Cusid;

                }

 

 

                public void setCusid(Integer cusid) {

                                this.Cusid = cusid;

                }

 

 

                public String getFirstName() {

                                return firstName;

                }

 

 

                public void setFirstName(String firstName) {

                                this.firstName = firstName;

                }

 

 

                public String getLastName() {

                                return lastName;

                }

 

 

                public void setLastName(String lastName) {

                                this.lastName = lastName;

                }

 

 

                public String getUserName() {

                                return UserName;

                }

 

 

                public void setUserName(String userName) {

                                UserName = userName;

                }

 

 

                public String getEmail() {

                                return email;

                }

 

 

                public void setEmail(String email) {

                                this.email = email;

                }

 

 

                public String getPwd() {

                                return pwd;

                }

 

 

                public void setPwd(String pwd) {

                                this.pwd = pwd;

                }

 

 

                public String getGender() {

                                return Gender;

                }

 

 

                public void setGender(String gender) {

                                Gender = gender;

                }

 

 

                public Date getDob() {

                                return dob;

                }

 

 

                public void setDob(Date dob) {

                                this.dob = dob;

                }

 

 

                public String getOccupation() {

                                return Occupation;

                }

 

 

                public void setOccupation(String occupation) {

                                Occupation = occupation;

                }

 

 

                public String getWebSite() {

                                return webSite;

                }

 

 

                public void setWebSite(String webSite) {

                                this.webSite = webSite;

                }

 

 

                public String getEbtYourself() {

                                return ebtYourself;

                }

 

 

                public void setEbtYourself(String ebtYourself) {

                                this.ebtYourself = ebtYourself;

                }

 

 

               

                public String getRegisterToken() {

                                return RegisterToken;

                }

 

 

                public void setRegisterToken(String registerToken) {

                                RegisterToken = registerToken;

                }

 

 

               

                public Long getFollowers() {

                                return Followers;

                }

 

 

                public void setFollowers(Long followers) {

                                Followers = followers;

                }

 

 

                /*public Login getLoginPosts() {

                                return loginPosts;

                }

 

 

                public void setLoginPosts(Login loginPosts) {

                                this.loginPosts = loginPosts;

                }*/

 

 

 

}

 

