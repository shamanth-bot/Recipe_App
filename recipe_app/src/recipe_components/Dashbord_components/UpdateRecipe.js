import React,{Fragment, Component} from 'react'

import {Link} from 'react-router-dom'

import {Helmet} from "react-helmet";

import M from 'materialize-css';

import RecipeService from '../api/recipeService'

import Preloader from '../Dashbord_components/Preloader'

class  UpdateRecipe extends Component{

   constructor(props){

     super(props)

 

        this.state={

          file_Data:[],

          fileCount:0,

          glutenfree:false,

          nutfree:false,

          vegan:false,

          dairyfree:false,

          errmsgInd:false,

          errmsg:[],

          success_msg:'',

          poto_Count:0,

          

          ingredients:[],

          directions:[],

          updated_photoList:[],

          photos:[],preloader:false

 

        }

         this.createrecipeRef = React.createRef();

         this.category = React.createRef();

         this.Durationhrs = React.createRef();

         this.DurationMinutes = React.createRef();

         this.servings= React.createRef();

         this.Ingredients = React.createRef();

         this.Directions= React.createRef();

         this.video= React.createRef();

         this.gluten= React.createRef();

         this.dairyFree= React.createRef();

         this.vegan= React.createRef();

         this.nutFree = React.createRef();

 

         this._onFileChangeHandler= this._onFileChangeHandler.bind(this)

         this.onChangeRestrictions=this.onChangeRestrictions.bind(this    )

         this._close= this._close.bind(this)

         this._onfocuschange = this._onfocuschange.bind(this)

         this._UpdateRecipe= this._UpdateRecipe.bind(this)

   }

   _onfocuschange(empty){

     this.setState({errmsgInd:false,success_msg:''})

     

   }

 

   

   async _UpdateRecipe(e){

     e.preventDefault()

       e.stopPropagation()

 

       var video = (this.video.current.value.toString().includes('watch?v='))?this.video.current.value.toString().replace('watch?v=','embed/'):this.video.current.value

 

       this.setState({preloader:true})

 

       var data = this.state.file_Data

       const formData = new FormData();

  

       for(let i = 0; i<data.length; i++) {

  

        formData.append('file',data[i])

       }

 

       var new_ingredients=[] 

       var ingred = this.Ingredients.current.value.split("\n").filter(v=>v!='')

       for(var i =0;i<ingred.length;i++){

        new_ingredients[i]={

          ingredients:ingred[i]

        }

       }

       var new_Directions=[]

 

       var direction = this.Directions.current.value.split("\n").filter(v=>v!='')

 

     for(var i =0;i<direction.length;i++){

      new_Directions[i]={

        directions:direction[i]

      }

     }

 

       let category_val=['Appetizers','Beverages','Breakfast','Cocktails','Desserts','Salads','Main','Soups','Side dishes','Snacks'];

 

       try{

       var response =  await  RecipeService.updateRecipe(this.createrecipeRef.current.value,category_val[this.category.current.value-1],this.gluten.current.checked,

                         this.dairyFree.current.checked,this.vegan.current.checked,this.nutFree.current.checked,this.DurationMinutes.current.value,this.Durationhrs.current.value,

                          this.servings.current.value,new_ingredients,new_Directions,video,this.props.cusID,this.props.recipe_details.recipeId,this.props.username,this.state.updated_photoList)

        if(response.status===201){

          if(data.length>0){

            var resp = await RecipeService.uploadFilestoDB(formData,response.data.recipeId)

          }

          this.setState({preloader:false,file_Data:[],fileCount:0,updated_photoList:[]})

   

          this.setState({success_msg:"successfully posted recipe "+response.data.recipe_Name});

           }

   

       }

       catch(error){

         this.setState({preloader:false,file_Data:[],fileCount:0})

   

         this.setState(prevState => ({

           errmsg: [...prevState.errmsg,'cant update the recipe '+this.createrecipeRef.current.value+' please try again later']

         })) 

   

       }

        }

   

   

 

