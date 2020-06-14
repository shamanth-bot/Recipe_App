import React, { Component } from 'react'

import RecipeService from '../api/recipeService'

import moment from 'moment'

class Comments_Section extends Component{

 

    constructor(props){

        super(props);

        this.state={

            comment:'',errmsg:'',Comments:this.props.Comments

        }

        this.ref = React.createRef();

        this._postComment= this._postComment.bind(this)

        this._commentChange = this._commentChange.bind(this)

    }

    _commentChange(event){

        event.preventDefault();

        event.stopPropagation();

       this.setState({comment:event.target.value,errmsg:''})

    }

      async _postComment(event){

        event.preventDefault();

        event.stopPropagation();

        try{

        var response = await RecipeService.postComments(this.props.recipeId,this.props.cusDetails.cusid,this.ref.current.value,this.props.cusDetails.firstName,this.props.cusDetails.profile_photo)

        console.log(response.status)

        if(response.status===201){

            console.log('success')

            this.setState({errmsg:''})

            this.ref.current.value=''

            this.setState(prevState => ({

                Comments: [...prevState.Comments,response.data]

              })) 

          

         

        }

        else{

            this.setState({errmsg:'Unable to post a comment right now due to technical difficulties'});

 

        }

        }

        catch(error){

            this.setState({errmsg:'Unable to post a comment right now due to technical difficulties'});

 

        }

        

       

    }

 

    render(){

        return(

            <table border="0" cellPadding="0" cellSpacing="0" backgroundcolor="#ffffff" style={{border:"1px solid #dddddd",color:"#333333",marginBottom:"20px"}}>

            <tbody>

                <tr >

                    <td align="center" style={{paddingTop:"5px",paddingBottom:"5px",height:"30px",backgroundColor:"#f0f0f0"}}>

                     <div style={{fontSize:"22px",position:"relative",right:"-200px"}}>Comments</div>

                    </td>

                </tr>

              {(this.state.errmsg!=='')&&<tr>                    <td align="center" style={{height:"30px",backgroundColor:"#ffffff"}}>

        <span style={{fontSize:"22px",position:"relative",color:'#ff2800'}}>{this.state.errmsg}</span>

                    </td>

                </tr>}

                <tr>

                    <td align="center" style={{paddingTop:"5px",paddingBottom:"5px",height:"30px"}}>

                     <div style={{fontSize:"12px",position:"relative",right:"-50px"}}>{this.state.Comments.length} Comments</div>

                     <div style={{maxHeight:'220px',overflow:'auto'}}> 

                        <table border='0' cellPadding='0' cellSpacing='0' width='100%' style={{cellPadding:'10',cellSpacing:'10',maxHeight:'100px',overflow:'scroll'}} >

                            <tbody>

                               {this.state.Comments.map( (comment)=>(

 <tr style={{padding: "0px",margin:"0px",border:"none"}}>

 <td style={{width:'5%'}}></td>

 <td style={{width:'10%',verticalAlign:'top'}}>

  <div style={{position:'relative',width:'60px',height:'60px',overflow:'hidden',border:'1px solid #dddddd',backgroundColor:'#ffffff',borderRadius:'5px'}}>

   <img alt='' border='0' src={(comment.profile_Photo!==null&&comment.profile_Photo!=='')?`data:image/jpeg;base64,${comment.profile_Photo}`:'/images/profilePic_male.jpg'} style={{width:'60px',height:'60px',borderRadius:'5px',left:'0px',top:'0px',opacity:'1'}}></img>

  </div>

 </td>

   <td valign='top' style={{verticalAlign:'top'}}>

       <div>

         <span style={{fontSize:'16px',fontWeight:'bold',fontFamily:'verdana'}}>{comment.userName}</span>&nbsp;

                               <span style={{fontSize:'12px',fontWeight:'normal',fontFamily:'verdana',color:'#888888'}}>{(comment.timestamp!==null?moment(comment.timestamp).format('DD/MM/YYYY HH:mm:ss'):'')}</span>

          <br></br>

                               <span style={{fontSize:'16px',fontWeight:'normal',fontFamily:'verdana'}}>{comment.comments}</span>   

       </div>

 </td> 

</tr>

                                 ))}                   

                            </tbody>

                        </table>

                        </div>

                     <div style={{marginBottom:"5px",marginTop:"5px",lineHeight:"40px",color:"#2bb673",textIndent:"50px"}}>

                     <textarea ref={this.ref} id="textarea1" class="materialize-textarea" placeholder="Enter comment" style={{width:"550px"}} onChange={this._commentChange}></textarea>

 

                          </div>

                          <center>

                          <button  disabled={!this.props.user} type='submit' width='50%' name='submit_rating' class='col s6 btn btn-small waves-effect #c62828 red darken-1' style={{position:"relative",right:"20px"}} onClick={this._postComment}>Comment</button>

 

                          </center>

                    </td>

  

                </tr>

            </tbody>

         </table>

 

        )

    }

}

 

export default Comments_Section

