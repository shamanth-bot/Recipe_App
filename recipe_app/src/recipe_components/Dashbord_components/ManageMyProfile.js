import React, { Component } from 'react'

import {Link} from 'react-router-dom'

import Axios from 'axios'

import Recipeservice from '../api/recipeService'

import Preloader from '../Dashbord_components/Preloader'

import moment from 'moment'

import ShareRecipe from '../Dashbord_components/ShareRecipe'

import RegisterService from '../api/RegisterService'

import UpdateRecipe from '../Dashbord_components/UpdateRecipe'

 

import Footer from '../Footer'

import HeaderNav from '../Dashbord_components/HeaderNav'

import MenuComponent from '../Dashbord_components/MenuComponent'

 

class ManageMyProfile extends Component{

 

constructor(props){

  super(props)

  this.state={

    preloading:false,

    errmsg:'',

    errmsgind:false,

    recipe_details:[],

    updateProfile:false,

    recipeid:'',

    msgsuccess:'',

    successInd:false,

    craete_Recipe:false,

    update_Recipe:false,

    customer_details:{},

    customer:props.location.state.customer_Details

    

  }

  this._removeRecipe= this._removeRecipe.bind(this)

  this._onupdateRecipe= this._onupdateRecipe.bind(this)

}

 

_onupdateRecipe(id){

  this.setState({recipeid:id})

}

async _removeRecipe(recipeid,recipeName){

  this.setState({preloading:true})

 

  var response= await Recipeservice.deleteRecipe(recipeid)

  try{

  if(response.status===200){

    var res = await Recipeservice.getRecipeDetails(this.state.customer.cusid)

    if(response.status===200){

      this.setState({recipe_details:res.data,preloading:false})       

    }

    else{

      this.setState({errmsgind:true,errmsg:'cant delete the recipe '+recipeName+' due to some techical difficulty',preloading:false})

    }

 

  }

  else{

    this.setState({errmsgind:true,errmsg:'cant delete the recipe '+recipeName+' due to some techical difficulty',preloading:false})

  }

  }

  catch(error){

    this.setState({errmsgind:true,errmsg:'cant delete the recipe '+recipeName+' due to some technical difficulty',preloading:false})

 

  }

}

 

async componentDidMount(){

this.setState({preloading:true})

this.setState({craete_Recipe:false})

 

  try{

var response = await Recipeservice.getRecipeDetails(this.props.location.state.customer_Details.cusid)

if(response.status===200){

      var resp = await RegisterService.getUserdetailByCusID(this.props.location.state.customer_Details.cusid)

        if(resp.status===200){

          this.setState({customer_details:resp.data})

        }

    this.setState({recipe_details:response.data})

  this.setState({preloading:false})

 

}

else{

  this.setState({preloading:false,errmsg:'No data available for now please try again later',errmsgind:true})

 

}

  }

  catch(error){

    this.setState({preloading:false,errmsg:'cant load any data, issue for now'})

 

  }

 

}




