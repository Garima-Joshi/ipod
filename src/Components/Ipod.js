import React from 'react';
import '../assets/Ipod.css';
import Screen from './Screen';
import Wheel from './Wheel';
class Ipod extends React.Component{
constructor(){
    super();
    this.state={
        menu:{
            Music:{Artist:this.showArtist,Songs:this.showSongs},
            Settings:{},
            Games:this.showGames,
            CoverFlow:{}
        },

        menuVisible:false,
        optionVisible:false

    }
}

//****************************************functions****************************************************
  //FOR HANDLING WHEEL ROTATION
  handleWheelRotation = () => {
        console.log("wheel");
  }

  //FOR HANDLING 'MENU' BUTTON
  handleMenubtn = () => {
    if (!this.state.menuVisible) {
      this.setState({ menuVisible:true }, () => { console.log("Inside handleMenubtn "+this.state.menuVisible)})
    }
    else {
      console.log("already opened");
    }

  }

  //FOR HANDLING SELECT BUTTON
  handleSelectbtn=() => {
    console.log("Select Button");
  }
  handlePlayPausebtn = () => { }
  handleForwardbtn = () => { }
  handleRewindbtn = () => { }
  /*******************/
showArtist=()=>{console.log("Show  ARtist")}
showSongst=()=>{console.log("Show  Songs")}
showGames=()=>{console.log("Games")};





render(){
    return(
        <div className="Ipod-body">
            <Screen/>
            <Wheel/>
        </div>
    )
}
}
export default Ipod;