   async componentDidMount(){

    M.AutoInit();

   console.log(this.props.recipe_details)

   let category_val=['Appetizers','Beverages','Breakfast','Cocktails','Desserts','Salads','Main','Soups','Side dishes','Snacks'];

    this.createrecipeRef.current.value= (this.props.recipe_details&&this.props.recipe_details.recipe_Name!==null)?this.props.recipe_details.recipe_Name:''

    this.category.current.value= (this.props.recipe_details&&this.props.recipe_details.category!==null)?category_val.indexOf(this.props.recipe_details.category)+1:''

    this.gluten.current.checked=(this.props.recipe_details)?this.props.recipe_details.glutenFee:false

    this.vegan.current.checked=(this.props.recipe_details)?this.props.recipe_details.vegan:false

    this.dairyFree.current.checked=(this.props.recipe_details)?this.props.recipe_details.dairyFree:false

    this.nutFree.current.checked=(this.props.recipe_details)?this.props.recipe_details.nutFree:false

    this.Durationhrs.current.value= (this.props.recipe_details&&this.props.recipe_details.duration_hrs!==null)?this.props.recipe_details.duration_hrs:''

    this.DurationMinutes.current.value= (this.props.recipe_details&&this.props.recipe_details.duration_mts!==null)?this.props.recipe_details.duration_mts:''

    this.servings.current.value= (this.props.recipe_details&&this.props.recipe_details.servings!==null)?this.props.recipe_details.servings:''
    this.video.current.value=(this.props.recipe_details&&this.props.recipe_details.video!==null)?(this.props.recipe_details.video.toString().includes('embed/'))?this.video.current.value.toString().replace('embed/','watch?v='):this.video.current.value:''
     
    
   

    if (this.props.recipe_details){

    var IngredientsList=''

        var ist_ingredients = this.props.recipe_details.ingredients_list

        ist_ingredients.map((data)=>{

          IngredientsList= IngredientsList+data.ingredients+"\n"

        })

        this.Ingredients.current.value= IngredientsList

 

   }

   if(this.props.recipe_details){

    var direction =''

 

     var direction_List= this.props.recipe_details.directions_list

     direction_List.map((data)=>{

      direction= direction+data.directions+"\n"

    })

    this.Directions.current.value= direction

 

   }

  

   this.video.current.value= (this.props.recipe_details&&this.props.recipe_details.video!==null)?this.props.recipe_details.video:''

 

   if(this.props.recipe_details){

     var photos = this.props.recipe_details.photos_list

     this.setState({updated_photoList:photos,fileCount:photos.length})

   }

   }

 

   onChangeRestrictions(e){

     switch(e.target.name){

       case 'Gluten':

         this.setState({glutenfree:e.target.checked})

        break;

        case 'DairyFree':

            this.setState({vegan:e.target.checked})

           break;

           case 'vegan':

              this.setState({dairyfree:e.target.checked})

             break;

             case 'NutFree':

                this.setState({nutfree:e.target.checked})

               break;

               

     }

   }

   _onFileChangeHandler(e){

    

if(e.target.files.length>0){

  const  file_data = e.target.files[0];




this.setState({fileCount:this.state.fileCount+1})

     if((this.state.fileCount+1)<=10){

    this.setState(prevState => ({

      file_Data: [...prevState.file_Data,file_data]

    })) 

  }

 

   }

  }

 

  

  

   _close(e,type){

    e.preventDefault()

    e.stopPropagation()

    

    if(type==='delete'){

    var Data =this.state.file_Data

      const filteredItems = Data.filter(item => item !== Data[e.target.id])

 

   this.setState({file_Data:filteredItems})

   this.setState({fileCount:filteredItems.length})

    }

    else if(type==='update'){

      var Data = this.state.updated_photoList

      console.log(Data[0])

      const filteredItems = Data.filter(item => item !== Data[e.target.id-1])

      console.log(filteredItems)

       this.setState({updated_photoList:filteredItems,poto_Count:filteredItems.length})

    }

   }

