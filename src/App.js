import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from './components/slider/slider'
import FileDrop from './components/filedrop/filedrop'

export default class App extends Component {
  constructor(props)
  {
    super(props);
  }
  callback()
  {
    console.log("callback called");
  }
  render()
  {
    return (
      <div className="App">
        <FileDrop settings={{showPreview:true,
                            compoundProgessBar:false,
                            instruction:"Click or Drop files into this box.",
                            callback:this.callback,
                            upload:true,
                            uploadUrl:"http://localhost:80/react-upload-test/fileupload_parser.php",
                            fileFeild:"uploaded"}}
      >
      </FileDrop>
      </div>
    );
  }
  
}
