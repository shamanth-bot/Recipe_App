import React,{Fragment,Component} from 'react'

import {Link} from 'react-router-dom'

import Header from '../header'

import Footer from '../Footer'

import new_logo from '../../images/Myrecipe.png'

import RegisterService from '../api/RegisterService'

import VerfifiesSuccess from '../Register/VerifiesSuccess'

import VerifiesFailure from '../Register/VerifiesFailure'

import axios from 'axios'

 

class RegisterValidator extends Component{

 

    constructor(props){

        super(props);

        this.state ={

            tokem:'',

            tokenValidation:false

 

        }

    }

 

    async componentDidMount() {

        try{

            this.setState({token:this.props.match.params.token})

        const response = await RegisterService.validateRegistrationToken(this.props.match.params.token)

        console.log(response.status)

       if (response.data.Status==='200') {

         const response = await RegisterService.postRegistrationChangeUpdate(this.props.match.params.token)

             if(response.data.Status==='201'){

          this.setState({ tokenValidation: true })

        } else {

            this.setState({ tokenValidation: false })

 

        }

       }

    }

    catch(error){

        console.log(error)

        this.setState({ tokenValidation: false })

 

    }

      }

    

       render(){

           return(

            <>

            <Header/>

            <div style={{width:'100%',minHeight:'60vh',height:'auto',background:'linear-gradient(to bottom,rgba(252,252,252,1) 0%,rgba(252,252,252,1) 75%,rgba(224,224,224,1) 100%,rgba(224,224,224,1) 100%'}}>

 

            {(this.state.tokenValidation===true) &&<VerfifiesSuccess/>}

            {(this.state.tokenValidation===false) &&<VerifiesFailure    />}

</div>

            <Footer/>

            </>

           )

       }

 

}

 

export default RegisterValidator