  render(){

    var list_recipes=[]

 

          var recipe_list =this.state.recipe_details

          recipe_list!==null&& recipe_list.map((data)=>{

            list_recipes.push(

                <tr> 

                <td width="30%" height="100%" style={{padding: "6px",margin:"0px",border:"none"}}>

                <div style={{position:"relative",width:"160px",height:"160px",overflow:"hidden",border:"1px solid #dddddd",backgroundColor:"#ffffff",borderRadius:"8px"}}>

 

                { ((data.profile_Photo!==null)&&(data.profile_Photo!=='')) ?<img src={`data:image/jpeg;base64,${data.profile_Photo}` } height="160px" width="160px"   style={{cursor:"pointer"}}></img>:<img  src='/images/No_Photo.jpg' height="160px" width="160px" ></img>}

                </div>

             </td>   

             <td width="50%" height="100%" style={{padding: "6px",margin:"0px",border:"none"}}>

               <span style={{color:"#222222",fontSize:"22px",fontFamily:'Arial, Helvetica, sans-serif'}}>{data.recipe_Name.toUpperCase()}</span>

               <br></br>

            <font style={{color:"#888888",fontSize:"12px"}}>{(data.created_dt!==null ||data.created_dt!=='')?moment(data.created_dt).format('MMM DD,YYYY'):''}</font>

             </td>

 

             <td width="25%" height="100%" style={{padding: "6px",margin:"0px",border:"none",backgroundColor:"#f3f3f3",fontSize:"14px"}}>

             <font style={{fontSize:"16px",color:"#666666"}}><b>Review</b></font>

              <div style={{height:"15px"}}></div>

              <Link to={{pathname:'/Landing_Page',  search: '?Profile='+this.state.customer.firstName,state:{name:this.state.customer.firstName,isloggedin:true,cusID:this.state.customer.cusid,updateRecipe:true,recipe_data:data}}}><span style={{fontsize:"32px",fontFamily:'Verdana'}} >Update Recipe</span></Link><br/>

              <div style={{height:"6px"}}></div>

              <Link to={{pathname:`/Recipe_Details/${data.author}`,state:{ recipe_data:data,customerdetail:this.state.customer_details,photos_list:data.photos_list,name:data.author,ingredients_list:data.ingredients_list,direction_list:data.directions_list,comments:data.comments_List,user:this.props.user}}}>View Recipe</Link>

              <div style={{height:"14px"}}></div>

              <Link style={{color:"#666666"}} onClick={() => {if(window.confirm('Are you sure you want to delete this recipe?')){this._removeRecipe(data.recipeId,data.recipe_Name)};}}>Delete Recipe</Link>

 

             </td>

             </tr>

            )

            }

            

          

            )

         

 

    return(

        <>

 

                

 

        {(this.state.preloading)&&<Preloader/>}

       {(!this.state.preloading)&& 

       <>

    <div class="row" style={{width:'100%',height:'auto',background:'linear-gradient(to bottom,rgba(252,252,252,1) 0%,rgba(252,252,252,1) 75%,rgba(224,224,224,1) 100%,rgba(224,224,224,1) 100%'}}>

 

           <HeaderNav name={this.state.customer.firstName}/>

 

           <div class="col s3 offset-s1">

 

<MenuComponent customer_Details={this.state.customer}></MenuComponent>

</div>

<div class="col s4-s9">

 

       <table width="100%" cellPadding="0" cellSpacing="0" style={{alignContent:"center",overflow:'scroll'}}>

        <tbody>

          <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            <td>

              <font style={{fontSize:"24px"}}>Manage My Recipes</font>

              <br></br><br></br>

              <font style={{fontSize:"18px"}}>

              Have yummy recipes to share? Feature your delicious masterpieces on My Recipes and let foodies follow you</font>

            </td>

 

          </tr>

          <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            <td>

            <Link to={{pathname:'/Landing_Page',  search: '?Profile='+this.state.customer.firstName,state:{name:this.state.customer.firstName,isloggedin:true,cusID:this.state.customer.cusid}}}>  <button type='submit'  name='submit_rating' class='col s6 btn btn-small waves-effect #c62828 red darken-1' style={{position:"relative",left:"0px",width:"160px",borderRadius:"5px"}}>Add My recipe</button></Link>

          </td>

 

          </tr>

            

          <tr style={{padding: "0px",margin:"0px",border:"none"}}> 

            <table width="100%" height='100px' border="0" cellPadding="5" cellSpacing="0" style={{border:"1px solid #dddddd",backgroundColor:"#ffffff"}}>

            <tbody>

             {list_recipes}

             </tbody>

            </table>

            

            </tr>  

          {list_recipes.length===0&&<div style={{minHeight:'60vh'}}></div>}

 

         { list_recipes.length>0 &&  <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            <td>

            <Link to={{pathname:'/Landing_Page',  search: '?Profile='+this.state.customer.firstName,state:{name:this.state.customer.firstName,isloggedin:true,cusID:this.state.customer.cusid}}}>  <button type='submit'  name='submit_rating' class='col s6 btn btn-small waves-effect #c62828 red darken-1' style={{position:"relative",left:"0px",width:"160px",borderRadius:"5px"}}>Add My recipe</button></Link>

          </td>

 

          </tr>}

 

        </tbody>

 

      </table>

 

      </div>

      </div>

      <Footer/>

 

      </>

  }

      </>

    )

 

  }

}

 

export default ManageMyProfile

