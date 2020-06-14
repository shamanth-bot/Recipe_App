import React from 'react'

import Header from '../header'

import Footer from '../Footer'

import {Link} from 'react-router-dom'

    const PassResetSuccess=(props)=>{

 

    return(

        <>

        <Header/>

       <div style={{textAlign:'left',width:'100%',align:'center',backgroundColor:'#FFFFFF',minHeight:'500px',paddingRight:'20px',paddingLeft:'20px',paddingBottom:'10px'}}>

            <br/>

          <table style={{border:'0',width:'85%',verticalAlign:'top',marginLeft:'30%'}} cellPadding='0' cellSpacing='20'>

              <tbody>

                 <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                     <td style= {{width:'10%',verticalAlign:'top',textAlign:'right'}} align='right'> 

                        <img  width='100'  height='200px' style={{width:'80'}} src='/images/LogOut.png'>

                          

                        </img>

                     </td>

                     <td align='left' >

 

                     <font style={{fontSize:'30px',color:'#ff2800',fontStyle:'Roboto'}}><b>Welcome {props.name}!!.</b>

                         <br></br>

    <span style={{fontSize:'30px',color:'#444444',fontStyle:'Roboto'}}>An email has been sent to {props.email} .Make sure to follow  <br></br> the link in  the email to complete registration</span>

 

                         </font>

 

                     </td>

 

                  </tr>

 

                  <tr style={{padding: "0px",margin:"0px",border:"none",verticalAlign:'middle'}} >

                  <div style={{position:"relative",left:'20vh'}}>

                   <br/>

                   <td  style={{verticalAlign:'middle',textAlign:'center',marginRight:'5vh'}}>

                   <Link to={'/Login'}>

                   <button type='submit'  name='btn_login' style={{width:'30vh',height:'45px',lineHeight:'19px',backgroundColor:'#c62828',color:'#ffffff',fontWeight:'bold',fontSize:'22px',textAlign:'center',borderRadius:'8px',padding:'8px 15px 8px 15px'}} >Login To Account</button>

                    </Link>

                   </td>

                   </div>

                  </tr>  

              </tbody>

 

          </table>

           

       </div>

       <Footer/>

</>

       

 

   )

 

}

 

export default PassResetSuccess

