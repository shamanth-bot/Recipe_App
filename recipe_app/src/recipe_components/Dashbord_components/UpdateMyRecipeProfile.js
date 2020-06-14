import React,{Fragment,useState,useEffect, Component} from 'react'

import M from "materialize-css"

import RgisterService from '../api/RegisterService'

import moment from 'moment'

import Preloader from '../Dashbord_components/Preloader'

 

import Footer from '../Footer'

import HeaderNav from '../Dashbord_components/HeaderNav'

import MenuComponent from '../Dashbord_components/MenuComponent'

 

class  UpdateMyRecipeProfile extends Component{

 

  constructor(props) {

    super(props);

    this.ref = React.createRef();

    this.firstname = React.createRef();

    this.lastName= React.createRef();

    this.userName = React.createRef();

    this.Occupation = React.createRef();

    this.website = React.createRef();

    this.AboutYourself= React.createRef();

 

    this.state = {

      UserName:'',

      firstName:'',

      lastName:'',

      Gender_M:false,

      Gender_F:false,

      Dob:null,

      Occupation:'',

      WebsiteL:'',

      AboutYourself:'',

 

      errmsg:'',gender:'',preloader:false,errmsgind:false,msgSuccess:''

    };

    this._submitChanges=this._submitChanges.bind(this)

    this._onInputchange= this._onInputchange.bind(this)

    this._onfocuschange= this._onfocuschange.bind(this)

  }




  async componentDidMount(){

 

    let dropdowns = document.querySelectorAll('.datepicker');

    

    let options = {

      autoClose: false,

      selectYears: 14,

      format: 'mm/dd/yyyy',

    /*  onSelect: function(date) {

        this.setState({Dob:date})

      }*/

   

  };

  

 

    M.Datepicker.init(dropdowns,options);

    M.updateTextFields();

    try{

      var response = await RgisterService.getUserdetailByCusID(this.props.location.state.customer_Details.cusid)

    

      if(response.status===200){

        this.firstname.current.value=response.data.firstName!==null?response.data.firstName:''

        this.lastName.current.value= response.data.lastName!==null?response.data.lastName:''

        this.userName.current.value= (response.data.userName!==null?response.data.userName:'')

        this.Occupation.current.value= (response.data.occupation!==null?response.data.occupation:'')

        this.website.current.value=  (response.data.webSite!==null?response.data.webSite:'')  

        this.AboutYourself.current.value=  (response.data.ebtYourself!==null?response.data.ebtYourself:'')  

         this.setState({

          Gender_M:(response.data.gender!=null?(response.data.gender==='M')?true:false:false),

          Gender_F:(response.data.gender!=null?(response.data.gender==='F')?true:false:false),

 

          Dob:(response.data.dob!==null?moment(response.data.dob).format('MM/DD/YYYY'):''),

         })

      }

      else{

        this.setState({ermsg:'The user information is no longer available with us'})

      }

    }

    catch(error){

      this.setState({errmsg:'No customer info available for this User'})

    }

 

    

  }

 

 async  _submitChanges(){

   console.log(this.Occupation.current.value)

  var date = moment(this.ref.current.value).format('YYYY-MM-DD')

      this.setState({Dob:this.ref.current.value})

     this._valiadeInputChage()

    if(this.state.errmsgind===false){

      this.setState({preloader:true})

      try{

 

      var response = await RgisterService.updateProfieDetails(this.lastName.current.value,this.firstname.current.value,this.userName.current.value,this.state.gender,date,this.website.current.value,this.AboutYourself.current.value,this.Occupation.current.value,this.props.location.state.customer_Details.cusid)

      if(response.status===201){

        this.setState({msgSuccess:'successfully updated the profile changes for user '+response.data.userName})

      }

      else{

        this.setState({errmsg:'Uable to update teh profile please check later',errmsgind:true})

 

      }

    }

    catch(error){

      this.setState({errmsg:'Uable to update teh profile'+ '<br/>'+'please check later',errmsgind:true})

 

    }

    this.setState({preloader:false})

 

  }

 

  }

 

