package com.recipies.Myrecipies_app.Repository;

 

import java.util.List;

 

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

 

import com.recipies.Myrecipies_app.Entity.Customer;

import com.recipies.Myrecipies_app.Entity.Login;

 

 

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

               

                @Query(value = "select * from customer u where u.cusid=?1", nativeQuery = true)

                public Customer getCustomer(Integer Id);

 
                @Query(value = "select * from customer u where u.email=?1", nativeQuery = true)

                public Customer getCustomerByEmail(String email);


                @Query(value = "select * from customer u where u.register_token=?1", nativeQuery = true)

                public Customer getToken(String  token);

 

 

}

 

