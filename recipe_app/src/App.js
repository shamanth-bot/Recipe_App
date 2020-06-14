import React, { Component,Fragment } from 'react';

import './App.css';

import {BrowserRouter as Router,Route}from 'react-router-dom'

import Search from './recipe_components/Search/search'

import Header from './recipe_components/header'

import {Helmet} from "react-helmet";

import Footer from './recipe_components/Footer'

class App extends Component{  

  render(){

    return(

    <div className="App">

                      <Helmet>

                <meta charSet="utf-8" />

                <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js" rel="stylesheet"/>

 

                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

                <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

 

            </Helmet>

 

     <Header/>

     <Search/>

     <Footer/> 

 

    </div>

 

   

)

 

  }

  

}

export default App;

 

 



