import React,{Component} from 'react';

import chicken_tikka from '../../images/chicken_tikka.jpg'

import clock from '../../images/clock.png'

import like from '../../images/heart.png'

import comment from '../../images/comment.png'

import {Redirect} from 'react-router-dom'

import {Link} from 'react-router-dom'

 

class Recipe extends Component {

 

  

  constructor(props) {

    super(props);

    this.state={

        currentPage:1,

        recipes:[],

        totalCount:0,

        numberPages:0,

        recipesperPage:[]

    }

    this.handleClick = this.handleClick.bind(this);

  }

 

  handleClick(){

    return<Redirect to="/Recipe_Details" name={this.props.name}/>  }

 

render(){

var sam = this.props.recipeDetails

        return (

          

            <div class="col s12 m4">

            <div class="card" >

 

                        <div class="card-image waves-effect waves-block waves-light">

                         <img class="activator" src={this.props.img} width="280px" height="220px"/>

                         </div>

 

                        <div class="card-content">

                        <span class="card-title activator grey-text text-darken-4">{this.props.name}<i class="material-icons right">more_vert</i></span>

                        <span><Link to={{pathname:"/Recipe_Details",recipeprop:{recipeDetails:this.props.recipeDetails}}} >{this.props.name} Full Recipe</Link></span>

                        <table style={{width:"100%",height:"20%"}}>

                            <tbody style={{width: "50%",height:"50px"}}>

                            <tr style={{width:"40%",height:"40",borderBottom:"none"}}>       

                              <td style={{width:"30%",border:"none"}}><img class="activator" src={clock} style={{height:"10%",width:"15%"}}></img><span style={{position: "absolute",left:"58px",height:"55px",bottom:"40px",textAlign:"center"}}>{this.props.Duration}</span></td>

                              <td style={{width:"30%",border:"none"}}><img class="activator" src={like} style={{height:"30%",width:"35%"}}></img><span style={{position: "absolute",bottom:"40px",height:"55px",textAlign:"right"}}>{this.props.likes}</span></td>

                               <td style={{width:"30%",border:"none"}}><img class="activator" src={comment} style={{height:"10%",width:"15%"}}></img><span style={{position: "absolute",height:"55px",right:"100px",textAlign:"center"}}>{this.props.comment}</span></td>

      

                            </tr> </tbody> </table>

                            </div>

                         

                            <div class="card-reveal">

            <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>

            <p>Here is some more information about this product that is only revealed once clicked on.</p>

          </div>





          </div>

 

          </div>




                );

        }

    }




export default Recipe;

