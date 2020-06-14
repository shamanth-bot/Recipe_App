import React, { Fragment } from 'react'

import Logo from '../images/Myrecipe.png'

import {Link} from 'react-router-dom'

function header(){

    return(

      <Fragment>

        <nav class="navbar navbar-main margin-bottom-6 navbar-expand-lg navbar-light bg-white">

 

<div class="nav-wrapper white darken-4">

<img img src={Logo} alt="HeaderLin"style={{position: "absolute",left:"95vh",height:"8vh",bottom:"0px",width:"50vh"}} class="brand-logo"></img>

<div class="collapse navbar-collapse justify-content-end" id="main_navbar">

<ul id="nav-mobile" class="right hide-on-med-and-down-nav white darken-4">

<li class="nav-item active white darken-4">         <Link to={'/login'}>    <span class="black-text text-darken-2">Login</span>

</Link></li>

<li class="nav-item active white darken-4">         <Link to={'/Register'}> <span class="black-text text-darken-2">Register</span></Link></li>

 

</ul>

 

    </div>

 

    

    

</div>

</nav>

 

      </Fragment>

 

    )

}

 

export default header

