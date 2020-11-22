import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

function getVals(val,state) {
  var src,msg;
  var ans = [];
  if(state.power){
    if(state.bankVal){
      switch (val) {
        case "q":
          msg = "Heater 1";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3";
          break;
        case "w":
          msg = "Heater 2";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3";
          break;
        case "e":
          msg = "Heater 3";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3";
          break;
        case "a":
          msg = "Heater 4";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3";
          break;
        case "s":
          msg = "Heater 5";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3";
          break;
        case "d":
          msg = "Open HH";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3";
          break;
        case "z":
          msg = "Kick n' Hat";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3";
          break;
        case "x":
          msg = "Kick";
          src = "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3";
          break;
        case "c":
          msg = "Closed HH";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3";
          break;
      }
    }else{
      switch (val) {
        case "q":
          msg = "Chord 1";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3";
          break;
        case "w":
          msg = "Chord 2";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3";
          break;
        case "e":
          msg = "Chord 3";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3";
          break;
        case "a":
          msg = "Shaker";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3";
          break;
        case "s":
          msg = "Open HH";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3";
          break;
        case "d":
          msg = "Closed HH";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3";
          break;
        case "z":
          msg = "Punchy Kick";
          src = "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3";
          break;
        case "x":
          msg = "Side Stick";
          src = "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3";
          break;
        case "c":
          msg = "Snare";
          src = "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3";
          break;
      }
    }
  }
  ans.push(msg);
  ans.push(src);
  if(src !== ""){
    var sound = new Audio(src);
    sound.volume = (state.vol)/100;
    sound.play();
  }
  return ans;
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.displayTxt = this.displayTxt.bind(this);
    this.displayVol = this.displayVol.bind(this);
    this.changeBankVal = this.changeBankVal.bind(this);
    this.changePower = this.changePower.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state ={
      power: false,
      bankVal: true,
      msg: "",
      vol: 50
    }

  }
  componentDidMount() {
    console.log("done adding");
    document.addEventListener('keyDown',(e)=>{
      console.log("pressed key in addEventListener");
      var values = getVals(e.keyCode,this.state);
      this.setState(()=>({
        msg: values[0]
      }));
    })
  }
  displayTxt(event){
    console.log(event.target.value);
    var values = getVals(event.target.value,this.state);
    this.setState(()=>({
      msg: values[0]
    }));

  }
  displayVol(event){
    console.log(event.target.value);
    this.setState(()=>({
      msg: "Volume: "+event.target.value,
      vol: event.target.value
    }));
  }
  changeBankVal(){
    this.setState(state =>({
      bankVal: !state.bankVal
    }));
  }
  changePower(){
    if(this.state.power){
      this.setState(state =>({
        power: !state.power,
        msg: ""
      }));
    }else{
      this.setState(state =>({
        power: !state.power
      }));
    }
  }

  render(){
    return(
      <div className="App">
        <div id="display">
          <div className="keys">
            <div className = "row">
              <button type="button" className= "drum-pad btn btn-default" id="q" value="q" onClick={this.displayTxt}>Q</button>
              <button type="button" className= "drum-pad btn btn-default" id="w" value="w" onClick={this.displayTxt}>W</button>
              <button type="button" className= "drum-pad btn btn-default" id="e" value="e" onClick={this.displayTxt}>E</button>
            </div>
            <div className = "row">
              <button type="button" className= "drum-pad btn btn-default" id="a" value="a" onClick={this.displayTxt}>A</button>
              <button type="button" className= "drum-pad btn btn-default" id="s" value="s" onClick={this.displayTxt}>S</button>
              <button type="button" className= "drum-pad btn btn-default" id="d" value="d" onClick={this.displayTxt}>D</button>
            </div>
            <div className = "row">
              <button type="button" className= "drum-pad btn btn-default" id="z" value="z" onClick={this.displayTxt}>Z</button>
              <button type="button" className= "drum-pad btn btn-default" id="x" value="x" onClick={this.displayTxt}>X</button>
              <button type="button" className= "drum-pad btn btn-default" id="c" value="c" onClick={this.displayTxt}>C</button>
            </div>
          </div>
          <div className="controls">
            <label className="switch">
              <input type= "checkbox" onClick={this.changePower}/>
              <span className="slider" />
              <p className="txt">Power</p>
              </label>
              <div className="display-txt" dangerouslySetInnerHTML={{ __html: this.state.msg}}></div>
              <label>
                <input type="range" min="0" max="100" defaultValue= "50" className="volume" onClick={this.displayVol}/>
              </label>
              <label className="switch">
                <input type= "checkbox" onClick={this.changeBankVal}/>
                <span className="slider" />
                <p className="txt">Bank</p>
              </label>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
