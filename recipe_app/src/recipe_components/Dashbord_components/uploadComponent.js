import React,{Fragment, Component} from 'react'

 


 

class  uploadComponent extends Component{

    constructor(props) {

        super(props);

 

        this.state={

            imageSource:''

        }

        this._onFileChangeHandler= this._onFileChangeHandler.bind(this)

        this.imageElement = React.createRef() 

    }

 

    _onFileChangeHandler(e){

        e.preventDefault()

        e.stopPropagation()

 

        if(e.target.files.length>0){

          const  file_data = e.target.files[0];

          this.setState({imageSource:file_data})

        }        

 

         }

 

    render(){

        return(

                  

               <div style={{backgroundColor:'#ffffff',width:'60%',height:'80%',borderRadius:'10px',boxShadow:'0px 0px 20px #333333',opacity:'1.0',fontFamily:'Roboto,Arial',position:'fixed',top:'40%',left:'40%',transform:'translate(-40%,-40%)'}}>

                     <center>

                       <div style={{width:'70%'}}>

                         <div style={{height:'3%',cursor:'pointer',right:'5px',position:'absolute'}} onClick={()=>this.props._onclose(false)}>X</div>

                        <span style={{fontSize:'32px',color:'#666666'}}>Update {this.props.type} Photo</span>

                        <div>

        {this.props.errmsg !==''  && <span style={{fontSize:'18px',color:'#ff2800'}}>{this.props.errmsg}</span>}

        {this.props.successmsg!==''   && <span style={{fontSize:'18px',color:'#1b5e20'}}>{this.props.successmsg}</span>}

        </div>

 

                          <table style={{border:0,width:'100%',alignContent:'center',marginTop:'5px',marginBottom:'10px'}} cellSpacing='5' cellSpacing='0' >

                            <tbody>

                            <tr style={{padding: "0px",margin:"0px",border:"none",borderBottom:"none"}}>

                                <td style={{width:'70%'}}>

                                  <div style={{textAlign:'center',fontSize:'16px',color:'#666666'}}>First Browse the photo, then crop the image from preview section and upload the profile Pic.</div>

 

                                </td>

                                <td style={{width:'3%'}}>

                                <div class="file-field input-field" style={{width:'150px',height:'40px',backgroundColor:'#2d96ff',padding:'0px',borderRadius:'8px',textAlign:'center',color:'#ffffff',fontSize:'18px'}}>

  

                              <input type="file"  accept=".png,.jpg,.avi,.tif,.gif" onChange={this._onFileChangeHandler}/>

                                   Browse Photo

                                  </div>

                                 

                                </td>

 

                              </tr>

                            </tbody>

                          </table>

                      <div style={{width:'80%',backgroundColor:'#f0f0f0',borderRadius:'10px',height:'45vh'}} >

                           {!this.props.loading && this.state.imageSource!==''&& <img ref = {this.imageElement} src={URL.createObjectURL(this.state.imageSource)} style={{width:'100%',height:'45vh',borderRadius:'10px'}} alt='source' />}

 

{  this.props.loading&&     

    <div style={{position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>

<div class="preloader-wrapper big active">

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

</div>

 

}

 

                          </div>

    

 

                          <br/>

                           <button type='submit'  name='submit_rating' class='col s6 btn btn-small waves-effect #c62828 red darken-1' style={{width:"200px",borderRadius:"5px",fontSize:'18px',left:'40%'}} onClick={()=>this.props._uploadPhoto(this.state.imageSource,this.props.type)}>Upload Photo</button>

                       </div>

 

                     </center>

 

                 </div>

                 

 

        )

    }

}

 

export default uploadComponent

