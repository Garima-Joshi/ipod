import React from 'react';
import '../assets/Ipod.css';
import Screen from './Screen';
import ZingTouch from 'zingtouch';
import Wheel from './Wheel';
class Ipod extends React.Component {
    constructor() {
        super();
        this.state = {
            menu: {
                Music: { Artist: this.showArtist, Songs: this.showSongs },
                Settings: {},
                Games: this.showGames,
                CoverFlow: {}
            },

            menuVisible: false,
            optionVisible: null,
            activeOption: 0,
            subDisplay:false
        }
    }
    change = 1;
    //****************************************functions****************************************************
    //FOR HANDLING WHEEL ROTATION
    handleWheelRotation = () => {
        var listLength = 0;
        if (this.state.optionVisible !== null)
            listLength = Object.keys(Object.values(this.state.menu)[this.state.activeOption]).length;
        else if (this.state.menuVisible)
            listLength = Object.keys(this.state.menu).length;
        else
            return;
        console.log("btn");
        this.change=1;
        this.region.bind(this.wheelController, 'rotate', () => {
            console.log("wheel")
            this.change++;
            //logic of rotation
            if (this.change === 25) {
                this.change = 1;
                this.setState((prevstate) => { console.log(listLength+" "+ prevstate.activeOption);
                    return { activeOption: (prevstate.activeOption + 1) % listLength};
                },console.log(this.state))
            }

        });
    }

    //FOR HANDLING 'MENU' BUTTON
    handleMenubtn = () => {
        if (!this.state.menuVisible) {
            this.setState({ menuVisible: true }, () => { console.log("Inside handleMenubtn " + this.state.menuVisible) })
        }
        else if (this.state.optionVisible!==null){
            this.setState((prevstate)=>{
                return {activeOption:prevstate.optionVisible,optionVisible:null}})
            
        }
        else if(this.state.subDisplay){
            console.log("backk back");
        }

    }

    //FOR HANDLING SELECT BUTTON
    handleSelectbtn = () => {
        console.log("Select Button");
        if (this.state.menuVisible && this.state.optionVisible === null) {

            this.setState({ optionVisible: this.state.activeOption })
        }
        else if(this.state.optionVisible!=null){
            var displayFunction=Object.values(Object.values(this.state.menu)[this.state.optionVisible])[this.state.activeOption];
            displayFunction();
            
        }

    }
    handlePlayPausebtn = () => { }
    handleForwardbtn = () => { }
    handleRewindbtn = () => { }
    /*******************/
    showArtist = () => { console.log("Show  ARtist") }
    showSongs = () => { console.log("Show  Songs") }
    showGames = () => { console.log("Games") };




    componentDidMount() {
        this.wheelController = document.getElementById("wheelRotator");
        this.region = new ZingTouch.Region(this.wheelController);

    }
    render() {
        return (
            
            <div className="Ipod-body">
                <Screen state={this.state} activeOption={this.state.activeOption} />
                {/* {this.change=0} */}
                <Wheel handleMenubtn={this.handleMenubtn} handleWheelRotation={this.handleWheelRotation} handleSelectbtn={this.handleSelectbtn} />
            </div>
        )
    }
}
export default Ipod;