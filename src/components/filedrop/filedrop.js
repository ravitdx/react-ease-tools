import React, { Component } from 'react';
import './filedrop.css';
import FontAwesome from 'react-fontawesome'

export default class FileDrop extends Component {
  constructor(props)
  {
    super(props);
    this.componentRef = React.createRef();
    this.state={
      instruction:"Click or Drop files into this box.",
      draggedOver:"",
      showPreview:true,
      files:[],
      compoundProgessBar:true,
      fileProgesses:[],
      uploadStarted:false,
      totalProgress:0,
      completed:false,
      callback:null,
      upload:true,
      uploadUrl:null,
      fileFeild:null,
      successMessage:"files uploaded",
      errorMessage:"Encountered a problem uploading files"
    }
    this.default={
      showPreview:true,
      compoundProgessBar:true,
      instruction:"Click or Drop files into this box.",
      callback:null,
      upload:true,
      uploadUrl:null,
      fileFeild:null,
      successMessage:"files uploaded",
      errorMessage:"Encountered a problem uploading files"
    }
  }
  
  componentDidMount(){
    let state=this.state;
    let obj={...this.default};
    if(this.props.settings)
    {
        obj={...obj,...this.props.settings}
    }
    state.showPreview=obj.showPreview;
    state.compoundProgessBar=obj.compoundProgessBar;
    state.instruction=obj.instruction;
    state.callback=obj.callback;
    state.upload=obj.upload;
    state.uploadUrl=obj.uploadUrl;
    state.fileFeild=obj.fileFeild;
    state.successMessage=obj.successMessage;
    state.errorMessage=obj.errorMessage;
    this.setState(state);
    
  }
  holderClicked=(e)=>{
    this.componentRef.current.click();
  }
  fileDropped=(e)=>{
    e.stopPropagation();
    e.preventDefault();
    if(!this.state.uploadStarted)
    { 
      var arr=[];
      for(var i=0;i<e.dataTransfer.files.length;i++)
      {
        var formdata = new FormData();
        formdata.append(this.state.fileFeild, e.dataTransfer.files[i]);
        var ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", this.progressHandler, false);
        ajax.addEventListener("load", this.completeHandler, false);
        ajax.addEventListener("error", this.errorHandler, false);
        ajax.open("POST",this.state.uploadUrl);
        ajax.send(formdata);
        arr.push({file:e.dataTransfer.files[i],xhp_ref:ajax,upload_ref:ajax.upload,completed:false,progress:0});
      }
      this.setState({files:arr,uploadStarted:true});
    }
   
  }
  fileSelected=(e)=>{
    if(!this.state.uploadStarted)
    { 
      var arr=[];
      for(var i=0;i<e.target.files.length;i++)
      {
        var formdata = new FormData();
        formdata.append(this.state.fileFeild, e.target.files[i]);
        var ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", this.progressHandler, false);
        ajax.addEventListener("load", this.completeHandler, false);
        ajax.addEventListener("error", this.errorHandler, false);
        ajax.open("POST", this.state.uploadUrl);
        ajax.send(formdata);
        arr.push({file:e.target.files[i],xhp_ref:ajax,upload_ref:ajax.upload,completed:false,progress:0});
      }
      this.setState({files:arr,uploadStarted:true});
    }
    
    
  }

  
  progressHandler=(event)=> {
    var percent = (event.loaded / event.total) * 100;
    var totalProgress=0;
    var state=this.state;
    for(var i=0;i<state.files.length;i++)
    {
        if(state.files[i].upload_ref==event.currentTarget)
        {
          state.files[i].progress=Math.round(percent);
        }
        totalProgress+=state.files[i].progress;
    }
    state.totalProgress=totalProgress/state.files.length;
    this.setState(state)

  }
  
  completeHandler=(event)=> {
    var completed=true;
    var state=this.state;
    for(var i=0;i<state.files.length;i++)
    {
        if(state.files[i].xhp_ref==event.currentTarget)
        {
          state.files[i].completed=true;
        }
        if(!state.files[i].completed)
        {
          completed=false;
        }
    }
    state.completed=completed;
    if(completed)
    {
      state.uploadStarted=false;
      state.status="success";
      state.message=this.state.successMessage;
    }
    this.setState(state);
    if(completed)
    {
      if(this.props.settings.callback)
      {
        this.props.settings.callback();
      }
        
    }
  }
  
  errorHandler=(event)=> {
    console.log(event);
    this.setState({status:"failed",message:this.state.errorMessage+";"+event.msg,uploadStarted:false,completed:true});
    if(this.props.settings.callback)
    {
      this.props.settings.callback();
    }
  }

  render()
  {
    return (this.state.completed?<div className={"output-"+this.state.status} >{this.state.message}</div>:
      <div className={"drop-container "+this.state.draggedOver} onClick={this.holderClicked} onDrop={this.fileDropped}  onDragLeave={()=>{this.setState({draggedOver:""})}} onDragOver={(e)=>{e.stopPropagation();e.preventDefault();this.setState({draggedOver:"draggedOver"})}}>
        <input type="file" ref={this.componentRef}  style={{opacity:0,display: "none"}} onChange={this.fileSelected}/> 
        {!this.state.uploadStarted && !this.state.completed?<div>{this.state.instruction}</div>:<div/>}
        
          <div>
            {this.state.files.map((file,i)=>{
                var src=window.URL.createObjectURL(file.file);
                if(this.state.compoundProgessBar){
                  return(file.file.type.indexOf("image")>=0 && this.state.showPreview?<img src={src} key={i} style={{width:"20px"}}/>:<span key={i}>{file.file.name+" "}</span>)
                }
                else
                {
                  return(
                      <div key={i} className="">
                        {file.file.type.indexOf("image")>=0 && this.state.showPreview?<img src={src} style={{width:"20px"}}/>:<span>{file.file.name+" "}</span>}
                        <div className="simpleProgressBack">
                            <div className="compoundProgressBar" style={{width:file.progress+"%"}}></div>
                        </div>
                      </div>
                  )
                }

            })}
          </div>
          
          {this.state.compoundProgessBar && this.state.uploadStarted?<div className="compoundProgressBack">
              <div className="compoundProgressBar" style={{width:this.state.totalProgress+"%"}}></div>
          </div>:<div/>}
          
      </div>
    );
  }
  
}