import React, { Fragment,Component } from 'react'

import Header from '../header'

import Footer from '../Footer'

import {Link,useRouteMatch,Router,Switch,Route} from 'react-router-dom'

import ManageMyProfile from './ManageMyProfile'

import AccountSettings from './AccountSettings'

import Logout from './Logout'

import ShareRecipe from './ShareRecipe'

import UpdateMyRecipeProfile from './UpdateMyRecipeProfile'

import { useLocation } from "react-router-dom";

import HeaderNav from '../Dashbord_components/HeaderNav'

import  M from "materialize-css"

import RecipeService from '../api/recipeService'

import Customer from '../api/RegisterService'

import UpdateRecipe from '../Dashbord_components/UpdateRecipe'

 

const chat_Content_Template = require('../RecipeList_temp.js')

 

class  profileLandingPage extends Component{

 

  constructor(props){

 

    super(props);

    this.state={

        Manage_MyProfile:false,

        Account_Settings:false,

        shareRecipe:true,

        UpdateMyRecipeProfile:false,

        cusID:this.props.location.state.cusID,

        name:this.props.location.state.name,

        

        customer_Details:{},

        Recipe_Details:[],

        errmsg:''

 

    }

 

    this._handleLinkClick = this._handleLinkClick.bind(this)

 

    

 

  }

 

  async componentDidMount(){

 

    let dropdowns = document.querySelectorAll('.dropdown-trigger');

    

    

 

    let options = {

      inDuration: 300,

      outDuration: 300,

      hover: true, // Activate on hover

      coverTrigger: false, // Displays dropdown below the button

  };

  

 

    M.Dropdown.init(dropdowns,options); 

      try{

    var response = await Customer.getUserdetailByCusID(this.state.cusID)

  

     if(response.status===200&&response.data!==null){

        this.setState({customer_Details:response.data})

     }

     else{

       this.setState(({errmsg:'trouble fetching data please get in touch later'}))

     

    }

  }

    catch(error){

      this.setState({errmsg:'unable to get the data'})

    }

  

 

  }

  

  _handleLinkClick(linkval){

    switch(linkval){

     case 'ManageMyprofile':

         this.setState({Manage_MyProfile:true,Account_Settings:false,shareRecipe:false,UpdateMyRecipeProfile:false})

         break;

      case 'updateSettings':

          this.setState({Account_Settings:true,Manage_MyProfile:false,shareRecipe:false,UpdateMyRecipeProfile:false})

          break;

      case 'UpdateMyRecipeProfile' :

          this.setState({Account_Settings:false,Manage_MyProfile:false,shareRecipe:false,UpdateMyRecipeProfile:true})

           break;

 

    }

 

  }

 

render(){
     console.log("user "+this.props.user)
    return(

        <Fragment>

                 

       <HeaderNav name={this.state.customer_Details.firstName}/>

 

        <div class="row" style={{width:'100%',height:'auto',background:'linear-gradient(to bottom,rgba(252,252,252,1) 0%,rgba(252,252,252,1) 75%,rgba(224,224,224,1) 100%,rgba(224,224,224,1) 100%'}}>

 

        <div class="col s3 offset-s1">

 

          <table style={{border:"0",width:"100%",marginTop:"20px"}}  cellPadding="0" cellSpacing="0">

            <tbody >

            <tr style={{padding: "0px",margin:"0px",border:"none"}}>

               <td>

                 <div style={{backgroundColor:"#ff3a3a",fontSize:"15px",lineHeight:"33px",width:"252px",height:"35px",fontWeight:"bold",color:"#ffffff",textAlign:"center",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>Member Operations</div>

                  <div style={{fontsize:"14px",lineHeight:"18px",padding:"0px",width:"252px",backgroundColor:"#ffffff",borderLeft:"1px solid #dddddd",borderRight:"1px solid #dddddd",borderTop:"0px",borderBottom:"1px solid #dddddd",color:"#555555"}}>

                    <center>

                      <div style={{width:"0px",height:"0px",borderLeft:"12px solid transparent",borderRight:"12px solid transparent",borderTop:"12px solid #ff3a3a"}}></div>

                    </center>

                    <table style={{border:"0",width:"100%",bottom:"20px"}} cellPadding="0" cellSpacing="0">

                       <tody>

                       <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                         <td>

                         <Link to={{pathname: `${this.props.match.url}/Manage_Recipies/${this.state.name}`, state:{customer_Details:this.state.customer_Details}}}><span style={{fontsize:"32px",fontFamily:'Verdana'}}>Manage My Recipes</span></Link><br/>

                         <Link to={{pathname:`/Profile/${this.state.name}`,state:{cusID:this.state.cusID}}}> <span style={{fontsize:"32px",fontFamily:'Verdana'}} >My Recipes Profile</span></Link><br/>

                         <Link to={{pathname:`${this.props.match.url}/Search_Recipies/${this.state.name}`,state:{customer_Details:this.state.customer_Details}}}> <span style={{fontsize:"32px",fontFamily:'Verdana'}} >Search Recipies</span></Link><br/><br/>



                        <Link to={{ pathname: `${this.props.match.url}/Update_Profile/${this.state.name}`,state:{customer_Details:this.state.customer_Details}}}><span style={{fontsize:"32px",fontFamily:'Verdana'}}>Update My Recipes Profile</span></Link><br/>

<Link to={{pathname:`/Landing_Page/Account_Settings/${this.state.name}`,state:{customer_Details:this.state.customer_Details}}}><span style={{fontsize:"32px",fontFamily:'Verdana'}}>Update My Recipes Settings</span></Link><br/>


<Link to='/LogOut'><span style={{fontsize:"32px",fontFamily:'Verdana'}}>LogOut</span></Link>



</td>





</tr>

</tody>                      

</table>

</div>

</td>



</tr>

</tbody>

</table>

</div>



<div class="col s4-s9">





{ (!this.props.location.state.updateRecipe) && <ShareRecipe cusID= {this.state.cusID} username={this.state.name}/>   }

{ (this.props.location.state.updateRecipe) && <UpdateRecipe  recipe_details ={this.props.location.state.recipe_data}cusID= {this.state.cusID} username={this.state.name}/>   }



</div>






</div>

<Footer/>



</Fragment>

)

}



}



export default profileLandingPage

