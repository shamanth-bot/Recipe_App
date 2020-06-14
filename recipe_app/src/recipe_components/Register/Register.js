import React,{Component, Fragment} from 'react'

import axios from 'axios'

import Logo from '../../images/Myrecipe.png'

import {Link} from 'react-router-dom'

import RgisterService from '../api/RegisterService'

import RegisterSuccess from '../../recipe_components/Register/RegisterSuccess'

import RegisterFailure from '../../recipe_components/Register/RegisterFailure'

import Axios from 'axios';

export class  Register extends Component{

 

  constructor(props){

    super(props);

    this.textInput = React.createRef();

 

    this.state={

      firstName:'',

      LastName:'',

      userName:'',

      Email:'',

      Password:'',

      checked:false,

      currentfocus:'',

      firstName_message:'',

      LastName_message:'',

      userName_message:'',

      Email_message:'',

      Password_message:'',

      username_list:[],

      email_list:[],

      errmsg:'',

      usernameFlag:false,

      disabled:false,

      registerSuccess:false,

      registerFailure:false

    }

    this._handleCheck= this._handleCheck.bind(this)

    this._onInputchange= this._onInputchange.bind(this)

    this._onfocusChange= this._onfocusChange.bind(this)

    this._btnSubmit= this._btnSubmit.bind(this)

  }

 

  _handleCheck(){

    this.setState({checked:!this.state.checked})

  }

  async componentDidMount(){

    try{

    var response = await RgisterService.getUserdetails();

    console.log(response);

    if(response.status===200){

      this.setState({username_list:response.data.username_List,email_list:response.data.email_list})

 

    }

      }

    catch(error){

     this.setState({username_list:[],email_list:[]})

    }

  }

 

 async _btnSubmit(e){

    e.preventDefault();

    e.stopPropagation();

    if(this.state.checked===false){

      this.setState({errmsg:'U need to agrree to the terms and conditions'})

    }

   else  if(this.state.UserName===''||this.state.userName===''||this.state.Password===''||this.state.Email===''||this.state.firstName===''){

      this.setState({errmsg:'Email,Usrname,Passowrd and FirstName are compulsory fields and cant be empty'})

 

    }

    else{

      var lastName=(this.state.LastName==='')?this.state.LastName:null;

      console.log(lastName)

     var response= await RgisterService.postCustomerDetails(this.state.Email,this.state.Password,this.state.firstName,lastName,this.state.userName);

       console.log(response)

     if(response.data.Status==='201 Created'){

          this.setState({registerSuccess:true})

      }

      else{

        this.setState({registerFailure:true})

 

      }

    }

  }

 

  _onInputchange(e,type){

    var regex_pass=new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#_])(?=.{8,})')

 

    switch(type){

      case 'first_name':

        this.setState({firstName:e.target.value,currentfocus:'first_name',disabled:false})

        break;

      case 'last_name':

        this.setState({LastName:e.target.value,currentfocus:'last_name',disabled:false})

        break;

      case 'email':

        this.setState({Email:e.target.value,currentfocus:'email',disabled:false})

        break;

      case 'user_name':

        this.setState({userName:e.target.value,currentfocus:'user_name',disabled:false})

        break;

      case 'password':

        this.setState({Password:e.target.value,currentfocus:'password',disabled:false})

        var msg = (regex_pass.test(e.target.value)===false)?'The password must contain atleast 6 characters and should have atleast one number, 1 capital letter and one of _ @ and # must be used':''

        this.setState({Password_message:msg,disabled:false})

 

        break;   

      default:

       this.setState({firstName:'',LastName:'',Email:'',userName:'',Password:''})

       break;

 

    }

 

  }

 

  

async _onfocusChange(msg){

 

    var reg_ex= new RegExp('^[a-zA-Z]+$')

    var reg_ex_name= new RegExp('^[a-zA-Z[0-9]+$')

    var reg_ex_email= new RegExp('^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$');

 

    if(this.state.currentfocus!==msg){

      switch(this.state.currentfocus){

 

        case "first_name":

          var firstName = this.state.firstName

          var msg = (firstName.length<=2)?"name has to be grater than 2 characters":(reg_ex.test(firstName)===false)?'cant have number or special character':''

            this.setState({firstName_message:msg,disabled:true})

            break;

           case  "last_name":

              var firstName = this.state.LastName

              var msg = (reg_ex.test(firstName)===false)?'cant have number or special character':''

    

              this.setState({LastName_message:msg,disabled:true})

              break;

              case  "user_name":

                     var msg=''

                       msg = (this.state.username_list.indexOf(this.state.userName)!==-1)?'username is not available':(this.state.username_list.indexOf(this.state.userName)===-1)?'username is available':(reg_ex_name.test(this.state.userName)===false)?'cant have space or special characters':''

                   

                  this.setState({userName_message:msg,disabled:true})

                  break;

                  case  "email":

                      var msg = (reg_ex_email.test(this.state.Email)===false)?'not a valid email format':(this.state.email_list.indexOf(this.state.Email.toLowerCase())!==-1)?'Email is already registered with us':''

    

                      this.setState({Email_message:msg,disabled:true})

        

                      this.setState({Email_message:msg})

                      break;

                      case  "password":

 

                          break;

                        

  

 

      }

       }

    else{

      switch(this.state.currentfocus){

        case "first_name":

          this.setState({firstName_message:'',disabled:false})

          break;

         case  "last_name":

            this.setState({LastName_message:'',disabled:false})

            break;

  

            case  "user_name":

                this.setState({userName_message:'',disabled:false})

                break;

                case  "email":

                    this.setState({Email_message:'',disabled:false})

                    break;

                    case  "password":

                        this.setState({Password_message:'',disabled:false})

                        break;

                      

      }

   }




}





