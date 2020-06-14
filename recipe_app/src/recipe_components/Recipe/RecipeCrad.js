import React,{Component} from 'react';

import chicken_tikka from '../../images/chicken_tikka.jpg'

import like from '../../images/like.png'

import comment from '../../images/comment.png'

import {Redirect} from 'react-router-dom'

import {Link} from 'react-router-dom'

import time from '../../images/time.png'

import RegisterSerice from '../api/RegisterService'

class RecipeCard extends Component {

 

  

  constructor(props) {

    super(props);

    this.state={

        currentPage:1,

        recipes:[],

        totalCount:0,

        numberPages:0,

        recipesperPage:[],

        cus_Details:{},errmsg:''

    }

    this.handleClick = this.handleClick.bind(this);

  }

 

  async componentDidMount(){

    try{

    let response =await  RegisterSerice.getUserdetailByCusID(this.props.recipeDetails.cusID)

       if(response.status===200){

         this.setState({cus_Details:response.data})

       }

       else{

        this.setState({errmsg:'unable to get recipe reated details due to technical diffiuclty , please try again later'})

 

       }

  }

    catch(error){

      this.setState({errmsg:'unable to get recipe reated details due to technical diffiuclty , please try again later'})

 

    }

  }

  handleClick(){

    return<Redirect to="/Recipe_Details" name={this.props.name}/>  }

 

render(){
        return (
          <>

            <div class=  {(this.props.singleRecipe&&this.props.cardType!=='large')?'col s2 m3 l4 offset-s3 offset-m4 offset-l4':(this.props.cardType==='small')?"col s2 m3 l3":(this.props.val%2!==0)?"col s3 m4 l4 offset-s1 offset-m1 offset-l1":"col s3 m4 l4"} >

              

             <div style={{minHeight:'350px',width:'400px',minHeight:'350px',padding:'0px',border:'1px solid #dddddd',borderRadius:'15px',backgroundColor:'#ffffff',color:'#44444',fontSize:'16px',textAlign:'left',marginBottom:'30px',boxShadow:'0px0px6px #e0e0e0',cursor:'pointer'}}>

                 <div style={{minHeight:'290px',width:'400px',borderBottom:'1px solid #dddddd'}}>

                   <table cellSpacing="5" cellSpacing='0' style={{border:'0',width:'100%',borderTop:'1px solid #eeeeee',fontSize:'12px'}}>

                     <tbody>

                      <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                         <td style= {{width:'60px'}} align='left' valign='middle'>

                           <div style={{position:'relative',width:'50px',height:'50px',border:'0px',backgroundColor:'#ffffff',borderRadius:'50%'}}>

                             <img src={(this.state.cus_Details.profile_photo!==null)?`data:image/jpeg;base64,${this.state.cus_Details.profile_photo}`:(this.state.cus_Details.gender!==null&&this.state.cus_Details.gender!=='')?(this.state.cus_Details.gender.toString().toUpperCase()==='M')?'/images/profilePic_male.jpg':'/images/profile_female.jpg':'/images/profilePic_male.jpg'}  style={{border:'0',width:'50px',height:'50px',borderRadius:'50%',left:'0px',top:'0px',opacity:'1'}}></img>

                           </div>

                         </td>

                         <td align='center' valign='middle' style={{fontSize:'18px'}}>

                        <span style={{fontWeight:'lighter',fontFamily:'verdana',fontSize:'20px',color:"#555555"}}>  {this.state.cus_Details.firstName}</span>

                         </td>

                         <td align='right' valign='middle' style={{fontSize:'18px'}}>

                         <span><Link to={{pathname:`/Recipe_Details/${this.state.cus_Details.firstName}`,state:{ recipe_data:this.props.recipeDetails,customerdetail:this.state.cus_Details,photos_list:this.props.recipeDetails.photos_list,name:this.props.recipeDetails.author,ingredients_list:this.props.recipeDetails.ingredients_list,direction_list:this.props.recipeDetails.directions_list,comments:this.props.recipeDetails.comments_List,user:this.props.user}}} >View</Link></span>

                         </td>

 

                       </tr>

                     </tbody>

                   </table>

                   <div style={{position:'relative',width:'400px',height:'280px',border:'0px',backgroundColor:'#ffffff',marginBottom:'10px',borderRadius:'0px'}}>

                    <div style={{fontSize:'20px',lineHeight:'25px',fontWeight:'normal',width:'100%',height:'auto',zIndex:'10',overflow:'hidden',position:'relative',left:'0px',bottom:'0px',backgroundColor:'rgba(137, 107, 107, 0.5)',verticalAlign:'middle',textAlign:'center',color:'#ffffff',cursor:'pointer',boxSizing:'border-box',MozBoxSizing:'border-box',WebkitBoxSizing:'border-box',padding:'5px 10px 5px 10px'}}>

                   <span style={{fontSize:'24px',fontWeight:'normal',fontStyle:'verdana'}}>{this.props.recipeDetails.recipe_Name} </span>                   </div>

 

                   <img src={(this.props.recipeDetails.profile_Photo!==null)?`data:image/jpeg;base64,${this.props.recipeDetails.profile_Photo}`:'/images/No_Photo.jpg'} style={{width:'400px',height:'280px'}}></img>

 

                   </div>

 

                 

                 </div>  

 

                 <div style={{padding:'0px 10px 10px 10px'}}>

                  <table style={{border:'0',fontSize:'14px',display:'block',width:'380px',minHeight:'80px'}} cellPadding='0' cellSpacing='0'>

                    <tbody>

                      <tr style={{padding: "0px",margin:"0px",border:"none",height:'30px'}}>

                        <td align='left' valign='middle' style={{width:'190px'}}>

                          <table cellPadding='0' cellSpacing='0' style={{width:'100%',marginLeft:'10px'}}>

                            <tbody>

                            <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                                <td align='left'  valign='middle' style={{width:'40px',position:'relative',top:'12px'}}><img style={{width:'30px',height:'30px'}} src={time}></img></td> 

                                <td valign='middle' style={{position:'relative',top:'12px'}} ><span style={{fontSize:'20px',fontWeight:'normal',fontStyle:'verdana'}}>{(this.props.recipeDetails.duration_hrs===null &&this.props.recipeDetails.duration_mts===null)?'N/A':(this.props.recipeDetails.duration_hrs!=null)?this.props.recipeDetails.duration_hrs+' hr' :this.props.recipeDetails.duration_mts+' mts'}</span></td>

                              </tr>

                            </tbody>

                          </table>

                        </td>

                        <td align='right' valign='middle' style={{width:'210px'}}>

                                  <table cellSpacing='0' cellPadding='0' style={{width:'160px'}}>

                                    <tbody>

                                      <tr style={{padding: "0px",margin:"0px",border:"none"}}>

                                      <td align='left' style={{width:'40px',position:'relative',top:'12px'}}><img src={like} style={{width:'30px', height:'30px',position:'relative'}}></img></td>

                                      <td valign='middle' style={{width:'60px',position:'relative',top:'12px'}}><span style={{fontSize:'20px',fontWeight:'normal',fontStyle:'verdana'}}>{0}</span></td>

                                      <td align='left' style={{width:'40px',position:'relative',top:'12px'}}><img src={comment} style={{width:'30px', height:'30px',position:'relative'}}></img></td>

                                      <td valign='middle'style={{position:'relative',top:'12px'}}><span style={{fontSize:'20px',fontWeight:'normal',fontStyle:'verdana'}}>{this.props.recipeDetails.comments_List.length}</span></td>

                                      </tr>

                                    </tbody>

                                  </table>

                        </td>

 

                      </tr>

                    </tbody>

                  </table>

                </div>  

             </div>

 

          </div>

          <div class="col s1">

</div>

           

 

</>

          );
          
        }

    }




export default  RecipeCard;