  _valiadeInputChage(){

    var charset= new RegExp('^[A-Za-z]$')

    var charset_num= new RegExp('^[A-Za-z0-9]$')

    if((this.state.UserName!=='')&&(charset_num.test(this.state.UserName)===false)){

      this.setState({errmsg:'Username can only have characters and numbers'})

        

    }

 

    if((this.state.firstName!=='')&&charset.test(this.state.firstName===false)){

      this.setState({errmsg:'FirstName can only have characters'})

    }

    

    if(this.state.lastName!==''&&this.state.lastName!==null&&charset.test(this.state.lastName===false)){

      this.setState({errmsg:'lastName can only have characters',errmsgind:true})

    }

 

    if(this.state.Occupation!==''&&this.state.Occupation!==null&&charset.test(this.state.Occupation===false)){

      this.setState({errmsg:'Occupation can only have characters',errmsgind:true})

    }

 

  }

 

  _onfocuschange(e){

 

    this.setState({errmsg:'',errmsgind:false})

    this.setState({msgSuccess:''})

  

  }

  

  _onInputchange(e){

 

      switch(e.target.name){

      case 'firstName':

          this.setState({firstName:e.target.value.trim()})

  break;

  case  'lastName':

          this.setState({lastName:e.target.value.trim()})

          break;

   case 'group1':

         this.setState({gender:'M',Gender_M:true,Gender_F:false})

         break;       

   case 'group2':

            this.setState({gender:'F',Gender_F:true,Gender_M:false})

            break;   

   case 'dob':

            this.setState({Dob:e.target.value.trim()})

            break;       

        

    case 'occupation':

            this.setState({Occupation:e.target.value.trim()})

            break;    

            

            

    case 'website':

            this.setState({WebsiteL:e.target.value.trim()})

            break;  

            

            case 'aboutYourself':

                this.setState({AboutYourself:e.target.value.trim()})

                break;       

      

                case 'userName':

                    this.setState({UserName:e.target.value.trim()})

                    break;       

                  

         

    }

  

  }

  

  

