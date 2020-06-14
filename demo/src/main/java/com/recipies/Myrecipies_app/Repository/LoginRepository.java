package com.recipies.Myrecipies_app.Repository;

 

import java.util.List;

import java.util.Optional;

 

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

 

import com.recipies.Myrecipies_app.Entity.Customer;

import com.recipies.Myrecipies_app.Entity.Login;

 

 

public interface LoginRepository extends JpaRepository<Login, Integer>{

               

 

                @Query(value = "select * from Login u where u.login_email=?1", nativeQuery = true)

                public Login getUser(String  email);

               

                @Query(value = "select * from Login u where u.login_token=?1", nativeQuery = true)

                public Login getToken(String  token);

 

                @Query(value = "select * from Login u where u.login_email=?1 and u.login_password=?2", nativeQuery = true)

                public Login getUserDetails(String  Uname,String pwd);

               

                @Query(value = "select * from Login u where u.login_cusid=?1", nativeQuery = true)

                public Login getUserbyCusid(Integer id);

 

                @Query(value = "select * from Login u where u.login_cusid=?1", nativeQuery = true)

                public Optional<Login> getUserbyCustomerId(Integer id);

 

 

}

