import React,{Component, Fragment,useState} from 'react'

 

const  MorePhotos =(props)=>{

      return(

 

       (props.Photos.length>0 && <tr style={{padding:"0px",margin:"0px",border:"none"}}>

        <td colSpan="2" >

            <font style ={{fontSize:"22px",position:"relative",right:"-80px"}}>More Photos</font>

            <table border="0"  cellSpacing="0" cellPadding="0" style={{width:"450px",borderCollapse:"collapse",border:"none"}}>

              <tbody>

                  <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                    {

                      props.Photos.map( (Photo)=>(

 

                      

                  <td style={{width:"150",height:"150"}} valign="top" align="left">

                    

       <img src={`data:image/jpeg;base64,${Photo.photo}` } style={{border:0,width:"150px", height:"150px",left:"0px",tops:"0px",opacity:"1",cursor:"pointer",pointerEvents:'all'}} onClick={()=>props.morephotsImg(Photo.photo)} />

   </td>

                      ))           

}

                  </tr>

              </tbody>

            </table>

        </td>

     

      </tr>

      

 

      )

 

      )

     }




export default MorePhotos;