  render(){

    

     return(

      <>


<HeaderNav name={this.props.location.state.customer_Details.firstName}/>

 

<div class="row" style={{width:'100%',height:'auto',background:'linear-gradient(to bottom,rgba(252,252,252,1) 0%,rgba(252,252,252,1) 75%,rgba(224,224,224,1) 100%,rgba(224,224,224,1) 100%'}}>

 

<div class="col s3 offset-s1">

 

    <MenuComponent customer_Details={this.props.location.state.customer_Details}></MenuComponent>

    </div>

 

    <div class="col s4-s9">

 

         {(this.state.preloader===true)&&

     

     <Preloader/>

     }

         {(this.state.preloader===false)&&

 

    <table width="100%" cellPadding="0" cellSpacing="0" style={{alignContent:"center"}}>

        <tbody>

          <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            <td style={{height:"10px"}}>

              <font style={{fontSize:"28px",fontFamily:'verdana',left:"10px"}}>Update My Profile</font>

            </td>

            

             </tr>

          <tr style={{padding: "0px",margin:"0px",border:"none"}}>

          <td style={{height:"10px"}} align='justify'>

              <span style={{fontSize:"16px",lineHeight:'20px',fontFamily:'verdana'}}>You can update your profile and login details here.Please fill in as much information as possible to ensure <br/> an accurate profile.</span>

               <br/>  <br/>  <span style={{fontSize:"16px",lineHeight:'20px',fontFamily:'verdana'}}>To update your cover photo or headshot, please proceed to your Public Profile and click on the <br/>"Edit Cover Photo" or "Edit Headshot" button at lower right corner of cover photo.</span>

               <br/><br/><br/><span style={{fontSize:"24px",lineHeight:'22px',fontFamily:'verdana',color:'#555555'}}>General Profile</span>

              {(this.state.errmsgind===true)&&<><br/><div style={{fontSize:'20px',fontFamily:'Roboto,Arial',paddingBottom:'10px',color:'#ff2800'}}>{this.state.errmsg}</div><br></br></>} 

              {(this.state.msgSuccess!=='')&&<><br/><div style={{fontSize:'20px',fontFamily:'Roboto,Arial',paddingBottom:'10px',color:'rgb(27, 94, 32)'}}>{this.state.msgSuccess}</div><br></br></>} 

 

            </td>

            </tr>

             <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            

 

      <div class="row">

        <div class="col s4">

       <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}}>UserName</span> </p> 

        </div>

        <div class="col s8">

         <input  ref = {this.userName} name = 'userName'    id="email"  placeholder ={this.state.UserName}   type="text"  style={{borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#eeeeee'}}  onChange={this._onInputchange} onFocus={this._onfocuschange} onKeyPress={this._onInputchange}/>

        </div>

 

      </div>

 

      <div class="row">

        <div class="col s4">

       <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}}>FirstName</span> </p> 

        </div>

        <div class="col s8">

         <input     ref = {this.firstname}   id="email" name="firstName" type="text" autocomplete="off"  style={{borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}}onChange={this._onInputchange} onFocus={this._onfocuschange}/>

        </div>

 

      </div>

 

      <div class="row">

        <div class="col s4">

       <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}}>LastName</span> </p> 

        </div>

        <div class="col s8">

         <input ref = {this.lastName} placeholder="" id="email" name = "lastName"type="text" class="validate"  style={{borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}} onChange={this._onInputchange} onFocus={this._onfocuschange}/>

        </div>

 

      </div>

 

      <div class="row">

        <div class="input-field col s4">

        <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}}>Gender</span> </p> 

        </div>

 

        <div class="input-field col s2">

        <label>

        <input class="with-gap" name="group1" type="radio" data-state="false" checked={this.state.Gender_M} onChange={this._onInputchange}/>

        <span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto'}}>Male</span>

      </label>

 

        </div>

        <div class="input-field col s2">

        <label>

        <input class="with-gap" name="group2" type="radio" data-state="false" checked={this.state.Gender_F} onChange={this._onInputchange}/>

        <span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto'}}>Female</span>

      </label>

 

        </div>

 

      </div>

 

      <div class="row">

        <div class="col s4">

       <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}}>Date of birth</span></p> 

        </div>

        <div class="col s8">

        

          <input type="text" name = 'dob' ref={this.ref} value ={this.state.Dob}  class="datepicker" placeholder ='mm/dd/yyyy' style={{borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}} onChange={this._onInputchange} onFocus={this._onfocuschange}/>

 

        </div>

 

      </div>






      <div class="row">

        <div class="col s4">

       <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}}>Occupation</span><br/>  

       <span style={{fontStyle:'italic',display:'inline',color:'#999999'}}>(optional)</span></p>

        </div>

        <div class="col s8">

         <input ref = {this.Occupation}  placeholder="" name ='occupation' id="email" type="text" class="validate" style={{borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}} onChange={this._onInputchange} onFocus={this._onfocuschange}/>

        </div>

 

      </div>

 

      <div class="row">

        <div class="col s4">

       <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}}>Website</span><br/>  

       <span style={{fontStyle:'italic',display:'inline',color:'#999999'}}>(optional)</span></p>

        </div>

        <div class="col s8">

         <input ref ={this.website} placeholder="" name = 'website' id="email" type="text" class="validate" style={{borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}} onChange={this._onInputchange} onFocus={this._onfocuschange}/>

        </div>

 

      </div>

 

      <div class="row">

        <div class="input-field col s4">

       <p><span style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',right:'-6px',position:'relative'}} left="-10px">About Yourself</span> </p> 

        </div>

        <div class="input-field col s8">

          <div>Describe yourself and your love for food in a few simple paragraphs</div>

          <textarea  id="textarea1"  name ='aboutYourself' ref = {this.AboutYourself} class="materialize-textarea" placeholder="" style={{height:'200px',borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}} onChange={this._onInputchange} onFocus={this._onfocuschange}></textarea>

 

        </div>

      </div>








            </tr>  

           

            <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            <td>

            <button type='submit' onClick={this._submitChanges} name='submit_rating' class='col s6 btn btn-small waves-effect #c62828 red darken-1' style={{position:"relative",width:"250px",height:'50px',borderRadius:"5px"}}>Update Profile</button>

          </td>

 

          </tr>

 

        </tbody>

 

      </table>

 

  }

  </div>

</div>

  <Footer/>

      </>

 

    )

              }

 

}

 

export default UpdateMyRecipeProfile