import React,{Fragment} from 'react'

import {Link} from 'react-router-dom'

import Header from '../header'

import Footer from '../Footer'

 

const Logout=(props)=>{

 

    return(

        <Fragment>

        <Header/>

        <div style={{width:'auto',height:'auto',background:'linear-gradient(to bottom,rgba(252,252,252,1) 0%,rgba(252,252,252,1) 75%,rgba(224,224,224,1) 100%,rgba(224,224,224,1) 100%'}}>

        <div style={{textAlign:'left',width:'100%',align:'center',backgroundColor:'#FFFFFF',minHeight:'70vh',paddingRight:'20px',paddingLeft:'20px',paddingBottom:'10px',background:'linear-gradient(to bottom,rgba(252,252,252,1) 0%,rgba(252,252,252,1) 75%,rgba(224,224,224,1) 100%,rgba(224,224,224,1) 100%'}} >

<br/>

<table style={{border:'0',width:'85%',verticalAlign:'top',marginLeft:'30%',overflow:'hidden'}} cellPadding='0' cellSpacing='20' >

  <tbody style={{overflowX:'hidden'}}>

     <tr style={{padding: "0px",margin:"0px",border:"none"}}>

         <td style= {{width:'10%',verticalAlign:'top'}}> 

            <img  width='100'  height='100px' style={{width:'80'}} src='/images/LogOut.png'>

              

            </img>

         </td>

         <td>

             <font style={{fontSize:'30px',color:'#444444',fontStyle:'Roboto'}}><b>See You Again, Food Lover!!</b>



             </font>

         </td>



      </tr>



      <tr style={{padding: "0px",margin:"0px",border:"none",overflow:'hidden'}}>

          <td colSpan='2'>

          <font style={{fontSize:"20px",fontFamily:'Arial'}}>You have successfully logged out of MyRecipes app..

           <br/><br/>

          Whenever you hunger for absolutely delicious and irresistible food, we're here to satisfy your deepest cravings. <br/>So, do visit us again!

           </font>

           <br/><br/><br/>

           <button type='submit'  name='submit_rating' class='col s6 btn btn-small waves-effect #c62828 red darken-1' style={{position:"relative",width:"220px",borderRadius:"5px",height:'40px'}} onClick={()=>{props.handleLogin(false);props.history.push({pathname:'/',state:{isloggedin:false}})}}>Return to Main Page</button>



          </td>

      </tr>

  </tbody>



</table>



</div>

</div>



<Footer/>  



</Fragment>







)



}



export default Logout