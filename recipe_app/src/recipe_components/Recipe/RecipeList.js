import React from 'react'

import Recipe from './Recipe'

import RecipeCard from './RecipeCrad'

const RecipeList = (props)=>{

    const Recipe_list =[];

    var recipes_perPage=props.recipes

    var single_recipePerpAge = (recipes_perPage.length===1)?true:false

     return(

        recipes_perPage.map((recipe,i)=>{

        return <RecipeCard key={i}  val={i} recipeDetails={recipe} cardType={props.cardType} singleRecipe={single_recipePerpAge} user={props.user}/>

           

         })

    

     )

 

}

 

export default RecipeList;

