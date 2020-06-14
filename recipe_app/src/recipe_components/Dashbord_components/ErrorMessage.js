import React from 'react'

const ErrorMessage=(props)=>{

 

    return(

<div style={{minHeight:'60vh'}}>

<table width="100%" cellPadding="0" cellSpacing="0" style={{alignContent:"center"}}>

        <tbody>

          <tr style={{padding: "0px",margin:"0px",border:"none"}}>

            <td style={{height:"10px"}}>

            <img  width='140'  height='200px' style={{width:'80'}} src='/images/error.jpg'/>

                 

            </td>

            <td>

                         <font style={{fontSize:'30px',color:'#ff2800',fontStyle:'Roboto'}}><b>Error loading...!!</b>

                         <br></br><br></br>

                         <span style={{fontSize:'30px',color:'#444444',fontStyle:'Roboto'}}>Sorry, we are unable to load teh page due to some techical difficulty <br/>Will be back in some time</span>

 

                         </font>

                     </td>

 

          </tr>

          </tbody>

          </table>

       

 

   

   </div>

    )

}

 

export default ErrorMessage

