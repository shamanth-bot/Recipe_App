import React from 'react'

 

const HeaderSection = (props)=>{

    console.log(props.gender)

return(

<div style={{position:"relative"}}>

           <center>

              <div style={{position:"absolute",width:"100%",bottom:"0px",zIndex:30}  }>

                  <table style={{width:"100%",height:"175"}} cellPadding="0" cellSpacing="0" align="center" height="180px">

                      <tbody>

                          <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                           <td rowSpan="3" valign="bottom">

                               <div style={{width:"200px",height:"180px",overflow:"hidden",zIndex:"30",position:"relative",left:"250px",top:"0px",backgroundColor:"#ffffff",borderLeft:"3px solid #ffffff",borderRight:"3px solid #ffffff",borderTop:"3px solid #ffffff",borderBottom:"3px solid #ffffff",boxShadow:"1px 5px 5px #aaaaaa"}}>                                  

                          {(props.profileImage!==null&&props.profileImage!=='') ?<img src = {`data:image/jpeg;base64,${props.profileImage}` } style={{position:"absolute",opacity:"1",left:"0px",right:"0px",border:"0",width:"200px",height:"180px"}}></img>:(props.gender==='M')?<img src = '/images/profilePic_male.jpg' style={{position:"absolute",opacity:"1",left:"0px",right:"0px",border:"0",width:"200px",height:"180px"}}></img>:

                          <img src = '/images/profile_female.jpg' style={{position:"absolute",opacity:"1",left:"0px",right:"0px",border:"0",width:"200px",height:"180px"}}></img>}

                               </div>

                           </td>

                          </tr>

                          <tr height="40" style={{padding: "0px",margin:"0px",border:"none"}} valign="middle">

                              <td>

                                  <table width="80%" align="right" cellSpacing="0" cellPadding="0" style={{textShadow:"2px 2px 3px #ffffff",fontSize:"26px", fontWeight:"normal"}}>

                                     <tbody>

                                         <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                                             <td valign="middle" align="left">

                                                 <div style={{marginTop:"80px"}}>

    <b style={{right:"-20px"}}> {props.author}</b>

                                                   <font style={{fontWeight:"normal", color:"#333333", fontSize:"22px"}}> &nbsp; • &nbsp; {(props.followers!==null&&props.followers!=='')?props.followers:0} Followers</font>

                                                 </div>

 

                                             </td>

                                             <td valign="middle"  style={{padding: "0px",margin:"0px",border:"none",top:"40px"}}>

                                             <button type='submit' width='50%' name='submit_rating' class='col s6 btn btn-small waves-effect #c62828 red darken-1' style={{position:"relative",right:"380px",bottom:"-35px",right:'55%'}}>Follow</button>

                                           </td>

                                         </tr>

                                     </tbody>

                                  </table>

                              </td>

 

                          </tr>

                      </tbody>

 

                  </table>

               </div>

           </center>

      

      <div style={{width:"100%",maxHeight:"375px",overflow:"hidden",position:"relative",zIndex:"12"}}>

             {(props.coverImage!==null&&props.coverImage!=='') ?   <img class="activator" src={`data:image/jpeg;base64,${props.coverImage}`} width="100%" minheight="300px" style={{top:"80px"}}/>

                   :<img class="activator" src='/images/default_member_cover-1.jpg' width="100%" minheight="300px" style={{top:"80px"}}/>}

                 <div style={{width:"100%",height:"50px",bottom:"0px",overflow:"hidden",zIndex:"10",position:"absolute",left:"0px",fontSize:"26px",textShadow:"2px 2px 3px #ffffff",fontWeight:"bold",verticalAlign:"middle",textAlign:"right",background:"-webkit-linear-gradient(top, rgba(252, 252, 252, 0.3) 0%, rgba(252, 252, 252, 0.5) 30%, rgba(252, 252, 252, 0.8) 70%,rgba(252, 252, 252, 1) 100%)"}}></div>

 

         </div>

 

         <table style={{boder:"0",width:"100%",align:"center",paddingBottom:"0px 0px"}}  cellPadding="0" cellSpacing="0" height="40"><tbody><tr style={{padding: "0px",margin:"0px",border:"none"}}><td></td></tr></tbody>

 

         </table>

 

</div>

)

 

}

 

export default HeaderSection