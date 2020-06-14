package com.recipies.Myrecipies_app.Repository;

 

import org.springframework.data.jpa.repository.JpaRepository;

 

import com.recipies.Myrecipies_app.Entity.Comments;

import com.recipies.Myrecipies_app.Entity.Customer;

 

public interface CommentsRepository extends JpaRepository<Comments, Integer>  {

 

}

