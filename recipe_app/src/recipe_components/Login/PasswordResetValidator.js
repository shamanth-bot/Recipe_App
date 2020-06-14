import React,{Fragment,Component} from 'react'

import {Link} from 'react-router-dom'

import Header from '../header'

import Footer from '../Footer'

import new_logo from '../../images/Myrecipe.png'

import Reset_password from '../api/LoginService'

import axios from 'axios'

import ResetPassword from  '../api/recipeService'

import PassResetFailure from '../Login/PassResetFailure'

import PassResetSuccess from '../Login/PassResetSuccess'

import Logo from '../../images/Myrecipe.png'

 

class PasswordResetValidator extends Component{

 

    constructor(props){

        super(props);

        this.state={

            password:'',

            retyped_password:'',

            token:'',

            errmsg:'',

            tokenValidation:false,

            errmsgind:false,

            postSuccessfull:false,

            resetname:'Reset Password'

                }

        this._SubmitPassworReset= this._SubmitPassworReset.bind(this)

        this._onInputchange=this._onInputchange.bind(this)

        this._onfocuschange= this._onfocuschange.bind(this)

 

    }

 

    async componentDidMount() {

        try{

            console.log(this.props.match.params.token)

 

        const response = await Reset_password.validatePasswordResetToken(this.props.match.params.token)

        console.log(response.data)

       if (response.data.Status==='200') {

          this.setState({ tokenValidation: true })

        } else {

            this.setState({ tokenValidation: false })

 

        }

    }

    catch(error){

        console.log(error)

        this.setState({ tokenValidation: false })

 

    }

      }

    

    _onfocuschange(e){

        this.setState({errmsgind:false})

 

   

      }

 

   async _SubmitPassworReset(e){

    e.preventDefault()

    e.stopPropagation()

     var regex_pass=new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#_])(?=.{8,})')

 

        if(this.state.password===''&&this.state.retyped_password===''){

            this.setState({errmsg:'You cant have both the fields empty or use only spaces',errmsgind:true})

        }

        else if(this.state.password!==this.state.retyped_password){

            this.setState({errmsg:'The entered passwords do not match , Please re-enter',errmsgind:true})

 

        }

        else  if(regex_pass.test(this.state.password===false)){

        this.setState({errmsg:'The password must contain atleast 6 characters and should have atleast one number, 1 capital letter and one of _ @ and # must be used',errmsgind:true})

 

        }

        else{

            try{

                this.setState({resetname:'Resetting...'})

            const response = await Reset_password.postpassword(this.state.password,this.props.match.params.token)

            if(response.status===200){

                this.setState({postSuccessfull:true,resetname:'Reset Password'})

            }

            else{

                this.setState({postSuccessfull:false,resetname:'Reset Password',errmsg:response.data.message,errmsgind:true})

   

            }

            }

            catch(error){

                this.setState({postSuccessfull:false,resetname:'Reset Password',errmsg:"unable to chaneg the passowrd there might be some issue,try after some time",errmsgind:true})

 

            }

 

        }

 

    }

 

    _onInputchange(e){

        if(e.target.name==='password'){

            this.setState({password:e.target.value.trim()})

 

        }

        else{

            this.setState({retyped_password:e.target.value.trim()})

 

        }

    }

 

render(){

 

    return(

        <>

        <nav class="navbar navbar-main margin-bottom-6 navbar-expand-lg navbar-light bg-white">

 

<div class="nav-wrapper white darken-4">

<img img src={Logo} alt="HeaderLin"style={{position: "absolute",left:"95vh",height:"8vh",bottom:"0px",width:"50vh"}} class="brand-logo"></img>

    

</div>

</nav>

        <div style={{width:'100%',height:'auto',background:'linear-gradient(to bottom,rgba(252,252,252,1) 0%,rgba(252,252,252,1) 75%,rgba(224,224,224,1) 100%,rgba(224,224,224,1) 100%'}}>

          <div style={{textalign:"left",width:'100%',minHeight:'60vh',paddingTop:'20px',paddingBottom:'10px'}}>

              {(this.state.tokenValidation===true&&this.state.postSuccessfull===false)&&<>

            <div style={{width:'100%',height:'4vh'}}/>

              <center>

                  <span style={{fontSize:'36px',color:'#000000',fontWeight:'normal'}}>Reset  Your  Password</span>

                  <br></br><br/>

                  

                  <span style={{fontSize:'22px',color:'#000000',fontFamily:'Roboto,Arial',fontWeight:'lighter'}}>Please enter your new password to proceed</span>

                  <br></br>

    {(this.state.errmsgind===true)&&<><br/><div style={{fontSize:'20px',fontFamily:'Roboto,Arial',paddingBottom:'10px',color:'#ff2800'}}>{this.state.errmsg}</div></>} 

                  <br/><br/>

                  <input placeholder="New Password" id="password" name="password" type="password" class="validate" style={{width:'20%',borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}} onChange={this._onInputchange} onFocus={this._onfocuschange}/>

                  <br/><br/><br/>

                  <input placeholder="Re-Type Password" id="retype-password" name = "retype-password" type="password" class="validate" style={{width:'20%',borderTop:"1px solid #808080",borderLeft:'1px solid #808080',borderRight:'1px solid #808080',borderRadius:'6px 6px 6px 6px',backgroundColor:'#FFFFFF'}} onChange={this._onInputchange} onFocus={this._onfocuschange}/>

                    <br/>

                    <br/><br/>

                    <center>

              <button type='submit'  name='btn_login' style={{width:'30vh',height:'45px',lineHeight:'19px',backgroundColor:'#c62828',color:'#ffffff',fontWeight:'bold',fontSize:'22px',textAlign:'center',borderRadius:'8px',padding:'8px 15px 8px 15px'}} onClick={this._SubmitPassworReset}>{this.state.resetname}</button>

 

                    </center>

              </center> </>           

}

 

        {(this.state.tokenValidation===false)&&<><br/><PassResetFailure></PassResetFailure></>

 

}

{(this.state.postSuccessfull)&& <PassResetSuccess/>}

 

          </div>

        </div>

        <Footer/></>

 

    )

 

        

 

    

}

 

}

export default PasswordResetValidator;

 

