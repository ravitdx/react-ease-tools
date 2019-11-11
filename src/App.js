import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from './components/slider/slider'

export default class App extends Component {
  constructor(props)
  {
    super(props);
  }
  render()
  {
    return (
      <div className="App">
        <div>
            <Slider settings={{
                autoPlay:true,
                transitionTerm:'left',
                slidesToShow:3,
                slidesToMove:3,
                speed:300,
                delay:2500,
                dots:true,
                arrows:true,
                infinite:true,
                center:false,
                responsive:{600:{slidesToShow:2,movementTowards:"right",dots:false,arrows:false}},
                arrows:true,
                prev:"#prev",
                next:"#next"

              }}>
                <div className="singleslide" style={{background:"#fe4556"}}>1</div>
                <div className="singleslide" style={{background:"#ff2056"}}>2</div>
                <div className="singleslide" style={{background:"#fe4878"}}>3</div>
                <div className="singleslide" style={{background:"#344657"}}>4</div>
                <div className="singleslide" style={{background:"#745fea"}}>5</div>
            </Slider>
        </div>
        <div>
            <Slider settings={{
                autoPlay:true,
                transitionTerm:'left',
                slidesToShow:3,
                slidesToMove:3,
                speed:300,
                delay:2500,
                dots:true,
                arrows:true,
                infinite:false,
                center:false,
                arrows:true

              }}>
                <div className="singleslide" style={{background:"#fe4556"}}>1</div>
                <div className="singleslide" style={{background:"#ff2056"}}>2</div>
                <div className="singleslide" style={{background:"#fe4878"}}>3</div>
                <div className="singleslide" style={{background:"#344657"}}>4</div>
                <div className="singleslide" style={{background:"#745fea"}}>5</div>
            </Slider>
        </div>
        <button id="prev">Prev</button>
        <button id="next">Next</button>
      </div>
    );
  }
  
}
