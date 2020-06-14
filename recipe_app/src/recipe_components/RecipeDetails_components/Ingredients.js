import React from 'react'

const Ingredients = (props)=>{

    return(

        <td width="50%" valign="top" style={{padding:"0px"}}>

        <table border="0" width="100%" cellPadding="0" cellSpacing="0" style={{border:"none"}}>

            <tbody>

                <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                    <td>

                    <font style={{fontSize:"24px",fontWeight:"bold",position:"relative",right:"-50px"}}>Ingredients</font><br/>

                      <ul style={{position:"relative",right:"-40px"}}>

                          <ol>{

                                     props.ingredients_list.map((data,key)=>(

                                        <li>{data.ingredients}</li>                               

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

export default Ingredients

