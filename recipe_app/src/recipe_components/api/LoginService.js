import axios from 'axios';

 

class LoginService{
 async postforgetPassword(emailVal){

     let response = await axios.post('http://localhost:8080/api/Login/forgotPassword',null,{ params: {

        email:emailVal

      }}) 

     return response;

     

 }

 

 async validatePasswordResetToken(tokenVal){

  let response = await axios.get('http://localhost:8080/api/Login/Passwordreset/getToken',{ params: {

    token:tokenVal

  }}) 

 return response;

 

 }

 

 async postpassword(Password,tokenVal){

  let response = await axios.post('http://localhost:8080/api/Login/Passwordreset/resetPassword',null,{ params: {

    password:Password,

    token:tokenVal

  }}) 

 return response;

 

 }

 

 async getUserdetails(mail,pwd){

  let response = await axios.get('http://localhost:8080/api/Login/User',{ params: {

    email:mail,

    password:pwd

  }}) 

 return response;

 
 axios.interceptors.request.use(
  config => {
      const token = localStorageService.getAccessToken();
      if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
  },
  error => {
      Promise.reject(error)
  });

 }

 

 async getUserdetail(customer_id){

  let response = await axios.get(`http://localhost:8080/api/Login/Users/${customer_id}`)

 return response;

}

 

async UpdateUserDetails(Id,password,countrycode,contactNumber){

  let response = await axios.put(`http://localhost:8080/api/Login/Users/`,{login_Password:password,login_countryCode:countrycode,login_ContactNumber:contactNumber},{params:{

   id:Id

  }})

 return response;

 

}

 

}

 

export default new LoginService();

