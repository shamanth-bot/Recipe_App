  import React,{Fragment, Component} from 'react'

import {Link} from 'react-router-dom'

import Preloader from '../Dashbord_components/Preloader'

import {Helmet} from "react-helmet";

import Pagination from '../Pagination/Pagination' 

import RecipeList from '../Recipe/RecipeList'

import RecipeServce from '../api/recipeService'

 

import Footer from '../Footer'

import HeaderNav from '../Dashbord_components/HeaderNav'

import MenuComponent from '../Dashbord_components/MenuComponent'

class  SearchRecipies extends Component{

    constructor(props) {

        super(props);

 

         this.state={

          currentPage:1,

          recipes:[],

          totalCount:0,

          numberPages:0,

          recipesperPage:[],search_err:false,preloader:false,errmsgInd:false

         }

 

        this.createrecipeRef = React.createRef()

        this.category= React.createRef()

        this._submitChange= this._submitChange.bind(this)

        this._onfocuschange= this._onfocuschange.bind(this)

        this.setrecipeDetails= this.setrecipeDetails.bind(this)

          

    }    

 

    _onfocuschange(e){

      e.preventDefault()

      e.stopPropagation()

      this.setState({errmsgInd:false,search_err:false});

    

    }

 

    setrecipeDetails(recipes_list){

      this.setState({totalCount:recipes_list.length})

      var pages= recipes_list.length/6;

      this.setState({recipes:[...recipes_list]})

          if(recipes_list.length<=6){ this.setState({recipesperPage:[...recipes_list],numberPages:1})

    }

    else{

      var pag_total = ((pages-Math.floor(pages))===0)?Math.floor(pages):Math.floor(pages)+1   

      this.setState({recipesperPage:[...recipes_list.slice(0,6)],numberPages:pag_total});

     

    }

    

    }

    

    nextPage=(pageNum)=>{

      let recipes_full = this.state.recipes;

      var total_recipes = recipes_full.length

      var startpoint = Math.floor(total_recipes/6);

      var reminder=total_recipes%9;

     var begin = total_recipes-(6*(startpoint-(pageNum-1))+reminder);

     var end_point = ((begin+5)>=total_recipes)?begin+reminder-1:begin+5;

      var recipes_perPage=recipes_full.slice(begin,end_point+1)

      this.setState({recipesperPage:[...recipes_perPage],currentPage:pageNum})

  

  }

 

  async _submitChange(e){

 

    e.preventDefault()

    e.stopPropagation()

    let category_val=['Appetizers','Beverages','Breakfast','Cocktails','Desserts','Salads','Main','Soups','Side dishes','Snacks'];

 

    this.setState({search_err:false,errmsgInd:false,preloader:true})

    if(this.createrecipeRef.current.value!==''&&this.createrecipeRef.current.value!==null){

 

      try{

         var response =(this.category.current.value!==''&&this.category.current.value!==null) ?await RecipeServce.getRecipiesByCategory(this.createrecipeRef.current.value,category_val[this.category.current.value-1]) :await RecipeServce.getRecipiesByName(this.createrecipeRef.current.value)

         console.log("status"+response.data)

         console.log('category'+category_val[this.category.current.value-1])

         if(response.status===200){

          console.log(response.data)

          if(response.data.length>0){ 
            
            this.setrecipeDetails(response.data) ;this.setState({search:'SEARCH RECIPIES',preloader:false})}else{this.setState({search_err:true,errmsgInd:true,preloader:false})}

         }

         else{

           this.setState({errmsgInd:true,peloader:false})

 

         }

        }

        catch(error){

          this.setState({errmsgInd:true,preloader:false})

 

        }

        

    }

  }

 

  

 

