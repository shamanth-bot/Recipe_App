package com.recipies.Myrecipies_app.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.recipies.Myrecipies_app.Entity.Customer;
import com.recipies.Myrecipies_app.Repository.CustomerRepository;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {

	
    @Autowired
    private CustomerRepository registerRepo;

  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();
  
  


  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	  
	  Optional<Customer> user =  Optional.ofNullable(registerRepo.getCustomerByEmail(username));
    if (user==null) {
      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
    }
    
    JwtUserDetails details =    new JwtUserDetails(user.get().getEmail(),new BCryptPasswordEncoder().encode(user.get().getPwd()), "ROLE_USER");
    
    return details;
  }

}


