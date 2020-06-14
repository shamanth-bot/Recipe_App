import React from 'react'

import Recipe from './Recipe'

import RecipeCard from './Recipe_Card'

const Recipe_List = (props)=>{

    const Recipe_list =[];

    var recipes_perPage=props.recipes

    console.log('customer'+props.cus_Details.gender)

     return(

        recipes_perPage.map((recipe,i)=>{

        return <RecipeCard key={i} recipeDetails={recipe} user={props.user} cus_Details={props.cus_Details} SingleRecipe={recipes_perPage.length===1?true:false}/>

           

         })

    

     )

 

}

 

export default Recipe_List;