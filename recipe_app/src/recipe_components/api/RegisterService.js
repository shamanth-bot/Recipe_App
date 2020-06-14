import axios from 'axios';

 

class RegisterService{

 

 async getUserdetails(){

  let response = await axios.get('http://localhost:8080/api/Register/UsernameEmail_Details') 

 return response;

 

 }

 

 async updateProfieDetails(lastname,firstname,username,Gender,Dob,webSite,aboutyourself,Occupation,cusID){

   let response = await axios.put('http://localhost:8080/api/Register/Users',{firstName:firstname,lastName:lastname,dob:Dob,webSite:webSite,

   userName:username,gender:Gender,ebtYourself:aboutyourself,occupation:Occupation},{params:{id:cusID}}

   )

   return response;

 }

 

 async getUserdetailByCusID(cusID){

  let response = await axios.get('http://localhost:8080/api/Register/User',{params:{

    id:cusID

  }}) 

 return response;

 

 }

 

 async updateProfilePhoto(cusid,fileData){

  let response = await axios.post('http://localhost:8080/api/Register/User/uploadProfilePhoto',fileData,{params:{cusID:cusid}}) 

 return response;

 

 }

 

 async updateCoverPhoto(cusid,fileData){

  let response = await axios.post('http://localhost:8080/api/Register/User/uploadCoverPhoto',fileData,{params:{cusID:cusid}}) 

 return response;

 

 }

 

 async postCustomerDetails(Email,Pwd,firstname,lastname,username){

    let response = await axios.post('http://localhost:8080/api/Register/Users',{email:Email,pwd:Pwd,firstName:firstname,lastName:lastname,userName:username}) 

    return response;

  

   }

 

   async validateRegistrationToken(tokenVal){

      let response = await axios.get('http://localhost:8080/api/Register/getToken',{ params: {

        token:tokenVal

      }}) 

     return response;

    

     }

     async postRegistrationChangeUpdate(tokenVal){

         let response = await axios.post('http://localhost:8080/api/Register/UpdateToken',null,{ params: {

           token:tokenVal

         }}) 

        return response;

       

        

       

     }

    

   

}

 

export default new RegisterService();

