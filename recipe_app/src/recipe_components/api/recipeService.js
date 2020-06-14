import axios from 'axios';

 

class recipeService{

 

 async postChatsolution(id,name,date){

     let response = await axios.post('http://localhost:8080/User',{id:id,name:name,birthdate:date}).then(function (response) {

        console.log(response);

      })

      .catch(function (error) {

        console.log(error);

      });

    

     return response;

     

 }

 

 async getUname(userName){

  var response = await axios.get(`http://localhost:8080/Register/Users/userNames/${userName}`);

  return response;

 }

 async deleteRecipe(Id){

  let response = await axios.delete('http://localhost:8080/api/RecipeList/Delete',{params:{id:Id}})

  return response;

 

 }

 

 async updateProfieDetails(lastname,firstname,username,Gender,Dob,webSite,aboutyourself,cusID){

  let response = await axios.put('http://localhost:8080/api/Register/Users',{firstName:firstname,lastName:lastname,dob:Dob,webSite:webSite,

  userName:username,gender:Gender,ebtYourself:aboutyourself},{params:{id:cusID}}

  )

  return response;

}

 

 async postRecipe(RecipeName,Category,GlutenFree,DairyFree,Vegan,Nutfree,duration_Mts,duration_hrs,Servings,ingredients,directions,Video,cusID,name){

    var response = await axios.post(`http://localhost:8080/api/RecipeList/recipes`,{recipe_Name:RecipeName,author:name,category:Category,glutenFee:GlutenFree,dairyFree:DairyFree,vegan:Vegan,nutFree:Nutfree,duration_mts:duration_Mts,duration_hrs:duration_hrs,servings:Servings,ingredients_list:ingredients,directions_list:directions,video:Video

 

},{params:{CusID:cusID}});

return response;



}

async postRatting(recipeId,Description,Rating){

    var response = await axios.post(`http://localhost:8080/api/RecipeList/Rating`,{rating_number:Rating,description:Description
  
   
  
    },{params:{recipeID:recipeId}});
  
    return response;
  
   
  
   }
  
   async updateRecipe(RecipeName,Category,GlutenFree,DairyFree,Vegan,Nutfree,duration_Mts,duration_hrs,Servings,ingredients,directions,Video,cusID,recipeID,name,photosdata){

    var response = await axios.put(`http://localhost:8080/api/RecipeList/recipes`,{recipe_Name:RecipeName,author:name,category:Category,glutenFee:GlutenFree,dairyFree:DairyFree,vegan:Vegan,nutFree:Nutfree,duration_mts:duration_Mts,duration_hrs:duration_hrs,servings:Servings,ingredients_list:ingredients,photos_list:photosdata,directions_list:directions,video:Video
  
   
  
    },{params:{CusID:cusID,recipeID:recipeID}});
  
    return response;
  
   
  
   }
  
   async getRecipiesByName(recipename){

    var response = await axios.get(`http://localhost:8080/api/RecipeList/recipesByName`,{params:{recipeName:recipename}});
  
    return response;
  
   
  
   }
  
   
  
   async getRecipiesByCategory(recipename,category){
  
    var response = await axios.get(`http://localhost:8080/api/RecipeList/recipesByCategory`,{params:{recipeName:recipename,Category:category}});
  
    return response;
  
   
  
   }
  
   
  
   async postComments(recipeId,cusid,comment,username,profilephoto){
  
    var response = await axios.post(`http://localhost:8080/api/RecipeList/Comments`,{cusID:cusid,comments:comment,userName:username,profile_Photo:profilephoto
  
   
  
    },{params:{recipeID:recipeId}});
  
    return response;
  
   
  
   }
  
   
  
   async getAllRecipies(){
  
    var response = await axios.get(`http://localhost:8080/api/RecipeList/recipes`);
  
    return response;
  
   
  
   }
  
   
  
   async uploadFilestoDB(File_data,reciepID){
  
   
  
      let response = await axios.post(`http://localhost:8080/api/RecipeList/recipePhotosUpload/${reciepID}`,File_data)
  
      return response;
  
   
  
  }
  
   
  
  async getRecipeDetails(cus_Id){
  
    let response = await axios.get('http://localhost:8080/api/RecipeList/recipeByCusid',{params:{CusID:cus_Id}})
  
    return response;
  
   
  
  }
  
   
  
  async getRecipeDetailsByID(recipeID){
  
    let response = await axios.get('http://localhost:8080/api/RecipeList/recipe',{params:{id:recipeID}})
  
    return response;
  
   
  
  }
  
   
  
  }
  
   
  
  export default new recipeService();
  
      