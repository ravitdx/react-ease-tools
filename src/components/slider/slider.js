import React, { Component } from 'react';
import './slider.css';
import FontAwesome from 'react-fontawesome'

export default class Slider extends Component {
  constructor(props)
  {
    console.log("sdfhgfjgdjfdgsfgdsjfsdgfjgsdjfhj");
    super(props);
    this.state={
      delay:2500,
      slidesToShow:3,
      slidesToMove:2,
      boardStyle:{
        transition: 'left .5s ease',
        left:0,
        width:0
      },
      transition:'left .5s ease',
      gap:20,
      slides:[],
      slideWidth:500,
      currentSlide:0,
      interval:null,
      children:[],
      currentIndex:0,
      movementTowards:'left',
      windowStyle:{
        minHeight:100
      },
      totalDots:[],
      autoPlay:true,
      infinite:true,
      center:false,
      dots:true,
      arrows:true,
      responsiveWidth:0,
      userDefault:{

      },
      prev:null,
      next:null,
      released:true,
      moveOffset:0,
      initialmovement:0,
      mouseOut:true,
      hideNext:"",
      hidePrev:""
    }
    this.default={
      autoPlay:true,
      movementTowards:'left',
      slidesToShow:3,
      slidesToMove:1,
      delay:2500,
      dots:true,
      arrows:true,
      infinite:true,
      center:false,
      responsive:{},
      arrows:true,
      prev:null,
      next:null

    }
    this.slideRoot = React.createRef();
    this.slideBoard = React.createRef();
    this.children=[];
    this.childrenRefs=[];
    this.released=true;
    this.mouseOut=true;
  }
  getNumberOfSlidesToCreate(state)
  {
      
      var notEqual=true;
      var arr=[];
      var lastStr="";
      var next=0;
      var completeString='';
      while(notEqual)
      {
          var str=""
          for(var i=next;i<next+state.slidesToShow;i++)
          {
            arr.push(i%this.props.children.length);
            
            str+=(i%this.props.children.length);
            completeString+=(i%this.props.children.length);
            
          }
          if(str==lastStr)
          {
            notEqual=false;
          }
          if(next<=0)
          {
            lastStr=str;
          }
          
          next+=state.slidesToMove;
      }
      var len=50000;
      for(var i=0;i<this.props.children.length;i++)
      {
          var item_lenth=completeString.match(new RegExp(""+i, 'gi'));
          len=Math.min(item_lenth.length,len);
      }
      return len-(state.slidesToShow-state.slidesToMove);
  }
  sizeWidget()
  {
    let state=this.state;
    let responsive=this.state.responsive;
    state.autoPlay=state.userDefault.autoPlay;
    state.slidesToMove=state.userDefault.slidesToMove;
    state.slidesToShow=state.userDefault.slidesToShow;
    state.movementTowards=state.userDefault.movementTowards;
    state.infinite=state.userDefault.infinite;
    state.center=state.userDefault.center;
    state.delay=state.userDefault.delay;
    state.speed=state.userDefault.speed;
    state.dots=state.userDefault.dots;
    state.arrows=state.userDefault.arrows;
    state.prev=state.userDefault.prev;
    state.next=state.userDefault.next;
    for (var key in responsive) {
        if(isNaN(key))
        {
          console.error("The responsive object should only contain integers as atributes Ex:  768:{slidesToMove:1}");
        }
        if (responsive.hasOwnProperty(key)) {
            if(window.innerWidth<=parseInt(key))
            {
              
              let obj=responsive[key];
              if(obj.autoPlay!=undefined && obj.autoPlay!=null)
                state.autoPlay=obj.autoPlay;
              else
                state.autoPlay=state.userDefault.autoPlay;
              if(obj.slidesToMove!=undefined && obj.slidesToMove!=null)
                state.slidesToMove=obj.slidesToMove;
              else
                state.slidesToMove=state.userDefault.slidesToMove;
              if(obj.slidesToShow!=undefined && obj.slidesToShow!=null)
                state.slidesToShow=obj.slidesToShow;
              else
                state.slidesToShow=state.userDefault.slidesToShow;
              if(obj.movementTowards!=undefined && obj.movementTowards!=null)
                state.movementTowards=obj.movementTowards;
              else
                state.movementTowards=state.userDefault.movementTowards;
              if(obj.infinite!=undefined && obj.infinite!=null)
                state.infinite=obj.infinite;
              else
                state.infinite=state.userDefault.infinite;
              if(obj.center!=undefined && obj.center!=null)
                state.center=obj.center;
              else
                state.center=state.userDefault.center;
              if(obj.delay!=undefined && obj.delay!=null)
                state.delay=obj.delay;
              else
                state.delay=state.userDefault.delay;
              if(obj.speed!=undefined && obj.speed!=null)
                state.speed=obj.speed;
              else
                state.speed=state.userDefault.speed;
              if(obj.dots!=undefined && obj.dots!=null)
                state.dots=obj.dots;
              else
                state.dots=state.userDefault.dots;
              if(obj.arrows!=undefined && obj.arrows!=null)
                state.arrows=obj.arrows;
              else
                state.arrows=state.userDefault.arrows;
            }
        }
    }
    if(state.slidesToShow>this.props.children.length)
    {
      console.warn("slidesToMove should not be greater than total items");
      state.slidesToShow=this.props.children.length;
    }
    if(state.slidesToMove>state.slidesToShow)
    {
      console.warn("slidesToMove should not be greater than slidesToShow");
      state.slidesToMove=state.slidesToShow;
    }
    clearInterval(this.state.interval);

    state.interval=null;
    var that=this;
    let slideWidth=(this.slideRoot.current.getBoundingClientRect().width)/state.slidesToShow;
    
    

    state.boardStyle={...state.boardStyle,width:40000};
    state.slideWidth=slideWidth;
    if(!this.state.infinite)
    {
        var noOfSides=this.props.children.length;
    }
    else
    { 
        var noOfSides=this.getNumberOfSlidesToCreate(state)*this.props.children.length+this.state.slidesToShow;
    }
    
    state.children=new Array(noOfSides);
    this.childrenRefs=new Array(noOfSides);
    
    for(let i=0;i<noOfSides;i++)
    {
        let obj={...this.props.children[i%this.props.children.length].props.style,width:this.state.slideWidth,minHeight:100,float:"left",position:"relative",display:"inline-block"}
        state.children[i]=React.cloneElement(this.props.children[i%this.props.children.length], {key:i,style:obj,ref:el => that.childrenRefs[i]=el});
    }
    this.setState(state);
    if(that.childrenRefs[that.childrenRefs.length-1])
    {
      let boardWidth=0;
      for(var i=0;i<this.childrenRefs.length;i++)
      {
        boardWidth+=this.childrenRefs[i].getBoundingClientRect().width;
      }
      boardWidth+=100;
      state.boardStyle={...state.boardStyle,width:boardWidth};
      this.setState(state);
    }
    this.setSlide(state);
  }
  componentDidMount(){
    var that=this;
    let state=this.state;
    let obj={...this.default};
    if(this.props.settings)
    {
        obj={...obj,...this.props.settings}
    }
    state.userDefault={...obj};
    state.currentIndex=0;
    state.autoPlay=obj.autoPlay;
    state.slidesToMove=obj.slidesToMove;
    state.slidesToShow=obj.slidesToShow;
    state.movementTowards=obj.movementTowards;
    state.infinite=obj.infinite;
    state.center=obj.center;
    state.responsive=obj.responsive;
    state.delay=obj.delay;
    state.speed=obj.speed;
    state.dots=obj.dots;
    state.arrows=obj.arrows;
    state.prev=obj.prev;
    state.next=obj.next;
    this.setState(state);
    this.sizeWidget();
    if(this.state.infinite)
    {
        for(let i=0;i<this.props.children.length;i++)
        {
          state.totalDots.push({key:i,class:""});
        }
    }
    else
    {
        let totalNoOfDots=Math.ceil((this.props.children.length-(this.state.slidesToShow-this.state.slidesToMove))/(this.state.slidesToShow-(this.state.slidesToShow-this.state.slidesToMove)));
        for(let i=0;i<totalNoOfDots;i++)
        {
          state.totalDots.push({key:i,class:""});
        }
    }
    

    
    state.totalDots[state.currentIndex]={key:state.currentIndex,class:"highlighted"};
   
    this.setState(state);
    if(!state.interval && this.state.autoPlay && this.mouseOut)
    {
      let interval=setInterval(()=>{
        if(this.state.movementTowards=="right")
          this.prevSlide();
        else
          this.nextSlide();
      },this.state.delay);
      this.setState({interval:interval});
    }
    if(this.state.next)
    {
      document.querySelectorAll(this.state.next)[0].addEventListener("click",this.next);
    }
    if(this.state.prev)
    {
      document.querySelectorAll(this.state.prev)[0].addEventListener("click",this.prev);
    }
    window.addEventListener("resize",()=>{this.sizeWidget()});
    
  }
 
