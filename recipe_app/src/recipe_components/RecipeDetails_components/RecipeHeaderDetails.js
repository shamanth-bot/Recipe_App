import React from 'react'

 

const RecipeHeaderDetails=(props)=>{

  console.log(props.Recipe_data)

  var time =''

  var stars =[]

   var rating_val=[]

   




   let average_val=0

  var hrs = (props.Recipe_data.duration_hrs!==null&&props.Recipe_data.duration_hrs!==''&&props.Recipe_data.duration_hrs)?props.Recipe_data.duration_hrs+'hr':''

  var min = (props.Recipe_data.duration_mts!==null&&props.Recipe_data.duration_mts!==''&&props.Recipe_data.duration_mts)?props.Recipe_data.duration_mts+'min':''

   time = hrs+min

 

   props.Recipe_data.rating_list.map(data=>{

    rating_val.push(data.rating_number)

   })

   if(rating_val.length>0){

   let average = (array) => array.reduce((a, b) => a + b) / array.length;

   average_val= average(rating_val)

   }

 

   console.log("average val"+average_val)

 

   for(var i =1;i<=5;i++){

     stars.push(

      <img  src={(average_val>0)?(i<=average_val)?"/images/star_gold.png":"/images/star.png":"/images/star.png"} style={{width:"35px" ,height:"33px"}}></img>

 

     )

   }

    return(

    <table border="0" width="100%" cellPadding="0" cellSpacing="0" backgroundcolor="#ffffff" height="366px" style={{borderCollapse:"collapse"}}>

    <tbody>




      

    <tr style={{padding: "0px",margin:"0px",border:"none"}}>


      <td width="50%" valign="top" style={{padding:"0px"}}>

          <div style={{border:"0px",width:"550px",height:"366px"}}>

    {(props.Recipe_data.profile_Photo!==null&&props.Recipe_data.profile_Photo!=='')?<img class="activator" src={`data:image/jpeg;base64,${props.Recipe_data.profile_Photo}` } style={{border:"0",width:"550px",height:"366px",left:"0px",top:"-8px",opacity:"1"}}/>  :

    <img class="activator" src='/images/No_Photo.jpg' style={{border:"0",width:"550px",height:"366px",left:"0px",top:"-8px",opacity:"1"}}/>}

    

        </div>

      </td>

      <td width="50%" height="366px"valign="top"  style={{borderLeft:"1px solid #eeeeee",borderTop:"0px",overflow: "hidden",padding:"0px"}}>

           <table  width="100%" cellSpacing="0px" cellPadding="0"   style={{fontSize:"24px",color:"#333333",height:"366px",border:"0px"}}>

               <tbody>

                   <tr height="160">

                   <td width="50%"   valign="middle"style={{borderBottom:"1px solid #eeeeee",textIndent:"60px"}}>  Time      

<div style={{marginTop:"5px",fontSize:"30px",color:"#2bb673",textIndent:"60px"}}>{time}</div>

                     </td>

 

                     <td width="50%" align="center" style={{borderBottom:"1px solid #eeeeee",borderLeft:"1px solid #eeeeee",paddingRight:"10px",textIndent:"60px"}}>Servings

                     <div style={{marginTop:"5px",fontSize:"30px",color:"#2bb673",textIndent:"60px"}}>{(props.Recipe_data.servings!==null&&props.Recipe_data.servings!=='')?props.Recipe_data.servings+ 'Servings':'Depends'}</div>

                     </td>

 

                   </tr>

                   <tr height="160">

 

                   <td width="50%"   valign="middle"style={{textIndent:"60px"}}> Diet Restriction     

                 {  ((!props.Recipe_data.glutenFee||props.Recipe_data.glutenFee===null)&&(!props.Recipe_data.dairyFree||props.Recipe_data.dairyFree===null)&&(!props.Recipe_data.vegan||props.Recipe_data.vegan===null)&&(!props.Recipe_data.nutFree||props.Recipe_data.nutFree==null)) ?<div style={{marginTop:"5px",fontSize:"30px",color:"#aaaaaa",textIndent:"70px"}}>- - -</div>:

                 <div style={{marginTop:"5px",fontSize:"30px",color:"#aaaaaa",textIndent:"70px"}}>

                    { ((props.Recipe_data.glutenFee&&props.Recipe_data.glutenFee!==null) &&<img src="/images/ingredients_safety/gluten_free.png" height="35" title="GLUTEN FREE"  style={{cursor:"pointer"}}></img>)}

                    {((props.Recipe_data.dairyFree&&props.Recipe_data.dairyFree!==null) &&<img src="/images/ingredients_safety/dairy_free.png" height="35"  title="DAIRY FREE" style={{cursor:"pointer"}}></img>)}

                    {((props.Recipe_data.vegan&& props.Recipe_data.vegan!==null) &&<img src="/images/ingredients_safety/Vegan.png" height="35"  title="100% VEGAN" style={{cursor:"pointer"}}></img>)}

                    {((props.Recipe_data.nutFree&&props.Recipe_data.nutFree!==null) &&<img src="/images/ingredients_safety/NUT_free.png" height="35"  title="NUT FREE" style={{cursor:"pointer"}}></img>)}

 

                    

                 </div>

}

                     </td>

 

                     <td width="50%" align="center" style={{borderLeft:"1px solid #eeeeee",paddingRight:"10px",textIndent:"90px"}}>Rating

                       <div style={{marginBottom:"5px",marginTop:"5px",lineHeight:"40px",color:"#2bb673",textIndent:"50px"}}>

                          {stars}

                       </div>

<span style={{fontSize:"22px",color:"#aaaaaa",position:"relative",right:"-90px"}} >{props.Recipe_data.rating_list.length>0?props.Recipe_data.rating_list.length:0} Votes</span>

 

                     </td>

 

                   </tr>

 

               </tbody>

             </table>

           

         

           </td>

 

          </tr>

 

     </tbody>

  </table>

    )

}

 

export default RecipeHeaderDetails

