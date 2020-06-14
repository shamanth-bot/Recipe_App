import React,{Component, Fragment, useState} from 'react'

import Header from '../../recipe_components/header'

import Footer from '../Footer'

import {Helmet} from "react-helmet";

import MorePhotos from '../RecipeDetails_components/MorePhotos'

import '../../recipe_components/Recipe/recipe_css/recipe.css'

import HeaderSection from '../../recipe_components/RecipeDetails_components/HeaderSection'

import RecipeHeader from '../../recipe_components/RecipeDetails_components/RecipeHeaderDetails'

import Ingredients from '../../recipe_components/RecipeDetails_components/Ingredients'

import Directions from '../../recipe_components/RecipeDetails_components/Directions'

import Rating from '../../recipe_components/RecipeDetails_components/Rating'

import Comments from '../../recipe_components/RecipeDetails_components/Comments_Section'

 

import Logo from '../../images/Myrecipe.png'




class RecipeDetails_Page extends Component{

 

   

  constructor(props) {

    super(props);

    this.state={

      morePhotos:false,

      image:'',

 

    }

    this.morephotsImg= this.morephotsImg.bind(this)

  }

 

  morephotsImg=(img)=>{

      this.setState({morePhotos:true,image:img})

  }

 

  img_close=()=>{

    this.setState({morePhotos:false})

 

  }

    

     render(){

     return (

       <Fragment>

        <center>

 

        <nav class="navbar navbar-main margin-bottom-6 navbar-expand-lg navbar-light bg-white">

 

<div class="nav-wrapper white darken-4">

<img img src={Logo} alt="HeaderLin"style={{position: "absolute",left:"95vh",height:"8vh",bottom:"0px",width:"50vh"}} class="brand-logo"></img>

    

</div>

</nav>

 

      <div class="conatiner">     

 

     <HeaderSection profileImage={this.props.location.state.customerdetail.profile_photo}  coverImage= {this.props.location.state.customerdetail.cover_photo}  followers = {this.props.location.state.followers}  gender ={this.props.location.state.customerdetail.gender} author=  {this.props.location.state.recipe_data.author}></HeaderSection>

     

 

<br/>

 

   <div style={{position:"relative"}}>

 

         <centre>        

             

             <div style={{margintop: "15px", border: "1px solid #dddddd", borderTopLeftRadius: "15px", borderTopRightRadius: "15px", boxShadow: "0px 0px 6px #e0e0e0",width:"1100px"}}>

 

     <div align="center"  style={{borderTopLeftRadius:"15px",borderTopRightRadius:"15px", width: "100%",backgroundcolor: "#f0f0f0", fontSize: "28px", lineHeight: "40px", verticalalign: "middle", padding: "5px",backgroundImage:"-webkit-linear-gradient(top, #f8f8f8, #d8d8d8)"}}>{this.props.location.state.recipe_data.recipe_Name}</div>

              

     <RecipeHeader Recipe_data={this.props.location.state.recipe_data} user={this.props.location.state.user}></RecipeHeader>

     

<table border="0" width="100%"  cellPadding="15" cellSpacing="0" backgroundcolor="#ffffff" style={{borderTop:"1px solid #e0e0e0",paddingTop:"10px",color:"#333333",paddingBottom:"0px",marginBottom:"0px",borderBottom:"0px",borderCollapse:"collapse"}}>

            <tbody>

            <tr style={{padding: "0px",margin:"0px",border:"none",borderBottom:"none"}}>

             <Ingredients ingredients_list = {this.props.location.state.ingredients_list}></Ingredients>

              <Directions directionlist={this.props.location.state.direction_list}></Directions>

              </tr>

               {this.props.location.state.recipe_data.video!==null&&this.props.location.state.recipe_data.video!==''&&

               <tr style={{padding: "0px",margin:"0px",border:"none",borderBottom:"none"}}>

                 <td>

               <div className="video-container"> 

                <iframe width="450" height="180" src={this.props.location.state.recipe_data.video} frameBorder='0' allowFullScreen></iframe>

                 </div>

                 </td>

                 </tr>

               }

             <MorePhotos Photos={this.props.location.state.photos_list} morephotsImg={this.morephotsImg}/>

 

            </tbody>

 

         </table>

 

        </div>







      <div style={{margintop: "15px", border: "0",width:"1100px"}}>

 

     <table width="100%" boder="0" cellSpacing="0" cellSpacing="0" marginTop="40px" style={{marginTop:"40px"}}>

         <tbody>

             <tr>

                 <td width="30%" valign="top">

                   <Rating recipeId= {this.props.location.state.recipe_data.recipeId} user={this.props.location.state.user}></Rating>

                 </td>

 

                <td width="70%" valign="top">

                 <Comments  recipeId= {this.props.location.state.recipe_data.recipeId} cusDetails={this.props.location.state.customerdetail} Comments={this.props.location.state.comments} user={this.props.location.state.user}></Comments>

                 </td>





        </tr>

        </tbody>

 

        </table>

     

</div>

        </centre>







</div>






{this.state.morePhotos===true &&<div style={{background:'rgba(0,0,0,0.5)',color:'#666666',width:'auto',height:'auto',display:'block',position:'fixed',bottom:0,top:0,right:0,left:0,zIndex:'8100'}}>

 

<div style={{height:'30px'}}></div>

                         <center>

                         <div tabIndex='-1' style={{padding:0,margin:0,boder:0,outline:'none',verticalAlign:'top',width:'525px',height:'525px',position:'absolute',display:'inline-block',top:'142px',left:'350px',opacity:1,overflow:'visible',marginLeft:'175px'}}>

 

                          <div style={{padding:'12px',width:'525px',height:'525px',position:'relative',background:'#f9f9f9',color:'#444444',textShadow:'none',borderRadius:'4px'}}>

                          <img src='/images/close.png' style={{position:'absolute',top:'-18px',right:'-18px',width:"36px",height:'36px',cursor:'pointer',pointerEvents:'all',background:'rgba(0,0,0,0)',color:'rgba(0,0,0,0)'}} onClick={()=>(this.setState({morePhotos:false}))}></img>

 

                               <div style={{overflow:'visible',width:'500px',height:'500px',padding:'5px'}}> 

     <img style={{display:'block',width:'100%',height:'100%',pointerEvents:'all'}} src={`data:image/jpeg;base64,${this.state.image}` } ></img>

                               </div>

                          </div>

                          </div>

                          </center>

 

                      <div>

 

                      </div>

 

                     

                    </div>}

 

                  







</div>

     

 

<Footer/>




      </center>

 

      </Fragment>

      

    )

 

}

}

 

export default RecipeDetails_Page;