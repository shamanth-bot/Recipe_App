package com.recipies.Myrecipies_app.Repository;

 

import org.springframework.data.jpa.repository.JpaRepository;

 

import com.recipies.Myrecipies_app.Entity.Photos_List;

import com.recipies.Myrecipies_app.Entity.Rating;

 

public interface RatingRepository extends JpaRepository<Rating, Integer> {

 

}

