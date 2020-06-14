import React from 'react'

 

const Directions = (props)=>{

    return(

    <td width="50%" valign="top" style={{padding:"0px"}}>

    <table border="0" width="100%" cellPadding="10" cellSpacing="0"style={{border:"none"}}>

        <tbody>

            <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                <td>

                <font style={{fontSize:"24px",fontWeight:"bold",position:"relative",right:"-50px"}}>Directions</font><br/>

                  <ul style={{position:"relative"}}>

                      <ol>

 

                      {

                                     props.directionlist.map((data,key)=>(

                                        <li>{data.directions}</li>                               

                                     )

                                       )

                                

                                     }

                  </ol>

                  </ul>

                </td>

            </tr>

        </tbody>

 

    </table>

  </td>

    )

 

}

 

export default Directions

