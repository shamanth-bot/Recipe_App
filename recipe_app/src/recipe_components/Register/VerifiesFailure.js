import React from 'react'

const VerifiesFailure=(props)=>{

 

    return(

          <table style={{border:'0',width:'85%',verticalAlign:'top',marginLeft:'30%'}} cellPadding='0' cellSpacing='20'>

              <tbody>

                 <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                     <td style= {{width:'10%',verticalAlign:'top'}}> 

                        <img  width='140'  height='200px' style={{width:'80'}} src='/images/error.jpg'>

                          

                        </img>

                     </td>

                     <td>

                         <font style={{fontSize:'30px',color:'#ff2800',fontStyle:'Roboto'}}><b>Verification Error!!</b>

                         <br></br><br></br>

                         <span style={{fontSize:'30px',color:'#444444',fontStyle:'Roboto'}}>Sorry,The Url no longer exsist, It is laready Used or invalid</span>

 

                         </font>

                     </td>

 

                  </tr>

 

              </tbody>

 

          </table>

           

 

       

 

   )

 

}

 

export default VerifiesFailure

