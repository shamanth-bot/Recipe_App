import React,{Component, Fragment} from 'react'

import Logo from '../../images/Myrecipe.png'

import {Link} from 'react-router-dom'

import Recipe from '../Recipe/Recipe'

import Pagination from '../Pagination/Pagination' 

import RecipeServce from '../api/recipeService'

import {Helmet} from "react-helmet";

import RecipeList from '../Recipe/RecipeList'

 

class search extends  Component{

   

    constructor(props) {

        super(props);

        this.state={

            currentPage:1,

            recipes:[],

            totalCount:0,

            numberPages:0,preloader:false,

            recipesperPage:[],errmsg:'',msg_Success:'',search_err:false,search:'SEARCH RECIPIES'

        }

 

        this.createrecipeRef= React.createRef()

        this.category= React.createRef()

        this._submitChange= this._submitChange.bind(this)

        this.handleClick = this.handleClick.bind(this);

        this.setrecipeDetails= this.setrecipeDetails.bind(this)

        this._onfocuschange= this._onfocuschange.bind(this)

 

      }

      _onfocuschange(e){

        e.preventDefault()

        e.stopPropagation()

        this.setState({errmsg:'',search_err:false});

      

      }

 

      handleClick(e) {

        this.setState({

          currentPage: 2

        });

 

         this.renderRecipes(Number(e.target.id))

      }

     async _submitChange(e){

 

        e.preventDefault()

        e.stopPropagation()

        let category_val=['Appetizers','Beverages','Breakfast','Cocktails','Desserts','Salads','Main','Soups','Side dishes','Snacks'];

 

        this.setState({search_err:false})

        if(this.createrecipeRef.current.value!==''&&this.createrecipeRef.current.value!==null){

          this.setState({search:'SEARCHING...'})

 

          try{

             var response =(this.category.current.value!==''&&this.category.current.value!==null) ?await RecipeServce.getRecipiesByCategory(this.createrecipeRef.current.value,category_val[this.category.current.value-1]) :await RecipeServce.getRecipiesByName(this.createrecipeRef.current.value)

             console.log("status"+response.data)

             console.log('category'+category_val[this.category.current.value-1])

             if(response.status===200){

              console.log(response.data)

              if(response.data.length>0){ this.setrecipeDetails(response.data) ;this.setState({search:'SEARCH RECIPIES'})}else{this.setState({search_err:true,search:'SEARCH RECIPIES'})}

             }

             else{

               this.setState({errmsg:'having some technical difficulties right now please try bac after some time',search:'SEARCH RECIPIES'})

 

             }

            }

            catch(error){

              this.setState({errmsg:'having some technical difficulties right now please try bac after some time',search:'SEARCH RECIPIES'})

 

            }

            

        }

      }

nextPage=(pageNum)=>{

    let recipes_full = this.state.recipes;

    var total_recipes = recipes_full.length

    var startpoint = Math.floor(total_recipes/9);

    var reminder=total_recipes%9;

   var begin = total_recipes-(9*(startpoint-(pageNum-1))+reminder);

   var end_point = ((begin+8)>=total_recipes)?begin+reminder-1:begin+8;

    var recipes_perPage=recipes_full.slice(begin,end_point+1)

    this.setState({recipesperPage:[...recipes_perPage],currentPage:pageNum})

 

}

 async componentDidMount(){

   console.log('category '+this.category.current.value)

   this.setState({preloader:true})

    try{

 

      var response = await RecipeServce.getAllRecipies();

 

if(response.status===200){

  this.setrecipeDetails(response.data)

  this.setState({preloader:false})

 

    }

  

  else{

this.setState({errmsg:'The Site is down right now ,please try after some time',preloader:false})

  }

}

    catch(error){

      this.setState({errmsg:'The Site is down right now ,please try after some time',preloader:false})

 

    }

 

}

 

setrecipeDetails(recipes_list){

  this.setState({totalCount:recipes_list.length})

  var pages= recipes_list.length/9;

  this.setState({recipes:[...recipes_list]})

      if(recipes_list.length<=9){ this.setState({recipesperPage:[...recipes_list],numberPages:1})

}

else{

  var pag_total = ((pages-Math.floor(pages))===0)?Math.floor(pages):Math.floor(pages)+1   

  this.setState({recipesperPage:[...recipes_list.slice(0,9)],numberPages:pag_total,currentPage:1});

 

}

 

}

