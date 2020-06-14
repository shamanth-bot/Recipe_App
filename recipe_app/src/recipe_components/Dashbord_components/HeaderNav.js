import React,{Fragment,useEffect, Component } from 'react'

import {Link} from 'react-router-dom'

import  M from "materialize-css"

import Logo from '../../images/Myrecipe.png'




class HeaderNav extends Component{

 

  constructor(props){

    super(props)

  }

 

  render(){

 

    return(

  

        <>

        

 

<nav>

  <div class="nav-wrapper white darken-4">

  <img img src={Logo} alt="HeaderLin"style={{position: "absolute",left:"95vh",height:"8vh",bottom:"0px",width:"240px"}} class="brand-logo"></img>

    <ul class="right hide-on-med-and-down" style={{right:'5px',position:'fixed',width:'30vh'}}>

    <li><span style={{fontsize:'32px',color:'#000000'}}>{this.props.name}</span></li>

      <li></li>

    </ul>

  </div>

</nav>  

</>

   )

 

    }

 

}

 

export default HeaderNav    

