import React,{Fragment,Component} from 'react'

import Header from '../header'

import {Link} from 'react-router-dom'

 

import Footer from '../Footer'

import Pagination from '../Pagination/Pagination'

import RecipeList from '../Recipe/Recipe_List'

import preloader from '../Dashbord_components/Preloader'

import Register_Service from '../api/RegisterService'

import moment from 'moment'

import UploadComponent from '../Dashbord_components/uploadComponent'

import Recipe_Service from '../api/recipeService'

import Logo from '../../images/Myrecipe.png'

 

  
 

class MyRecipeProfile extends Component{

 

    constructor(props) {

        super(props);

        this.state={

            currentPage:1,

            recipes:[],

            totalCount:0,

            numberPages:0,

            recipesperPage:[],

            cus_Details:{},

            msg_suceess:'',

            errmsgInd:false,

            update_Profile:false,

            imageDestination:'',

            imageSource:'',

            errmsg:'',

            loading:false,

            recipeLoader:false,
            


        }

        this.handleClick = this.handleClick.bind(this);

        this._uploadPhoto= this._uploadPhoto.bind(this);

        this.imageElemnt = React.createRef()

        this._onclose= this._onclose.bind(this)

        this._onCloseCover= this._onCloseCover.bind(this)

      }

     async _uploadPhoto(imageVal,type){

       if(imageVal!==null&&imageVal!==''){

       this.setState({loading:true,errmsg:'',msg_suceess:''})

      const formData = new FormData();

      formData.append('file',imageVal)

      try{

      var response = (type==='Profile')?await Register_Service.updateProfilePhoto(this.state.cus_Details.cusid,formData):await Register_Service.updateCoverPhoto(this.state.cus_Details.cusid,formData)

 

      if(response.status==201){

          this.setState({cus_Details:response.data,loading:false,msg_suceess:'Successfully uploaded the photo'})

      }

      else{

 

        this.setState({errmsg:'Unable to update Photo for now,Please try again later',loading:false})

      }

    }

    catch(error){

 

      this.setState({errmsg:'Profile pic cant be updated, check the size of the file uploaded',loading:false})

 

    }

  }

  else{

    this.setState({errmsg:'u need to Browse and select a file',loading:false})

 

  }

      }

    

      _onclose(value){

       this.setState({update_Profile:value})

      }

      _onCloseCover(value){

        this.setState({update_cover:value})

 

      }

 

      handleClick(e) {

        this.setState({ 

          currentPage: 2

        });

 

         this.renderRecipes(Number(e.target.id))

      }

 

nextPage=(pageNum)=>{

    let recipes_full = this.state.recipes;

    var total_recipes = recipes_full.length

    var startpoint = Math.floor(total_recipes/3);

    var reminder=total_recipes%3;

   var begin = total_recipes-(3*(startpoint-(pageNum-1))+reminder);

   var end_point = ((begin+2)>=total_recipes)?begin+reminder-1:begin+2;

    var recipes_perPage=recipes_full.slice(begin,end_point+1)

    this.setState({recipesperPage:[...recipes_perPage],currentPage:pageNum})

 

}

async componentDidMount(){

     try{

     var response = await Register_Service.getUserdetailByCusID(this.props.location.state.cusID)

     if(response.status===200){

       this.setState({cus_Details:response.data})

     }

     else{

     this.setState({errmsgInd:true,errmsg:'unable to get the Customer details due to techincal difficulty'})

     }

    }

    catch(error){

      this.setState({errmsgInd:true,errmsg:'unable to get recipe details due to technical difficulty'}) 

    }

       try{
       this.setState({recipeLoader:true})
    var response = await Recipe_Service.getRecipeDetails(this.props.location.state.cusID)

     if(response.status===200){

    var recipes_list = response.data;

    this.setState({totalCount:recipes_list.length})

    var pages= recipes_list.length/3;

    this.setState({recipes:[...recipes_list]})

 

        if(recipes_list.length<=3){ this.setState({recipesperPage:[...recipes_list],numberPages:1})

}

else{

    var pag_total = ((pages-Math.floor(pages))===0)?Math.floor(pages):Math.floor(pages)+1   

    this.setState({recipesperPage:[...recipes_list.slice(0,3)],numberPages:pag_total});

   

}
this.setState({recipeLoader:false})

     }

     else{

      this.setState({errmsgInd:true,errmsg:'unable to get recipe details due to technical difficulty'}) 

 

     }

       }

       catch(error){

        this.setState({errmsgInd:true}) 

 

       }

}

