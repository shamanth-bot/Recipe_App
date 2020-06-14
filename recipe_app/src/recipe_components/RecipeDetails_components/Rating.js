import React, { Component } from 'react'

import RegisterService from '../api/recipeService'

import Preloader from '../Dashbord_components/Preloader'

 

class Rating extends Component{

    

    constructor(props){

        super(props);

        this.myRef = React.createRef();

 

        this.state={

            rating_change:false,

            errmsg:'',

            rating_val:0,

          rating_Options :'',

          rating:['Awful','Poor','Fair','Good','Yummy'],

          selected:false,

        selectedRating:0,

        loader:false

 

        }

        

        this._onMouseOver= this._onMouseOver.bind(this)

        this._onMouseout= this._onMouseout.bind(this)

        this._onRatingClick= this._onRatingClick.bind(this)

        this._onsubmit = this._onsubmit.bind(this)

    }

    _onRatingClick(event,i){

        event.preventDefault();

        this.setState({errmsg:''})

        var option = (i===1)?this.state.rating[0]:(i===2)?this.state.rating[1]:(i===3)?this.state.rating[2]:(i===4)?this.state.rating[3]:this.state.rating[4]

        this.setState({selected:!this.state.selected,selectedRating:i,rating_Options:option})

 

    }

    _onMouseOver(event,i){

        event.preventDefault();

        event.stopPropagation();

        if(!this.state.selected){

           var option = (i===1)?this.state.rating[0]:(i===2)?this.state.rating[1]:(i===3)?this.state.rating[2]:(i===4)?this.state.rating[3]:this.state.rating[4]

          this.setState({rating_val:i,rating_Options:option})

        }

        } 

_onMouseout(event){

    event.preventDefault();

    event.stopPropagation();

    if(!this.state.selected){

      this.setState({rating_val:0,rating_Options:''})

 

    }

}

 

async _onsubmit(e){

    e.preventDefault();

    e.stopPropagation();

    if(this.state.rating_val!==0){

 

    try{

        this.setState({loader:true})

let response = await RegisterService.postRatting(this.props.recipeId,this.state.rating_Options,this.state.rating_val)

if(!response.status===201){

 

   this.setState({errmsg:'cant post the Rating right now due to techical difficulties'})

    }

    this.setState({loader:false,rating_val:0,rating_Options:''})

 

    }

    catch(error){

        this.setState({errmsg:'cant post the Rating right now due to techical difficulties',loader:false})

 

    }

 

    }

    else{

        this.setState({errmsg:'select a suitable rating option'})

 

    }

}

 

    render(){

        return(

            <table border="0" cellPadding="0" cellSpacing="0" backgroundcolor="#ffffff" style={{border:"1px solid #dddddd",color:"#333333",marginBottom:"20px"}}>

            <tbody>

                <tr >

                    <td align="center" style={{paddingTop:"5px",paddingBottom:"5px",height:"30px",backgroundColor:"#f0f0f0"}}>

                     <div style={{fontSize:"22px",position:"relative",right:"-50px"}}>Rate this  Recipe</div>

                    </td>

                </tr>

 

                <tr>

                    <td align="center" style={{paddingTop:"5px",paddingBottom:"5px",height:"30px"}}>

                     <div style={{fontSize:"12px",position:"relative",right:"-50px"}}>what do you think of this recipe?</div>

                    {(this.state.errmsg!=='')&& <><center><div  style={{fontSize:'14px',fontFamily:'Roboto,Arial',paddingBottom:'10px',color:'#ff2800'}}>{this.state.errmsg}</div></center></>}

                     {(this.state.loader)&&<center><div class="preloader-wrapper big active">

                               <div class="spinner-layer spinner-blue-only">

                               <div class="circle-clipper left">

                               <div class="circle"></div>

                               </div><div class="gap-patch">

                               <div class="circle"></div>

                               </div><div class="circle-clipper right">

                               <div class="circle"></div>

                              </div>

                              </div>

                              </div>

                              </center>

}

                    {(!this.state.loader)&& <div style={{marginBottom:"5px",marginTop:"5px",lineHeight:"40px",color:"#2bb673",textIndent:"50px"}}>

                     <img alt="rating" ref ={this.myRef} id={1} width="35" src={(this.state.selected&&this.state.rating_val>=1)?"/images/star_gold.png":(!this.state.selected&&this.state.rating_val>=1)?"/images/star_gold.png":'/images/star.png'} onMouseOver={(e)=>{this._onMouseOver(e,1)}} onMouseOut={this._onMouseout}  onClick={(e)=>{this._onRatingClick(e,1)}} style={{cursor:'pointer',pointerEvents:'all'}}></img>

                     <img alt="rating" ref ={this.myRef} id={1} width="35" src={(this.state.rating_val>=2)?"/images/star_gold.png":'/images/star.png'} onMouseOver={(e)=>{this._onMouseOver(e,2)}} onMouseOut={this._onMouseout}  onClick={(e)=>{this._onRatingClick(e,2)}} style={{cursor:'pointer'}}></img>

                     <img alt="rating" ref ={this.myRef} id={1} width="35" src={(this.state.rating_val>=3)?"/images/star_gold.png":'/images/star.png'} onMouseOver={(e)=>{this._onMouseOver(e,3)}} onMouseOut={this._onMouseout} onClick={(e)=>{this._onRatingClick(e,3)}}style={{cursor:'pointer'}}></img>

                     <img alt="rating" ref ={this.myRef} id={1} width="35" src={(this.state.rating_val>=4)?"/images/star_gold.png":'/images/star.png'} onMouseOver={(e)=>{this._onMouseOver(e,4)}} onMouseOut={this._onMouseout} onClick={(e)=>{this._onRatingClick(e,4)}} style={{cursor:'pointer'}}></img>

                     <img alt="rating" ref ={this.myRef} id={1} width="35" src={(this.state.rating_val>=5)?"/images/star_gold.png":'/images/star.png'} onMouseOver={(e)=>{this._onMouseOver(e,5)}} onMouseOut={this._onMouseout} onClick={(e)=>{this._onRatingClick(e,5)}} style={{cursor:'pointer'}}></img>                           

                            

                            <div height={{style:'10px'}} >

                                <center>

                             <span style={{marginRight:'80px',color:'#333333',fontFamily:'roboto,Arial,Helvetica',fontSize:'18px'}}>{this.state.rating_Options===''?'No Rating':this.state.rating_Options}</span>

                             </center>

                            </div>

                         </div>                      

    }

                          <center>

 

                          <button  disabled ={!this.props.user}type='submit' width='50%' name='submit_rating' class='col s6 btn btn-small waves-effect #c62828 red darken-1' style={{position:"relative",right:"20px"}} onClick={this._onsubmit}>Submit Rating</button>

 

                          </center>

                          <br></br>

 

                    </td>

 

                </tr>

            </tbody>

         </table>

 

        )

    }

}

 

export default Rating;