    render(){

    return(  

<> 

{(this.state.registerSuccess===true)&&<RegisterSuccess name={this.state.firstName} email={this.state.Email}/>}

{(this.state.registerFailure===true)&&<RegisterFailure/>}

 

{(this.state.registerSuccess===false&&this.state.registerFailure===false)&&<div className="container" style={{ width: '55%'}}>

<div className="row">

<center>

 

        <div className="col s12 m6 offset-m4">

           <img src={Logo}  alt = "Website Logo"/>   

        </div>

</center>

</div>

      <div style={{height:'15px'}}/>

 

<div className="row">

 

       <div className="col s12 m6 offset-m4" style={{marginBottom:"10px",marginTop:"-40px"}}>

 

         <div className="card">

           <center>

         {(this.state.errmsg!=='') && <span  style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',color:"#ff2800"}}>{this.state.errmsg}</span>}

         </center>

         <div className="card-content">

          <h4 className="card-title black-text"  style={{fontSize:"30px"}}>Register</h4>

          <form>

 

        {((this.state.firstName_message!=='')||(this.state.LastName_message!==''))&&

          <div class="row">

 

          <div class="input-field col s6">

          {(this.state.firstName_message!=='') && <span  style={{fontSize:"13px",lineHeight:'13px',fontFamily:'Roboto',color:"#ff2800"}}>{this.state.firstName_message}</span>}

 

          </div>

 

         <div class="input-field col s6">

         {(this.state.LastName_message!=='') && <span  style={{fontSize:"13px",lineHeight:'13px',fontFamily:'Roboto',color:"#ff2800"}}>{this.state.LastName_message}</span>}

 

          </div>

          </div>}





          <div class="row">

 

          <div class="input-field col s6">

 

          <input placeholder="First Name" id="first_name" ref={this.textInput} type="text" class="validate" onChange={(e)=>this._onInputchange(e,"first_name")} onFocus={()=>this._onfocusChange("first_name")}/>

          </div>

 

         <div class="input-field col s6">

 

          <input id="last_name" placeholder="Last Name (optional)" type="text" class="validate" onChange={(e)=>this._onInputchange(e,"last_name")} onFocus={()=>this._onfocusChange("last_name")}/>

          </div>

          </div>

 

          <div class="row">

 

              <div class="input-field col s12">

              {(this.state.userName_message!=='') &&<> <font style={{fontSize: "18px",color:'red'}}>✕</font> <span  style={{fontSize:"15px",lineHeight:'15px',fontFamily:'Roboto',color:"#ff2800"}}>{this.state.userName_message}</span></>}

 

                <input placeholder="Enter your UserName" id="email" type="text" class="validate" onChange={(e)=>this._onInputchange(e,"user_name")} onFocus={()=>this._onfocusChange("user_name")}/>

                <label for="email" class="active">UserName</label>

 

              </div>

            </div>

 

             {(this.state.Email_message!=='')&&          

                              <div class="row">

 

                              <div class="input-field col s12">

                              <span  style={{fontSize:"13px",lineHeight:'13px',fontFamily:'Roboto',color:"#ff2800"}}>{this.state.Email_message}</span>

 

                              </div>

                            </div>

                

 

             }

          <div class="row">

 

              <div class="input-field col s12">

                <input placeholder="Enter your email" id="email" type="text" class="validate" onChange={(e)=>this._onInputchange(e,"email")} onFocus={()=>this._onfocusChange("email")}/>

                <label for="email" class="active">Email</label>

 

              </div>

            </div>

 

            {(this.state.Password_message!=='')&&          

                              <div class="row">

 

                              <div class="input-field col s12">

                              <span  style={{fontSize:"13px",lineHeight:'13px',fontFamily:'Roboto',color:"#ff2800"}}>{this.state.Password_message}</span>

 

                              </div>

                            </div>

                

 

             }

 

            <div class="row">

              <div class="input-field col s12">

 

                <input placeholder="Enter your password" id="password" type="password" class="validate" onChange={(e)=>this._onInputchange(e,"password")} onFocus={()=>this._onfocusChange("password")}/>

 

                <label for="password" class="active">Password</label>

 

              </div>

            </div>

 

            <div class="row">

            <form>

            <label>

        <input type="checkbox" onChange={this._handleCheck} defaultChecked={this.state.checked}    />

        <span>        <div>I confirm and agree to the My Recipes terms and conditions</div> 

</span>

      </label>

      </form>

 

</div>

 

            <br />

 

            <center>

            <div class='row'>

                

                <button type='submit' width='80%' name='btn_login' class='col s12 btn btn-large waves-effect #4caf50 green darken-3' disabled={this.state.disabled} onClick={this._btnSubmit}>Register</button>

              </div>

 

            </center>  

            </form>

             

          </div>

 

</div>

</div>

</div>

<center>

<div class="row">

<div class="col s12 m6 offset-m4">Already have an Account?

<Link style={{color: "#e8000d"}} to={'/Login'}>Login</Link>

</div>

</div>

</center>

</div>

    }

</>

    )

    }

}

 

export default Register;

