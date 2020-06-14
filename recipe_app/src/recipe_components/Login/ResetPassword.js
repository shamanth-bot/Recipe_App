import React,{Fragment,Component} from 'react'

import {Link} from 'react-router-dom'

import Header from '../header'

import Footer from '../Footer'

import new_logo from '../../images/Myrecipe.png'

import Reset_password from '../api/LoginService'

import axios from 'axios'

 

class ResetPassword extends Component{

 

    constructor(props){

        super(props);

        this.state={

            errValidator:false,

            errmsg:'',

            emailValue:'',

            color:'',

            retrievinginfo:'Reset Password'

        }

        this._onInputchange = this._onInputchange.bind(this)

        this._SubmitPassworReset= this._SubmitPassworReset.bind(this)

        this._onfocuschange= this._onfocuschange.bind(this)

    }

 

    _onInputchange(e){

        this.setState({emailValue:e.target.value})

 

      }

 

      _onfocuschange(e){

        this.setState({errValidator:false})

 

   

      }

 

     async _SubmitPassworReset(){

        var reg_ex= new RegExp('^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$');

        var email_val = this.state.emailValue.trim();

        if(email_val===''){

            this.setState({errValidator:true,errmsg:'Email can`t be empty',color:'#ff2800'})

 

        }

        else if(reg_ex.test(email_val)===false){

            this.setState({errValidator:true,errmsg:'Please Enter a valid email type',color:'#ff2800'})

 

        }

        else{

            this.setState({retrievinginfo:'Retreving Info...'})

            this.setState({errValidator:false})

            try{

            var response= await Reset_password.postforgetPassword(email_val)

            console.log(response)

                if(response.data.Status==='404 Reset_Inprogress'){

                    this.setState({retrievinginfo:'Reset Password',errValidator:true,errmsg:'Emaily has been already sent , Please check the spam or wait for 10 minutes in case you ahvent recieved it ',color:'#1b5e20'})

                     

                }

                else if(response.data.Status==='404 NOT_FOUND'){

                    this.setState({retrievinginfo:'Reset Password',errValidator:true,errmsg:'Entered email is not registered with us.',color:'#ff2800'}) 

                }

                else if(response.data.Status==='201 CREATED'){

                    this.setState({retrievinginfo:'Reset Password',errValidator:true,errmsg:'The password reset instructions    have been mailed to you,Please check',color:'#1b5e20'})

                    this.setState({mailsentIndicator:true})

 

                }

            }

            catch(err){

                this.setState({retrievinginfo:'Reset Password',errValidator:true,errmsg:'Unable to send the email..our serverr seems to be down,sorry for the inconvinience ',color:'#ff2800'})

  

            }

 

        }

    

 

      }

    

 

render(){

 

    return(

<div style={{backgroundColor:'#ffffff',width:'650px',height:'450px',top:'50%',left:'50%',WebkitTransform:'translate(-50%,-50%)',transform:'translate(-50%,-50%)',borderRadius:'10px',boxShadow:'0px 0px 20px',opacity:'1.0',fontFamily:'Roboto,Arial',position:'fixed'}}>

                 <div style={{paddingTop:'10px',paddingBottom:'5px',paddingRight:'20px'}}>

                   <div style={{width:'16px',fontSize:'15px',fontWeight:'bold',textAlign:'center',marginLeft:'auto',marginRight:'0',cursor:'pointer'}} color='#aaaaaa' ali onClick={()=>this.props.closeWindow()}>X</div>

                   <center>

                       <img src={new_logo}></img>

                       <div style={{height:'15px'}}></div>

                       <b style={{lineHeight:'30px',fontFamily:'Roboto,Arial',fontSize:'22px',color:'#666666'}}>Reset Your Password</b>

                       <div style={{height:'10px'}}></div>

 

                      <div style={{fontSize:'16px',paddingBottom:'10px',color:'#666666'}}>Enter your membership email and we'll send you instructions to reset it</div>

                      <div style={{height:'15px'}}></div>

               { (this.state.errValidator===true) && <div style={{fontSize:'16px',paddingBottom:'10px',color:this.state.color}}>

               <span  style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',color:this.state.color}}>{this.state.errmsg}</span></div>}

 

                      <div class="row">

                          <div class="col s8 offset-m2">

                          <input placeholder="Your Email" id="email" type="text" class="validate" style={{borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}} onChange={this._onInputchange} onFocus={this._onfocuschange}/>

                       </div>

 

                    </div>

                    <div style={{height:'3px'}}></div>

 

                    <div class='row'>

    <button type='submit'  name='btn_login' style={{width:'200px',height:'45px',lineHeight:'19px',backgroundColor:'#1b5e20',color:'#ffffff',fontWeight:'bold',textAlign:'center',borderRadius:'8px',padding:'8px 15px 8px 15px'}} onClick={this._SubmitPassworReset}>{this.state.retrievinginfo}</button>

              </div>

              <div style={{height:'10px'}}></div>

 

                <div style={{paddingLeft:'20px',float:'left',textAlign:'left',align:'left',color:'#666666',fontSize:'18px'}}>

                <Link style={{color:'#666666'}}  to={'/Login'} onClick={()=>this.props.closeWindow()}>Member Login</Link>

 

                </div>

                <div style={{paddingRight:'20px',float:'right',textAlign:'right',align:'right',color:'#666666',fontSize:'18px'}}>

                <Link style={{color:'#666666'}}  to={'/Register'}>Not a member? Sign up FREE!</Link>

 

                </div>

 

               </center>

                       

                   </div>

 

               </div>

 

       

 

   )

    }

 

}

 

export default ResetPassword