  nextSlide()
  {
    let state=this.state;
    var wentIn=0;
    if(state.currentIndex>=(this.state.children.length-this.state.slidesToShow))
    {
      if(this.state.infinite==false)
      {
      }
      else
      {
        state.boardStyle={...state.boardStyle,transition: 'none',left:0};
        state.currentIndex=0;
        this.setSlide(state);
        wentIn=50;
      }
      
    }
    setTimeout(()=>{
      state.boardStyle={...state.boardStyle,transition: 'left .5s ease'};
      state.currentIndex+=this.state.slidesToMove;
      this.setSlide(state);
    },wentIn);
    
    
    
  } 
  prevSlide()
  {
    let state=this.state;
    var wentIn=0;
    if(state.currentIndex<=0)
    {
      if(this.state.infinite==false)
      {
      }
      else
      {
        state.currentIndex=this.state.children.length-this.state.slidesToShow;
        state.boardStyle={...state.boardStyle,transition: 'none',left:-(this.childrenRefs[state.currentIndex].offsetLeft)};
        this.setSlide(state);
        wentIn=50;
      }
    }
    setTimeout(()=>{
      state.boardStyle={...state.boardStyle,transition: 'left .5s ease'};
      state.currentIndex-=this.state.slidesToMove;
      this.setSlide(state);
    },wentIn);
    
  } 
  setSlide(state)
  {
        if(this.childrenRefs[0])
        {
          
          if(state.infinite==false && state.currentIndex<=0)
          {
            state.currentIndex=0;
            state.boardStyle={...state.boardStyle,transition: 'left .5s ease',left:-(this.childrenRefs[state.currentIndex].offsetLeft)};
            state.hidePrev="disabled";
            state.hideNext="";
            clearInterval(this.state.interval);
            state.interval=null;
            this.setState(state);
          }
          else if(state.infinite==false && state.currentIndex>=(state.children.length-state.slidesToShow))
          {
            state.hidePrev="";
            state.hideNext="disabled";
            state.currentIndex=this.state.children.length-this.state.slidesToShow;
            state.boardStyle={...state.boardStyle,transition: 'left .5s ease',left:-(this.childrenRefs[state.currentIndex].offsetLeft)};
            clearInterval(this.state.interval);
            state.interval=null;
            this.setState(state);
          }
          else
          {
            state.hidePrev="";
            state.hideNext="";
            state.boardStyle={...state.boardStyle,left:-(this.childrenRefs[state.currentIndex].offsetLeft)};
          }
          if(this.props.children.length<=this.state.slidesToShow)
          {
            state.hidePrev="disabled";
            state.hideNext="disabled";
          }
          if(state.interval==null && state.autoPlay && this.mouseOut)
          {
            state.interval=setInterval(()=>{
              if(state.movementTowards=="right")
                this.prevSlide();
              else
                this.nextSlide();
            },state.delay);
          }
          for(var h=0;h<state.totalDots.length;h++)
          {
            state.totalDots[h]={key:h,class:""};
          }
          state.totalDots[Math.ceil(state.currentIndex/state.slidesToMove)%this.props.children.length]={key:Math.ceil(state.currentIndex/state.slidesToMove)%this.props.children.length,class:"highlighted"};

          this.setState(state);
        }
        
  }
  getCurrent=(e) =>
  {
      clearInterval(this.state.interval);
      var state=this.state;
      state.interval=null;
      this.setState(state);
      
      state.currentIndex=e.target.getAttribute("dot-key")*this.state.slidesToMove;
      this.setSlide(this.state);
  }
  next=(e) =>
  {
      
      clearInterval(this.state.interval);
      var state=this.state;
      state.interval=null;
      this.nextSlide();
  }
  prev=(e) =>
  {
      clearInterval(this.state.interval);
      var state=this.state;
      state.interval=null;
      this.prevSlide();
  }
  mouseReleased=(e)=>
  {
    
    if(this.released==false)
    {
      this.released=true;
      if(this.state.initialmovement<0)
        this.prevSlide();
      else
        this.nextSlide();
      this.setState({initialmovement:0});
    }
  }
  onMouseEnterHandler=(e)=>{
      clearInterval(this.state.interval);
      var state=this.state;
      state.interval=null;
      this.mouseOut=false;
      this.released=true;
      this.setState(state);
  }
  onMouseLeaveHandler=(e)=>{
    let state=this.state;
      this.mouseOut=true;
      if(this.released==false)
      {
        this.released=true;
        if(this.state.initialmovement<0)
          this.prevSlide();
        else
          this.nextSlide();
        this.setState({initialmovement:0});
      }
      else{
        this.released=true;
        if(!state.interval && this.state.autoPlay)
        {
          let interval=setInterval(()=>{
            if(this.state.movementTowards=="right")
              this.prevSlide();
            else
              this.nextSlide();
          },this.state.delay);
          this.setState({interval:interval});
        }
      }
  }
  dragSlide=(e)=>
  {
    let state=this.state;
    if(this.released==false && this.mouseOut==false)
    {
      let pos=0;
      if(e.touches)
      {
        pos=e.touches[0].clientX;
      }
      else
      {
        pos=e.clientX;
      }
      if(this.state.infinite==true)
      {
        if(state.currentIndex<=0 && (state.moveOffset-pos)<0)
        {
          state.currentIndex=this.state.children.length-this.state.slidesToShow;
          state.boardStyle={...state.boardStyle,transition: 'none',left:-(this.childrenRefs[state.currentIndex].offsetLeft)};
          this.setSlide(state);
        }
        else if(state.currentIndex>=(this.state.children.length-this.state.slidesToShow) && (state.moveOffset-pos)>0)
        {
            state.boardStyle={...state.boardStyle,transition: 'none',left:0};
            state.currentIndex=0;
            this.setSlide(state);
          
        }
      }
      
      
      state.boardStyle={...state.boardStyle,left:state.boardStyle.left-(state.moveOffset-pos),transition: 'none'};
  
      state.initialmovement+=(state.moveOffset-pos);
  
      state.moveOffset=pos;
      this.setState(state);
    }
    
  }
  render()
  {
    return (
      <div className="slider-root" ref={this.slideRoot} onTouchEnd={this.mouseReleased} onMouseUp={this.mouseReleased}
       onMouseMove={this.dragSlide} onTouchMove={this.dragSlide} onMouseEnter={this.onMouseEnterHandler}  onMouseLeave={this.onMouseLeaveHandler} style={this.state.windowStyle}>
          
          <div className="slide-board" ref={this.slideBoard}  onMouseDown={(e)=>{this.mouseOut=false;this.released=false;this.setState({moveOffset:e.clientX,initialmovement:0});}} onTouchStart={(e)=>{this.mouseOut=false;this.released=false;this.setState({moveOffset:e.touches[0].clientX,initialmovement:0});}}  style={this.state.boardStyle}>
              {
                this.state.children
              }
          </div>
          <div className="dots">
              {
                this.state.dots?this.state.totalDots.map((dot)=><div key={dot.key} dot-key={dot.key} className={"dot "+dot.class} onClick={this.getCurrent}></div>):<div/>
              }
          </div>
          {this.state.arrows?<div>{!this.state.prev?<div className={"prev "+this.state.hidePrev} onClick={this.prev}> <FontAwesome className="slider-nav-icon" name="chevron-left" />
          </div>:<div/>}
          {!this.state.next?<div className={"next "+this.state.hideNext} onClick={this.next}><FontAwesome className="slider-nav-icon" name="chevron-right" />
            </div>:<div/>}</div>:<div/>}
          
      </div>
    );
  }
  
}