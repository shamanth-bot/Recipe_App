import React,{Component, Fragment} from 'react'

import Logo from '../../images/Myrecipe.png'

import {Link} from 'react-router-dom'

import new_logo from '../../images/Myrecipe.png'

import login_Service from '../api/LoginService'

 import AuthenticationService from '../api/AuthenticationService'

import ForgotPassword from '../../recipe_components/Login/ResetPassword'

export class  login extends Component{

 

  

  constructor(props) {

    super(props);

    this.state={

        email:'',

        Password:'',

        loogedIn:false,

        invalidemail_Type:false,

        focusind:false,

        disabled:false,

        errmSginput:'',

        errmSgpassword:'',

        errmSgInavild:'',

        forgotPassword:false,

        loginName:'Login',

 

        

       

    }

    

 

    this.inputRef = React.createRef()

    this._onInputchange= this._onInputchange.bind(this)

    this._validateForm = this._validateForm.bind(this)

    this._onfocuschange = this._onfocuschange.bind(this)

    this._closeWindow= this._closeWindow.bind(this)

 

  }

 

  _closeWindow(){

    this.setState({forgotPassword:false})

  }

   

  async _validateForm(event){

    event.preventDefault();

    event.stopPropagation();

 

    if(this.state.email===''){

        this.setState({errmSginput:"Email field cant be empty"})

    }

    if(this.state.Password===''){

      this.setState({errmSgpassword:"Password field cant be empty"})

 

    }

 

        if(this.state.email!==''&&this.state.Password!==''){

          this.setState({loginName:'Logging In....'})

        var response_token=   AuthenticationService.executeJwtAuthenticationService(this.state.email,this.state.Password)

          var response = await login_Service.getUserdetails(this.state.email,this.state.Password)

            console.log(response)

           if(response.data.Status){

              if(response.data.Status==='404 NOT_FOUND'){

             this.setState({errmSgInavild:"Username or Passowrd is Incorrect.If you forgot password try to regenerate it by clicking Forgot passowrd"})

             this.setState({errmSgpassword:'',loginName:'Login'})

              }

           }

           else{

             if(response.status===200){

 

             this.setState({loginName:'Login'})

              if(response.data.customer_validated==='No'){

                this.setState({errmSgInavild:"Registered email id is not Verified, Kindly complete the verification process to login"})

 

              }

              else if(response.data.customer_validated==='Yes'){

                

                this.props.handleLogin(true)
   
    
   
               this.props.history.push({pathname:'/Landing_Page',  search: '?Profile='+response.data.firstName,state:{name:response.data.firstName,isloggedin:this.state.loogedIn,cusID:response.data.login_cusid}});
   
                 }
   
              
   
               }
   
               else{
   
                 this.setState({errmSgInavild:"Sorry due to techical inconviennce we cant log you in , give us some time and login back later"})
   
    
   
               }
   
             }
   
           }
   
    
   
     }
   
     _onfocuschange(val,ind){
   
       this.setState({focusind:val})
   
       if(ind==='pass'){
   
         this.setState({errmSginput:'',errmSgpassword:'',errmSgInavild:''})  
   
         if(this.state.invalidemail_Type===true){
   
           this.setState({disabled:true})
   
    
   
         }
   
         else{
   
         this.setState({disabled:false})
   
         }
   
       }
   
       else if(ind==='email'){
   
         this.setState({errmSgpassword:'',errmSgInavild:''})  
   
             if(this.state.errmSginput==='Email field cant be empty'){
   
               this.setState({errmSginput:''})
   
    
   
             }
   
         this.setState({disabled:false})
   
    
   
       }
   
     }
   
     _onInputchange(e){
   
       var reg_ex= new RegExp('^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$');
   
       if(e.target.name==='email'){
   
       if(reg_ex.test(e.target.value)===false){
   
        this.setState({invalidemail_Type:true})
   
      }else{    
   
       this.setState({invalidemail_Type:false})
   
       this.setState({email:e.target.value.toString()})
   
    
   
      }
   
     }
   
      else{
   
          this.setState({Password:e.target.value.toString()})
   
    
   
      }
   
      
   
     }
   
    
   