  render(){

   console.log(this.state.updated_photoList)

    var photos=[]

    var updated_Photos=[]

    var Photo= this.state.updated_photoList

    var i =0

       Photo.map((Photos) =>{ i+=1;  updated_Photos.push(

        <div  class="row">

        <div  class="col s4">

        <div   style={{width:'175px',height:'175px',backgroundColor:'#ffffff',padding:'0px',borderRadius:'8px',textAlign:'center'}}>

        <img   src={`data:image/jpeg;base64,${Photos.photo}` } style={{width:'175px',height:'175px'}} />

  

         </div> 

        </div>

  <div  class="col s1">

  

  <div   id={i} style={{textAlign:'center',color:'#cccccc',fontWeight:'bold',fontSize:'20px',cursor:'pointer'}} onClick={(e,i)=>{this._close(e,'update')}}>✕</div>

  

  

  </div>

    </div>

 

  

  

  

  

  

  

    

      )

    }

    )

    

 

    for(var i = 0;i<this.state.file_Data.length;i++){

      photos.push( <div  class="row">

      <div  class="col s4">

      <div   style={{width:'175px',height:'175px',backgroundColor:'#ffffff',padding:'0px',borderRadius:'8px',textAlign:'center'}}>

      <img  src={URL.createObjectURL(this.state.file_Data[i])} style={{width:'175px',height:'175px'}} />

 

       </div> 

      </div>

<div  class="col s1">

 

<div   id={i} style={{textAlign:'center',color:'#cccccc',fontWeight:'bold',fontSize:'20px',cursor:'pointer'}} onClick={(e,i)=>{this._close(e,'delete')}}>✕</div>

 

</div>








</div>

      )  

    }

       return(

       <Fragment>

         {(this.state.preloader)&&<Preloader/>}

         {(!this.state.preloader)&&

    <table width="100%" cellPadding="0" cellSpacing="0" style={{alignContent:"center"}}>

        <tbody>

          <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            <td style={{height:"10px"}}>

              <font style={{fontSize:"26px",fontFamily:'verdana'}}>Update Recipe</font>

              <br></br><br/>

              <font style={{fontSize:"14px",fontFamily:'Helvetica'}}>

              Share delicious recipes with food lovers to encourage creative dining. Please include <br/>sufficient details and directions so food lovers can accurately reproduce your masterpiece.</font>

                <br></br>  <br/>                    {(this.state.errmsgInd===true)&&[...this.state.errmsg].map((err)=>(

                

                <><br/><div  style={{fontSize:'20px',fontFamily:'Roboto,Arial',paddingBottom:'10px',color:'#ff2800'}}>{err}</div></>

                ))}

                              {(this.state.success_msg!=='')&&<><div style={{fontSize:'20px',fontFamily:'Roboto,Arial',paddingBottom:'10px',color:'rgb(27, 94, 32)'}}>{this.state.success_msg}</div><br></br></>} 

 

     <font style={{fontSize:"25px",color:"#555555",left:'-10px'}}>Recipe Details</font><br/><br/>

                </td>

          </tr>

 

             <tr style={{padding: "0px",margin:"0px",border:"none"}}>

 

      <div class="row">

        <div class="col s4">

       <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}} left="-10px">Recipe Name</span> </p> 

        </div>

        <div class="col s8">

         <input ref= {this.createrecipeRef} onFocus={this._onfocuschange} placeholder="  RECIPE NAME" id="email" type="text" class="validate" style={{borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}}/>

        </div>

 

      </div>




      <div class="row">

        <div class="col s4">

       <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}}>Primary Category </span> </p> 

        </div>

        <div class="col s8">

        <select ref={this.category} class="browser-default" style={{borderTop:"1px solid #808080",borderBottom:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}} >

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

 

      </div>

 

      <div class="row">

      <div class="col s4">  

      <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}}>Diet Restrictions</span> </p> 

 

       </div>

        <div class="col s3">

        <label>

        <input name='Gluten' ref={this.gluten} type="checkbox" class="filled-in" onChange={this.onChangeRestrictions}/>

        <span>Gluten-Free</span>

      </label>

 

</div>

 

<div class="col s3">

        <label>

        <input ref = {this.dairyFree}name = 'DairyFree'type="checkbox" class="filled-in" onChange={this.onChangeRestrictions} />

        <span>Dairy-free</span>

      </label>

 

</div>

<div class="col s2">

        <label>

        <input ref ={this.vegan} name ="vegan"type="checkbox" class="filled-in"onChange={this.onChangeRestrictions}  />

        <span>Vegan</span>

      </label>

 

</div>




<div class="col s3">

        <label>

        <input ref = {this.nutFree}name = "NutFree" type="checkbox" class="filled-in" onChange={this.onChangeRestrictions}  />

        <span >Nut-Free</span>

      </label>

 

