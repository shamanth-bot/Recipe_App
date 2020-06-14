import React from 'react';

import ReactDOM from 'react-dom';

import {BrowserRouter as Router,Route}from 'react-router-dom'

import { Switch } from "react-router";

import App from '../App';

import {useState} from 'react'

import Login from "./Login/login"

import Register from "./Register/Register"

import  RecipeDetails from "./Recipe/RecipeDetails_Page"

import Landing from "./Dashbord_components/profileLandingPage"

import AccountSettings from "./Dashbord_components/AccountSettings"

import Logout from './Dashbord_components/Logout'

import MyProfile from './Dashbord_components/MyRecipeProfile'

import PasswordResetValidator from '../recipe_components/Login/PasswordResetValidator'

import Protected_Route  from '../recipe_components/ProtectedRoute'

import RegisterValidator from '../recipe_components/Register/RegisterValidator'

import Update_Profile from './Dashbord_components/UpdateMyRecipeProfile'

import Manage_Profile from './Dashbord_components/ManageMyProfile'

import Search_Recipies from './Dashbord_components/SearchRecipies'

const Recipe_Pages =  (props) => {

    const [user, loggedIn] = useState(false)
    const handleLogin = (val) => {

        loggedIn(val);

      } 

 

return(

<Router>

    <Switch>

     <Route exact path="/" component={App}/>

      <Route exact path="/Login" handleLogin ={handleLogin} render={props => <Login {...props}  handleLogin={handleLogin} />} />

      <Route exact path="/Register" component={Register}/>

      <Route exact path="/Recipe_Details/:userId" render={props=><RecipeDetails {...props}></RecipeDetails>}/>

      <Protected_Route exact path='/Landing_Page' user = {user}  component={Landing}  />

      <Protected_Route exact path="/Landing_Page/Account_Settings/:username" user = {user} component={AccountSettings}/>

      <Protected_Route exact path="/Landing_Page/Update_Profile/:username" user = {user} component={Update_Profile}/>

      <Protected_Route exact path="/Landing_Page/Manage_Recipies/:username" user = {user} component={Manage_Profile}/>

      <Protected_Route exact path="/Landing_Page/Search_Recipies/:username" user = {user} component={Search_Recipies}/>

 

      <Route exact path="/LogOut" handleLogin ={handleLogin} render={props => <Logout {...props}  handleLogin={handleLogin}/>}/>

      <Protected_Route exact path="/Profile/:Uid" user = {user} component={MyProfile}/>

      <Route exact path="/password_reset/:token" component={PasswordResetValidator}/>

      <Route exact path="/Registration_Confirmation/:token" component={RegisterValidator}/>

 

</Switch>

</Router>

)

}

export default Recipe_Pages;