    render(){

 

    return(

        <Fragment>

                      <Helmet>

                <meta charSet="utf-8" />

                <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js" rel="stylesheet"/>

 

                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

                <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

 

            </Helmet>

            {  (this.state.preloader)&&    

            <div style={{height:'60vh'}}> 

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

 

{(!this.state.preloader) &&     <div>

      <div class="nav-wrapper grey lighten-3">

 

      <table border="0" width ="100%" cellpadding="0" cellspacing="0">

          <tbody>

          <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                  <td style={{textAlign:'center',verticalAlign:'middle'}}>

                  <h5 style={{fontweight: "bold"}}>Food & Drinks <font color="#888888"> &nbsp; | &nbsp; <font style={{fontsize:"24px"}}>Yummy Tasty Recipes</font></font></h5>

  <br/>               <span style={{lineHeight:'22px',fontFamily:'Arial',fontWeight:'normal',fontSize:'22px'}}>Want to craft your own creative tasty meals? Get inspiration from other food lovers, or share your own masterpieces!</span>

  <br/> <br/>              <span style={{lineHeight:'22px',fontFamily:'Arial',fontWeight:'normal',fontSize:'22px'}}> Transform into a master chef now.

    </span>

 

                  </td>

              </tr>

              <tr style={{padding: "0px",margin:"0px",border:"none"}}>

              <td style={{textAlign:'left',verticalAlign:'top'}}>

                <table border='0' width='100%' cellPadding='0' cellSpacing='0' style={{marginBottom:'15px',fontSize:'22px'}}>

                    <tbody>

                        <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                        <td style={{verticalAlign:'top'}} width='25%'>

                          <input ref= {this.createrecipeRef} onFocus={this._onfocuschange} placeholder="Enter a Recipe" id="email" type="text" class="validate" style={{width:'90%'}} />

 

                          </td>

                          <td style={{verticalAlign:'middle',textAlign:'right'}} align='right' width='25%'>

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

                <option value="10">Snacks</option>

 

            </select>

 

              </td>

              <td style={{verticalAlign:'top'}} align='center'>

    <a class="waves-effect waves-light btn-large red" style={{position:"relative",borderRadius:"5px"}} onClick={this._submitChange}><i class="material-icons left">restaurant</i>{this.state.search}</a>

 

              </td>

 

              <td  align='left' >

            <Link to={{pathname: '/Login'}}>  <a class="waves-effect waves-light btn-large #4caf50 green darken-3" onClick={this.handeCraeteRecipe}><i class="material-icons left">restaurant</i>Share My Recipe</a></Link>

              </td>

 

                        </tr>

                    </tbody>

 

                </table>




              </td>

 

             </tr>

 

          </tbody>

          </table>

 

      </div>

      {this.state.search_err&&<div style={{height:'60vh'}}>

       <div style={{height:'20vh'}}></div> <div style={{color:'#fb2222',fontSize:'28px',textAlign:'center',marginBottom:'30vh'}}>Sorry your Search returned no Results.<div style={{height:'10px'}}>Please revise your search Criteria and try again.</div></div></div>}

{(!this.state.search_err)&&this.state.totalCount>9?<Pagination pages={this.state.numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/>:''}

     {(!this.state.search_err)&&(this.state.numberPages===0||this.state.numberPages===1)&& <div class="row" style={{marginBottom:'5%'}}></div>}

   {  (!this.state.search_err)&&<div class="row" style={{marginLeft:'5%'}}>

              <RecipeList recipes={this.state.recipesperPage} cardType='small' user={false}/>

          </div>}

 

            {(!this.state.search_err)&&this.state.totalCount>9?<Pagination pages={this.state.numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/>:''}

 

            </div>}

 

      </Fragment>

        )

}

}

 

export default search

