import React,{Fragment, Component} from 'react'

import {Link} from 'react-router-dom'

import {Helmet} from "react-helmet";

import LoginService from '../api/LoginService'

import ErrorMessage from '../Dashbord_components/ErrorMessage'

import Preloader from '../Dashbord_components/Preloader'

 

import Footer from '../Footer'

import HeaderNav from '../Dashbord_components/HeaderNav'

import MenuComponent from '../Dashbord_components/MenuComponent'

class AccountSettings extends Component{

   

  constructor(props){

    super(props);

    this.state={

 

      emailVal:'',

      errorval:false,

      password:'',

      retyped_password:'',

      errmsgind:false,

      errmsg:'',

      countryCode:'',

      PhoneNumber:'',

      Successmsg:'',

      preloader:false

 

            }

            this._onInputchange=this._onInputchange.bind(this)

            this._onfocuschange= this._onfocuschange.bind(this)

            this._SubmitRequest= this._SubmitRequest.bind(this)

    

 

}

async _SubmitRequest(){

  var regex_pass=new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#_])(?=.{8,})')

  var phone_number= new RegExp('^[0-9]{10}')

  var country_code= new RegExp('^[0-9]{1,3}')

 

  var submit =false;

  if(this.state.password!==''||this.state.retyped_password!==''||this.state.countryCode!==''||this.state.PhoneNumber!==''){

    submit = true

    if(this.state.password!==''||this.state.retyped_password!==''){

     if(this.state.password!==this.state.retyped_password){

       submit=false;

      this.setState({errmsg:' The entered passwords do not match or you cant have one pass field empty, Please re-enter.',errmsgind:true})

  

  }

  else if(regex_pass.test(this.state.password===false)){

     submit=false

  this.setState({errmsg:'The password must contain atleast 6 characters and should have atleast one number, 1 capital letter and one of _ @ and # must be used.',errmsgind:true})

  

  }

  }

 

  if (this.state.countryCode!==''||this.state.PhoneNumber!==''){

    if(this.state.countryCode!==''&&country_code.test(this.state.countryCode)===false){

      submit=false

     this.setState({errmsg:'CountryCode has to be a number.',errmsgind:true})

     }

     if(this.state.PhoneNumber!=''&&phone_number.test(this.state.PhoneNumber)===false){

       submit = false

       this.setState({errmsg:' Phone number should have digits. and length of 10',errmsgind:true})

     

     }

   

  }

 

  if(submit===true){

 

    try{

      this.setState({preloader:true})

      let response = await LoginService.UpdateUserDetails(this.props.location.state.customer_Details.cusid,this.state.password,this.state.countryCode,this.state.PhoneNumber)

          if(response.status===201){

            this.setState({errmsg:'Successful posting done',errmsgind:true,preloader:false})

  

          }

          else{

            this.setState({errmsg:'unable to post the settings changes',errmsgind:true,preloader:false})

   

          }

    }

    catch(error){

      this.setState({errmsg:'some technical difficicuties while trying to post',errmsgind:true})

  

    }  

   }

   

}

else{

  this.setState({errmsg:'Havent changed anything,so have nothing to update',errmsgind:true})

 

}

 

}

 

_onInputchange(e){

  switch(e.target.name){

    case 'password':

        this.setState({password:e.target.value.trim()})

break;

case  'retype-password':

        this.setState({retyped_password:e.target.value.trim()})

        break;

 case 'countrycode':

       this.setState({countryCode:e.target.value.trim()})

       break;       

  case 'contactNumber':

         this.setState({PhoneNumber:e.target.value.trim()})

         break;

 

  }

 

}

 

_onfocuschange(e){

  this.setState({errmsgind:false})

 

}

 

  render(){

    console.log("cus detaild"+this.props.location.state.customer_Details)

     return(

       <Fragment>

 

        <Helmet>

        <meta charSet="utf-8" />

        <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js" rel="stylesheet"/>

    

        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

    </Helmet>

    <HeaderNav name={this.props.location.state.customer_Details.firstName}/>

 

    <div class="row" style={{width:'100%',height:'auto',background:'linear-gradient(to bottom,rgba(252,252,252,1) 0%,rgba(252,252,252,1) 75%,rgba(224,224,224,1) 100%,rgba(224,224,224,1) 100%'}}>

 

<div class="col s3 offset-s1">

 

    <MenuComponent customer_Details={this.props.location.state.customer_Details}></MenuComponent>

    </div>

    <div class="col s4-s9">

        {this.state.preloader&&<Preloader/>}

       {!this.state.preloader&&<table width="100%" cellPadding="0" cellSpacing="0" style={{alignContent:"center"}}>

        <tbody>

          <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            <td style={{height:"10px"}}>

              <font style={{fontSize:"26px",fontFamily:'verdana'}}>Account Settings</font>

              <br></br><br/>

              <font style={{fontSize:"14px",fontFamily:'Helvetica'}}>

                You can change your login details,If you change your email address you need to register with a new id and <br/> new verification email will be sent to your new email</font>

                <br></br>  <br/>   

                {(this.state.errmsgind===true)&&<><div style={{fontSize:'20px',fontFamily:'Roboto,Arial',paddingBottom:'10px',color:'#ff2800'}}>{this.state.errmsg}</div><br></br></>} 

       <font style={{fontSize:"23px",color:"#555555"}}>Login Details</font>

 

            </td>

          </tr>

 

             <tr style={{padding: "0px",margin:"0px",border:"none"}}>

 

      <div class="row">

        <div class="input-field col s10">

        <i class="material-icons prefix">email</i> <input placeholder="" id="email" type="text" value={this.props.location.state.customer_Details.email} class="validate" style={{}} readonly='readonly'/>

 

        </div>

      </div>

      <div class="row">

        <div class="input-field col s10">

        <i class="material-icons prefix">edit</i>   <input name = 'password' placeholder="NEW PASSWORD" type="password" class="validate" onChange={this._onInputchange} onFocus={this._onfocuschange}/>

        </div>

      </div>

      <div class="row">

        <div class="input-field col s10">

        <i class="material-icons prefix">edit</i>  <input name ='retype-password'placeholder="RE-TYPE PASSWORD" id="password" type="password" class="validate" onChange={this._onInputchange} onFocus={this._onfocuschange}/>

        </div>

      </div>

 

      <div class="row">

        <div class="input-field col s5">

        <i class="material-icons prefix">phone</i>

        

        

          <input placeholder="Country code" name = 'countrycode'id="password" type="text" class="validate"onChange={this._onInputchange} onFocus={this._onfocuschange}/>

        </div>

        <div class="input-field col s6">

 

        <input id="icon_telephone"  placeholder="Contact Number " name = 'contactNumber' type="tel" class="validate" onChange={this._onInputchange} onFocus={this._onfocuschange}/>

 

          </div>

 

      </div>

 

            </tr>  

           

            <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            <td>

            <button type='submit'  name='submit_rating' class='col s6 btn btn-small waves-effect #c62828 red darken-1' style={{position:"relative",left:"30px",width:"250px",borderRadius:"5px"}} onClick={this._SubmitRequest}>Update Account Settings</button>

          </td>

 

          </tr>

 

        </tbody>

 

      </table>

  }

      </div>

      </div>

      <Footer/>

  }

      </Fragment>

 

    )

 

}

}

 

export default AccountSettings