</div>




      </div>

 

      <div class="row">

    <div class=" col s4">

       <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}} left="-10px">Duration</span> </p> 

        </div>

        <div class="col s2">

         <input ref={this.Durationhrs} onFocus={this._onfocuschange} placeholder="" id="email" type="text" class="validate" style={{borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}}/>

        </div>

 

        <div class=" col s2">

       <p><font style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto'}} left="-10px">Hours</font> </p> 

        </div>

 

        <div class="col s2">

         <input ref ={this.DurationMinutes} onFocus={this._onfocuschange} placeholder='' id="email" type="text" class="validate" style={{borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}}/>

        </div>

        <div class="col s2">

       <p><font style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto'}} left="-10px">Minutes</font> </p> 

        </div>

 

      </div>

 

      <div class="row">

        <div class="col s4">

       <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}} left="-10px"> Servings</span> </p> 

        </div>

        <div class="col s8">

        <input ref = {this.servings} onFocus={this._onfocuschange} type="text" placeholder='Quantity of items produced, e.x 5 Cupcakes.' class="validate" style={{borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}}/>

 

        </div>

 

      </div>

 

      <div class="row">

        <div class="col s4">

       <p><font style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}} left="-10px">Ingredients</font> </p> 

        </div>

        <div class="col s8">

          <div>List the quantity and ingredients needed, one item per line</div>

          <textarea  ref={this.Ingredients}  onFocus={this._onfocuschange} id="textarea1" class="materialize-textarea" placeholder="Example: 500 gm flour" style={{height:'200px',borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}}></textarea>

 

        </div>

 

      </div>

 

      <div class="row">

        <div class="col s4">

       <p><font style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}} left="-10px">Directions</font> </p> 

        </div>

        <div class="col s8">

          <div>List the steps to create the meal, one step per line</div>

          <textarea ref={this.Directions} onFocus={this._onfocuschange} id="textarea1" class="materialize-textarea" placeholder="Example: heat 3 tablespoons of oil" style={{height:'200px',borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}}></textarea>

 

        </div>

      </div>

      <br/><br/>

 

           <div>

             <font style={{fontSize:"23px",color:"#555555",left:'-10px',fontFamily:'verdana',right:'-8px',position:'relative'}}>Recipe Photos & Videos

              

             </font><br/><br/><font style={{fontSize:"16px",color:"#555555",left:'-10px',fontFamily:'verdana'}}>Include nice photos to showcase your recipe, and add an instructional video if available.

             </font>

           </div>

            <br/>

           <div class="row">

        <div class="col s4">

       <p><font style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}} left="-10px">Video (Optional)</font> </p> 

        </div>

        <div class="col s8">

        <div>Your YouTube, Facebook or Vimeo video link</div>

         <input  ref = {this.video} onFocus={this._onfocuschange} placeholder="" id="email" type="text" class="validate" style={{borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}}/>

        </div>

 

      </div>

      {(this.state.file_Data.length>10)&&

      <div class="row">

      <div class="col s8">

       <p><font style={{fontSize:"20px",color:'#ff2800',lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}} left="-10px">cant have more than  10 Photos</font> </p> 

        </div>

 

    </div>}

      <div class="row">

        <div class="col s4">

       <p><font style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}} left="-10px">Photo Gallery</font> </p> 

        </div>

        <div class="col s8">

     <p><font style={{fontSize:"20px",lineHeight:'16px',fontFamily:'Roboto'}} left="-10px">You have total of <b>{this.state.updated_photoList.length+this.state.file_Data.length}/10</b></font> </p> 

 

        </div>

</div>

{updated_Photos}

{photos}

<div class="row">

 

        <div class="col s4">

        <div class="file-field input-field" style={{width:'175px',height:'175px',backgroundColor:'#ffffff',padding:'0px',borderRadius:'8px',textAlign:'center',border:'5px dashed #addbff'}}>

        <center>

       <img src='/images/camera.png' style={{marginTop:'40px',width:'100px',height:'80px'}}></img>

      </center>

 

        <input type="file"  accept=".mp4,.flv,.doc,.docx,.txt,.csv,.xls,.xlsx,.png,.jpg,.avi,.pdf" onChange={this._onFileChangeHandler}/>

      

    </div>

 

</div>

 

      </div>







            </tr>  

           

            <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            <td>

            <button type='submit'  name='submit_rating' class='col s6 btn btn-small waves-effect #c62828 red darken-1' style={{position:"relative",width:"200px",borderRadius:"5px"}} onClick={this._UpdateRecipe}>Update Recipe</button>

          </td>

 

          </tr>

 

        </tbody>

 

      </table>

  }

 

      </Fragment>

 

    )

     }

 

}

 

export default UpdateRecipe