    render(){

        return(<>

              <Helmet>

      <meta charSet="utf-8" />

      <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js" rel="stylesheet"/>

 

      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

      <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

 

  </Helmet>

 

   <HeaderNav name={this.props.location.state.customer_Details.firstName}/>

   <div class="row" style={{width:'100%',height:'auto',background:'linear-gradient(to bottom,rgba(252,252,252,1) 0%,rgba(252,252,252,1) 75%,rgba(224,224,224,1) 100%,rgba(224,224,224,1) 100%'}}>

 

<div class="col s3 m3 l3 offset-s1 offset-m1 offset-l1">

 

<MenuComponent customer_Details={this.props.location.state.customer_Details}></MenuComponent>

</div>

 

<div class="col s8 m3 l8">

      

<table width="100%" cellPadding="0" cellSpacing="0" style={{alignContent:"center"}}>

        <tbody>

          <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            <td style={{height:"10px"}}>

              <font style={{fontSize:"28px",fontFamily:'verdana',left:"10px"}}>Search Recipies</font>

            </td>

            

             </tr>

             <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            

 

      <div class="row">

        <div class="col s4 m4 l4">

        <input ref= {this.createrecipeRef} onFocus={this._onfocuschange} placeholder="Enter a Recipe" id="email" type="text" class="validate" style={{width:'90%'}} />

        </div>

        <div class="col s4 m4 l4">

        <select ref={this.category} class="browser-default" style={{borderTop:"1px solid #808080",borderBottom:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF',width:'80%'}} >

                <option value="" disabled="disabled" selected="selected" >Choose Category</option>

                <option value="1">Appetizers</option>                

                <option value="2">Beverages</option>

                <option value="3">Breakfast</option>

                <option value="4">Cocktails</option>

                <option value="5">Desserts</option>

                <option value="6">Salads</option>

                <option value="7">Main Course</option>

                <option value="8">Soups</option>

                <option value="9">Side dishes</option>

                <option value="9">Snacks</option>

 

            </select>

        </div>

        <div class="col s4 m4 l4">

        <a class="waves-effect waves-light btn red" style={{position:"relative",borderRadius:"5px"}} onClick={this._submitChange}><i class="material-icons left">restaurant</i>Search Recipes</a>

        </div>

 

      </div>

 

</tr>

        </tbody>

 

      </table>

  {this.state.recipes.length===0 && !this.state.errmsgInd&&!this.state.search_err && <div style={{height:'50vh'}}> 

 

    </div>}

      {this.state.preloader &&
      <div style={{minHeight:'50vh'}}>

      <div style={{position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
      
      <div class="preloader-wrapper big active">
      
      <div class="spinner-layer spinner-blue-only">
      
        <div class="circle-clipper left">
      
          <div class="circle"></div>
      
        </div><div class="gap-patch">
      
          <div class="circle"></div>
      
        </div><div class="circle-clipper right">
      
          <div class="circle"></div>
      
        </div>
      
      </div>
      
      </div>
      
      </div>
      
      </div>
      
      }

       {this.state.errmsgInd&& !this.state.preloader &&<div style={{height:'60vh'}}>

       <div style={{height:'20vh'}}></div> <div style={{color:'#fb2222',fontSize:'28px',textAlign:'center',marginBottom:'30vh'}}>Sorry your Search returned no Results.<div style={{height:'10px'}}>The Application is down , please try after some time.</div></div></div>}

 

{(!this.state.errmsgInd&&!this.state.search_err)&&!this.state.preloader&&this.state.totalCount>6?<Pagination pages={this.state.numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/>:''}

     {(!this.state.errmsgInd&&!this.state.search_err&&!this.state.preloader)&&(this.state.numberPages===0||this.state.numberPages===1)&& <div class="row" style={{marginBottom:'5%'}}></div>}

       {(!this.state.errmsgInd&&!this.state.preloader)&&<div class="row">

              <RecipeList recipes={this.state.recipesperPage}  user={this.props.user} cardType='large'/>

          </div>}

 

            {(!this.state.search_err&&!this.state.errmsgInd&&!this.state.preloader)&&this.state.totalCount>6?<Pagination pages={this.state.numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/>:''}

           

            </div>

 

            </div>

 

<Footer/>

 

</>

 

)   

 

}

 

}

export default SearchRecipies;

