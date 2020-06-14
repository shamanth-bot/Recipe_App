import React from 'react'

const Preloader=(props)=>{

 

return(

<div style={{minHeight:'90vh'}}>

<div style={{position:'fixed',top:'30%',left:'60%',transform:'translate(-30%,-60%)'}}>

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

</div>

</div>

)

}

 

export default Preloader

