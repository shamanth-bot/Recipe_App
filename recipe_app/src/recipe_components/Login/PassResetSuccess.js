import React,{useState} from 'react'

import { Redirect ,Link} from 'react-router-dom'

 

const PassResetSuccess=(props)=>{

 

    const [redirect, setredirect] = useState(false)




    const   renderRedirect = () => {

        if (redirect===true) {

          return <Redirect to='/Login' />

        }

      }

    

    return(

       <div style={{textAlign:'left',width:'100%',align:'center',backgroundColor:'#FFFFFF',minHeight:'500px',paddingRight:'20px',paddingLeft:'20px',paddingBottom:'10px'}}>

            <br/>

          <table style={{border:'0',width:'85%',verticalAlign:'top',marginLeft:'30%'}} cellPadding='0' cellSpacing='20'>

              <tbody>

                 <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                     <td style= {{width:'10%',verticalAlign:'top'}}> 

                        <img  width='100'  height='100px' style={{width:'80'}} src='/images/LogOut.png'>

                          

                        </img>

                     </td>

                     <td>

                         <font style={{fontSize:'30px',color:'#444444',fontStyle:'Roboto'}}><b>Password Reset Successful!!</b>

 

                         </font>

                     </td>

 

                  </tr>

 

                  <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                      <td colSpan='2'>

                      <span style={{fontSize:"20px",fontFamily:'Arial'}}>Congratulation !!! your password has been succesfully updated!!<br/>You can now Login into Myrecipes </span>

                       <br/><br/><br/>

                       <Link to={'/Login'}>

                       <button type='submit'  name='submit_rating' class='col s6 btn btn-small waves-effect #c62828 red darken-1' style={{position:"relative",width:"220px",borderRadius:"5px",height:'40px'}}>Return to Login Page</button>

                        </Link>

                      </td>

                  </tr>

              </tbody>

 

          </table>

           

       </div>

 

       

 

   )

 

}

 

export default PassResetSuccess