       render(){
   
       return(  
   
    
   
   <div class="container" style={{ width: '55%'}}>
   
     <div class="row">
   
     <center>
   
           <div class="col s12 m6 offset-m4">
   
              <img src={Logo} style={{height:'80px'}} alt = "Website Logo"/>   
   
           </div>
   
   </center>
   
    
   
       </div>
   
         <div style={{height:'10px'}}>
   
    
   
         </div>
   
   <div class="row">
   
          <div class="col s12 m6 offset-m4" style={{marginBottom:"10px",marginTop:"-40px"}} >
   
            <div class="card">
   
            <div class="card-content">
   
            {(this.state.errmSgInavild!=='') && <span  style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',color:"#ff2800"}}>{this.state.errmSgInavild}</span>}
   
    
   
            <h4 class="card-title black-text"  style={{fontSize:"30px"}}>Login</h4>
   
             <form>
   
    
   
             <div class="row">
   
             <div class="input-field col s12">
   
            {(this.state.invalidemail_Type===true && this.state.focusind===true) && <span  style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',color:"#ff2800"}}>Entered email id not valid mail type</span>}
   
    
   
       {(this.state.errmSginput!=='') && <span  style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',color:"#ff2800"}}>{this.state.errmSginput}</span>}
   
    
   
   </div>
   
                 <div class="input-field col s12">
   
                   <input placeholder="Enter your email" id="email" name="email" type="text" class="validate" onChange={this._onInputchange} onFocus={()=>this._onfocuschange(false,'email')}/>
   
                   <label for="email" class="active">Email</label>
   
    
   
                 </div>
   
               </div>
   
               <div class="row">
   
               <div class="input-field col s12">
   
    
   
               {(this.state.errmSgpassword!=='') && <span  style={{fontSize:"20px",lineHeight:'20px',fontFamily:'Roboto',color:"#ff2800"}}>{this.state.errmSgpassword}</span>}
   
               </div>
   
                 <div class="input-field col s12">
   
    
   
                   <input placeholder="Enter your password" name = "pwd" id="password" type="password" class="validate" onChange={this._onInputchange} onFocus={()=>this._onfocuschange(true,'pass')}/>
   
    
   
                   <label for="password" class="active">Password</label>
   
    
   
                 </div>
   
                 <label style={{float: "right"}}>
   
                   
   
                   <div  style={{color:"#ff2800",cursor:'pointer'}}  onClick={()=>{this.setState({forgotPassword:true})}} ><b style={{fontSize:'15px'}}>Forgot Password?</b></div>
   
                 </label>
   
    
   
               </div>
   
               <br />
   
    
   
               <center>
   
               <div class='row'>
   
       <button type='submit' width='80%' name='btn_login' class='col s12 btn btn-large waves-effect #4caf50 green darken-3' disabled={this.state.disabled} onClick={this._validateForm}>{this.state.loginName}</button>
   
                 </div>
   
    
   
               </center>  
   
               </form>
   
                
   
             </div>
   
    
   
   </div>
   
   </div>
   
   </div>
   
   <center>
   
   <div class="row">
   
   <div class="col s12 m6 offset-m4">Dont have an Account?
   
   <Link style={{color: "#e8000d"}} to={'/Register'}>Register</Link>
   
   </div>
   
   </div>
   
   </center>
   
   {
   
     (this.state.forgotPassword===true)&&<div style={{background:'rgba(0,0,0,0.5)',color:'#666666',width:'auto',height:'auto',display:'block',position:'fixed',bottom:0,top:0,right:0,left:0,zIndex:'8100'}}>
   
       <ForgotPassword closeWindow={this._closeWindow}/>                  
   
   </div>
   
   }
   
   </div>
   
       )
   
       }
   
   }
   
    
   
   export default login;
   
   