    render(){

 
      console.log('user'+this.props.user)

        

return(
    <Fragment>

                <center>

                <nav class="navbar navbar-main margin-bottom-6 navbar-expand-lg navbar-light bg-white">

 

<div class="nav-wrapper white darken-4">

<img img src={Logo} alt="HeaderLin"style={{position: "absolute",left:"95vh",height:"8vh",bottom:"0px",width:"50vh"}} class="brand-logo"></img>

    

</div>

</nav>

 

<div class='row grey lighten-5' style={{width:'100%',height:'auto',background:'linear-gradient(to bottom,rgba(252,252,252,1) 0%,rgba(252,252,252,1) 75%,rgba(224,224,224,1) 100%,rgba(224,224,224,1) 100%'}}>

    <div style={{position:"relative"}}>

           <center>

              <div style={{position:"absolute",width:"100%",bottom:"0px",zIndex:30}  }>

                  <table style={{width:"100%",height:"175"}} cellPadding="0" cellSpacing="0" align="center" height="180px">

                      <tbody>

                          <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                           <td rowSpan="3" valign="bottom">

                           <div style={{width:"200px",height:"180px",overflow:"hidden",zIndex:"30",position:"relative",left:"25%",top:"0px",backgroundColor:"#ffffff",borderLeft:"3px solid #ffffff",borderRight:"3px solid #ffffff",borderTop:"3px solid #ffffff",borderBottom:"3px solid #ffffff",boxShadow:"1px 5px 5px #aaaaaa"}}>                                  

<img src ={(this.state.cus_Details.profile_photo!==null)?`data:image/jpeg;base64,${this.state.cus_Details.profile_photo}`:(this.state.cus_Details.gender!==null&&this.state.cus_Details.gender!=='')?(this.state.cus_Details.gender.toString().toUpperCase()==='M')?'/images/profilePic_male.jpg':'/images/profile_female.jpg':'/images/profilePic_male.jpg'} style={{position:"absolute",opacity:"1",left:"0px",right:"0px",border:"0",width:"200px",height:"180px"}}></img>

</div>



</td>

<td>

<table style={{border:'0',width:'320px',algn:'right',marginBottom:'10px'}}>

  <tbody>

  <tr style={{padding: "0px",margin:"0px",border:"none"}}>

     <td style={{width:'140px'}} valign='middle' align='left'>

      <div style={{width:"140px",height:'35px',lineHeight:'21px',overflow:'hidden',left:'600px',top:'50px',zIndex:'30',position:'relative',padding:'5px',fontSize:'14px',color:'#444444',fontWeight:'bold',backgroundColor:'rgba(255,255,255,0.8)',borderRadius:'5px',cursor:'pointer'}} onClick={()=>{this.setState({update_Profile:true,errmsg:'',msg_suceess:''})}}>Edit Profile Photo</div>

     </td>

     <td style={{width:'140px'}} valign='middle' align='left'>

      <div style={{width:"140px",height:'35px',lineHeight:'21px',overflow:'hidden',left:'630px',top:'50px',zIndex:'30',position:'relative',padding:'5px',fontSize:'14px',color:'#444444',fontWeight:'bold',backgroundColor:'rgba(255,255,255,0.8)',borderRadius:'5px',cursor:'pointer'}} onClick={()=>{this.setState({update_cover:true,errmsg:'',msg_suceess:''})}}>Edit Cover Photo</div>

     </td>



   </tr>   

  </tbody>

</table>

</td>

</tr>

<tr height="40" style={{padding: "0px",margin:"0px",border:"none"}} valign="middle">

<td>

 <table width="80%" align="right" cellSpacing="0" cellPadding="0" style={{textShadow:"2px 2px 3px #ffffff",fontSize:"26px", fontWeight:"normal"}}>

    <tbody>

        <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            <td valign="middle" align="left">

                <div style={{marginTop:"80px"}}>

<b style={{right:"-20px"}}>{this.state.cus_Details.firstName+' '+((this.state.cus_Details.lastName!==null&&this.state.cus_Details.lastName!=='')?this.state.cus_Details.lastName:'')}</b>

                  <font style={{fontWeight:"normal", color:"#333333", fontSize:"22px"}}> &nbsp; • &nbsp; {0} Followers</font>

                </div>



            </td>

            <td valign="middle"  style={{padding: "0px",margin:"0px",border:"none",top:"40px"}}>

            <Link to={{pathname:'/Landing_Page',  search: '?Profile='+this.state.cus_Details.firstName,state:{name:this.state.cus_Details.firstName,isloggedin:true,cusID:this.state.cus_Details.cusid}}}> 

            <button type='submit'  name='submit_rating' class='col s6 btn btn-small waves-effect #c62828 red darken-1' style={{position:"relative",right:"300px",height:'40px',width:"200px",borderRadius:"5px",right:"45%",bottom:'-35px'}}>Share recipe</button></Link>



          </td>

        </tr>

    </tbody>

 </table>

</td>



</tr>

</tbody>



</table>

</div>

</center>



<div style={{width:"100%",maxHeight:"375px",overflow:"hidden",position:"relative",zIndex:"12"}}>

<img class="activator" src={(this.state.cus_Details.cover_photo!==null)?`data:image/jpeg;base64,${this.state.cus_Details.cover_photo}`:'/images/default_member_cover-1.jpg'} width="100%" minheight="300px" style={{top:"80px"}}/>

<div style={{width:"100%",height:"50px",bottom:"0px",overflow:"hidden",zIndex:"10",position:"absolute",left:"0px",fontSize:"26px",textShadow:"2px 2px 3px #ffffff",fontWeight:"bold",verticalAlign:"middle",textAlign:"right",background:"-webkit-linear-gradient(top, rgba(252, 252, 252, 0.3) 0%, rgba(252, 252, 252, 0.5) 30%, rgba(252, 252, 252, 0.8) 70%,rgba(252, 252, 252, 1) 100%)"}}></div>



</div>



<table style={{boder:"0",width:"100%",align:"center",paddingBottom:"0px 0px"}}  cellPadding="0" cellSpacing="0" height="40"><tbody><tr style={{padding: "0px",margin:"0px",border:"none"}}><td></td></tr></tbody>



</table>







</div>

<br/>

<div style={{width:'100%',minHeight:'350px',textAlign:'left',paddingTop:'20px',paddingBottom:'10px'}}>

<table style={{border:'0',width:'100%',backgroundColor:'#ffffff',borderTop:"1px solid #e0e0e0e",borderBottom:'1px solid #e0e0e0',marginBottom:'0px',paddingBottom:'30px'}} cellPadding='0' cellSpacing='0'> 

<tbody>

<tr style={{padding: "0px",margin:"0px",border:"none"}}>

<td colSpan='3' style={{fontSize:'26px',fontWeight:'bold',fontStyle:'verdana',color:'#444444',textAlign:'center',height:'50px',backgroundColor:'#f0f0f0'}} valign='middle'>{this.state.cus_Details.firstName}'s List of Recipes</td>

</tr>

<tr style={{padding: "0px",margin:"0px",border:"none"}}>

<td colSpan='3'></td>



</tr>

<tr style={{padding: "0px",margin:"0px",border:"none"}}>



<center> {this.state.totalCount>3?<Pagination pages={this.state.numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/>:''}</center>



{this.state.recipes.length===0&&!this.state.recipeLoader&&<div class="row" style={{height:'50vh'}} >       <div style={{height:'10vh'}}></div> <div style={{color:'#696969',fontSize:'28px',textAlign:'center',marginBottom:'30vh'}}>No Recipies Have Been shared by this User.</div></div>}
{this.state.recipeLoader&&<div class="row" style={{height:'50vh'}} >
  

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

  </div>}
{this.state.recipes.length>0 &&<div class="row" style={{marginLeft:"5%"}} >



<RecipeList recipes={this.state.recipesperPage}  cus_Details={this.state.cus_Details} user={this.props.user}/>



</div>}

<center> {this.state.totalCount>3?<Pagination pages={this.state.numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/>:''}</center>






</tr>



</tbody>

</table>



<div style={{width:'100%'}}>

<table style={{border:0,width:'100%',color:'#333333',fontSize:'14px',textAlign:'left',padding:'30px 0px 30px 0px'}} cellSpacing='0' cellPadding='0' align='center'>

<tbody style={{marginLeft:'30px'}}> 

<tr style={{padding: "0px",margin:"0px",border:"none"}}>

<td style={{width:'50%'}} valign='top'>

<div style={{fontSize:'30px',marginTop:'3px',marginLeft:'200px',marginBottom:'10px',fontWeight:'Bold'}}>Personal Profile</div>

<center>



<table style={{border:0,width:'100%',fontSize:'16px',marginLeft:'200px'}} align='center'  cellPadding='3' cellSpacing='0'>

<tbody>

 <tr style={{padding: "0px",margin:"0px",border:"none"}}>

    <td style={{width:'120px',alignContent:'right',fontSize:'24px',fontWeight:'inherit',fontFamily:'Arial, Helvetica, sans-serif'}}>Name</td> 

    <td style={{fontSize:'24px',fontSize:'24px',fontWeight:'inherit',fontFamily:'Arial, Helvetica, sans-serif'}}>{this.state.cus_Details.firstName+' '+((this.state.cus_Details.lastName!==null&&this.state.cus_Details.lastName!=='')?this.state.cus_Details.lastName:'')}</td>

 </tr>

 <tr style={{padding: "0px",margin:"0px",border:"none"}}>

    <td style={{width:'120px',fontSize:'24px',fontSize:'24px',fontWeight:'inherit',fontFamily:'Arial, Helvetica, sans-serif'}}>Gender</td> 

    <td style={{fontSize:'24px',fontSize:'24px',fontWeight:'inherit',fontFamily:'Arial, Helvetica, sans-serif'}}>{(this.state.cus_Details.gender!==null&&this.state.cus_Details.gender!=='')?(this.state.cus_Details.gender==='M')?'MALE':'FEMALE':'NA'}</td>

 </tr>

 <tr style={{padding: "0px",margin:"0px",border:"none",}}>

    <td style={{width:'160px',fontSize:'24px',fontSize:'24px',fontWeight:'inherit',fontFamily:'Arial, Helvetica, sans-serif'}}>Member Since</td> 

    <td style={{fontSize:'24px',fontSize:'24px',fontWeight:'inherit',fontFamily:'Arial, Helvetica, sans-serif'}}>{moment(this.state.cus_Details.created_dt).format('YYYY')}</td>

 </tr>



</tbody>

</table>

</center>

</td>

<td style={{width:'50%'}} valign='middle' align='center'>

<div style={{fontSize:'30px',marginTop:'-100px',fontFamily:'Roboto,Arial,Hevetica,sans-serif'}}>About {this.state.cus_Details.firstName}</div>

<div style={{display:'block'}}><br/>



{(this.state.cus_Details.ebtYourself!==null&&this.state.cus_Details.ebtYourself!=='')&&



<span style={{color:'rgb(136,136,136)',fontSize:'22px',fontFamily:'Arial, Helvetica, sans-serif',fontWeight:'lighter'}}>{this.state.cus_Details.ebtYourself}



</span>



}

{(this.state.cus_Details.ebtYourself===null||this.state.cus_Details.ebtYourself==='')&&

<><span style={{color:'rgb(136,136,136)',fontSize:'22px',fontFamily:'Arial, Helvetica, sans-serif',fontWeight:'lighter'}}>We're as excited as you are to find out more about shamanth, but this info has not been completed yet.



</span>

<br/><br/>

<span style={{color:'rgb(136,136,136)',fontSize:'22px',fontFamily:'Arial, Helvetica, sans-serif',fontWeight:'lighter'}}>Please check back again later</span></>

}

</div>   





</td> 

</tr>

</tbody>



</table>

</div>



{/*   <div style={{position:'absolute',maxHeight:'100%',maxWidth:'100%',display:'block',top:'0',left:'0',right:'0',bottom:'0',textAlign:'center',zIndex:'1000',background:'rgba(0,0,0,0.5)',color:'#666666'}}>

<div style={{height:'20px'}}></div>

<center>  <div style={{background:'#ffffff',width:'800px',height:'750px',borderRadius:'10px',boxShadow:'0px 0px 20px #333333',opacity:'1.0',position:'relative'}}>



</div>

</center>

</div> */}




</div>






{this.state.update_Profile&&             <div style={{background:'rgba(0,0,0,0.5)',color:'#666666',width:'auto',height:'auto',display:'block',position:'fixed',bottom:0,top:0,right:0,left:0,zIndex:'8100'}}>

        <UploadComponent _onclose={this._onclose} _uploadPhoto={this._uploadPhoto} loading={this.state.loading} errmsg={this.state.errmsg} successmsg={this.state.msg_suceess} type='Profile' ></UploadComponent>

</div>

}



{this.state.update_cover&&             <div style={{background:'rgba(0,0,0,0.5)',color:'#666666',width:'auto',height:'auto',display:'block',position:'fixed',bottom:0,top:0,right:0,left:0,zIndex:'8100'}}>

        <UploadComponent _onclose={this._onCloseCover} _uploadPhoto={this._uploadPhoto} loading={this.state.loading} errmsg={this.state.errmsg} successmsg={this.state.msg_suceess} type='Cover'></UploadComponent>

</div>

}



</div>



</center>

<Footer/>

</Fragment>

)

}

}



export default MyRecipeProfile

