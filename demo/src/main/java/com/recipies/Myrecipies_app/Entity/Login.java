package com.recipies.Myrecipies_app.Entity;

 

import java.util.Date;

 

import javax.persistence.Column;

import javax.persistence.Entity;

import javax.persistence.FetchType;

import javax.persistence.GeneratedValue;

import javax.persistence.GenerationType;

import javax.persistence.Id;

import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;

import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

 

@Entity

public class Login {

               

                @Id

                @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LOGIN_SEQ")
                @SequenceGenerator(sequenceName = "login_sequence", initialValue = 1, allocationSize = 1, name = "LOGIN_SEQ")

                private Integer id;

               

               

                private String Login_Email;

               

                private String Login_Password;

               

                @Column(nullable=true)

                private String Login_token;

               

                private Integer Login_cusid;

 

                @Column(nullable=true)

                private Date token_expiry_Date;

 

                private String FirstName;

                /*@OneToOne(fetch=FetchType.LAZY)

                @JoinColumn(name="customer_cusid")

                @JsonIgnore    

                private Customer customer;*/

                @Column(nullable=true)

                private String pwd_resetStatus;

               

                @Column(nullable=true)

                private Integer Login_countryCode;

 

                @Column(nullable=true)

                private Long Login_ContactNumber;

 

 

                @Column(columnDefinition = "varchar(255) default 'No'")

                private String Customer_validated;

               

 

 

                protected Login(){

                               

                }

 

 

                public Login(Integer id, String email, String password,String firstName) {

                                this.Login_cusid = id;

                                this.Login_Email = email;

                                this.Login_Password = password;

                                this.FirstName=firstName;

                }

 

                public Login(String email, String password, String token) {

                                this.Login_Email = email;

                                this.Login_Password = password;

                                this.Login_token = token;

                }

               

               

                public Integer getLogin_countryCode() {

                                return Login_countryCode;

                }

 

 

                public void setLogin_countryCode(Integer login_countryCode) {

                                Login_countryCode = login_countryCode;

                }

 

 

                public Long getLogin_ContactNumber() {

                                return Login_ContactNumber;

                }

 

 

                public void setLogin_ContactNumber(Long login_ContactNumber) {

                                Login_ContactNumber = login_ContactNumber;

                }

 

 

                public Integer getId() {

                                return id;

                }

 

                public void setId(Integer id) {

                                this.id = id;

                }

 

 

                public String getLogin_Email() {

                                return Login_Email;

                }

 

 

                public void setLogin_Email(String login_Email) {

                                Login_Email = login_Email;

                }

 

 

                public String getLogin_Password() {

                                return Login_Password;

                }

 

 

                public void setLogin_Password(String login_Password) {

                                Login_Password = login_Password;

                }

 

 

                public String getLogin_token() {

                                return Login_token;

                }

 

 

                public void setLogin_token(String login_token) {

                                Login_token = login_token;

                }

 

 

                public Integer getLogin_cusid() {

                                return Login_cusid;

                }

 

 

                public void setLogin_cusid(Integer login_cusid) {

                                Login_cusid = login_cusid;

                }

 

 

                public Date getToken_expiry_Date() {

                                return token_expiry_Date;

                }

 

 

                public void setToken_expiry_Date(Date token_expiry_Date) {

                                this.token_expiry_Date = token_expiry_Date;

                }

 

                public String getFirstName() {

                                return FirstName;

                }

 

 

                public void setFirstName(String firstName) {

                                FirstName = firstName;

                }

 

 

                public String getPwd_resetStatus() {

                                return pwd_resetStatus;

                }

 

 

                public void setPwd_resetStatus(String pwd_resetStatus) {

                                this.pwd_resetStatus = pwd_resetStatus;

                }

 

 

                public String getCustomer_validated() {

                                return Customer_validated;

                }

 

 

                public void setCustomer_validated(String customer_validated) {

                                Customer_validated = customer_validated;

                }

 

}

 

 

 

 

