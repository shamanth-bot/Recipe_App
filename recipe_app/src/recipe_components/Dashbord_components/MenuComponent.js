import React from 'react'

 

import ManageMyProfile from './ManageMyProfile'

import AccountSettings from './AccountSettings'

import Logout from './Logout'

import ShareRecipe from './ShareRecipe'

import UpdateMyRecipeProfile from './UpdateMyRecipeProfile'

import {Link,useRouteMatch,Router,Switch,Route} from 'react-router-dom'

 

const MenuComponent=(props)=>{

 

return(

    <table style={{border:"0",width:"100%",marginTop:"20px"}}  cellPadding="0" cellSpacing="0">

    <tbody >

    <tr style={{padding: "0px",margin:"0px",border:"none"}}>

       <td>

         <div style={{backgroundColor:"#ff3a3a",fontSize:"15px",lineHeight:"33px",width:"252px",height:"35px",fontWeight:"bold",color:"#ffffff",textAlign:"center",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>Member Operations</div>

          <div style={{fontsize:"14px",lineHeight:"18px",padding:"0px",width:"252px",backgroundColor:"#ffffff",borderLeft:"1px solid #dddddd",borderRight:"1px solid #dddddd",borderTop:"0px",borderBottom:"1px solid #dddddd",color:"#555555"}}>

            <center>

              <div style={{width:"0px",height:"0px",borderLeft:"12px solid transparent",borderRight:"12px solid transparent",borderTop:"12px solid #ff3a3a"}}></div>

            </center>

            <table style={{border:"0",width:"100%",bottom:"20px"}} cellPadding="0" cellSpacing="0">

               <tody>

               <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                 <td>

                 <Link to={{pathname: `/Landing_Page/Manage_Recipies/${props.customer_Details.firstName}`,state:{customer_Details:props.customer_Details}}}><span style={{fontsize:"32px",fontFamily:'Verdana'}}>Manage My Recipes</span></Link><br/>

<Link to={{pathname:`/Profile/${props.customer_Details.firstName}`,state:{cusID:props.customer_Details.cusid}}}> <span style={{fontsize:"32px",fontFamily:'Verdana'}} >My Recipes Profile</span></Link><br/>

<Link to={{pathname:`/Landing_Page/Search_Recipies/${props.customer_Details.firstName}`,state:{customer_Details:props.customer_Details}}}> <span style={{fontsize:"32px",fontFamily:'Verdana'}}>Search Recipies</span></Link><br/><br/>



<Link to={{ pathname: `/Landing_Page/Update_Profile/${props.customer_Details.firstName}`,state:{customer_Details:props.customer_Details}}}><span style={{fontsize:"32px",fontFamily:'Verdana'}}>Update My Recipes Profile</span></Link><br/>

<Link to={{pathname:`/Landing_Page/Account_Settings/${props.customer_Details.firstName}`,state:{customer_Details:props.customer_Details}}}>Update My Recipes Settings</Link><br/>

<Link to='/LogOut'><span style={{fontsize:"32px",fontFamily:'Verdana'}}>LogOut</span></Link>



</td>





</tr>

</tody>                      

</table>

</div>

</td>



</tr>

</tbody>

</table>



)

}



export default MenuComponent

