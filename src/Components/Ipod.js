import React from 'react';
import '../assets/Ipod.css';
import Screen from './Screen';
import ZingTouch from 'zingtouch';
import Wheel from './Wheel';
import { db } from '../index';

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
            subDisplay: false,

            SongList: [],
            currentSong: null,
            PlayingSong:null
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
        this.change = 1;
        this.region.bind(this.wheelController, 'rotate', (e) => {
            console.log("wheel")
            var { distanceFromLast } = e.detail;
            
            this.change++;
            //logic of rotation
            if (this.change === (100/listLength>=25 &&100/listLength<=50?100/listLength:25)) {
                this.change = 1;
                this.setState((prevstate) => {
                    console.log(listLength + " " + prevstate.activeOption);
                    if (distanceFromLast*10>0)
                        return { activeOption: (prevstate.activeOption + 1) % listLength };
                    return{activeOption:(prevstate.activeOption - 1)>=0?(prevstate.activeOption - 1):(listLength-1)}
                }, console.log(this.state))
            }

        });
    }

    //FOR HANDLING 'MENU' BUTTON
    handleMenubtn = () => {
        if (!this.state.menuVisible) {
            this.setState({ menuVisible: true }, () => { console.log("Inside handleMenubtn " + this.state.menuVisible) })
        }
        else if (this.state.currentSong!==null) {
            this.setState({
                currentSong:null,
                SongList:[],
                subDisplay:false
            })
        }
        else if (this.state.optionVisible !== null) {
            this.setState((prevstate) => {
                return { activeOption: prevstate.optionVisible, optionVisible: null }
            })

        }
    }

    //FOR HANDLING SELECT BUTTON
    handleSelectbtn = () => {
        console.log("Select Button");
        if(this.state.PlayingSong!=null)
        {
            console.log("Select btn not valid")
            return;
        }
        else if(this.state.currentSong!==null){
            this.playSong();
        }
        else if (this.state.optionVisible !==null) {
            var displayFunction = Object.values(Object.values(this.state.menu)[this.state.optionVisible])[this.state.activeOption];
            displayFunction();

        }
        else if (this.state.menuVisible && this.state.optionVisible === null) {

            this.setState({ optionVisible: this.state.activeOption })
        }
        

    }
    handlePlayPausebtn = () => { }
    handleForwardbtn = () => {
        console.log("forward btn");
        this.setState((prevstate) => {
            return { currentSong: (prevstate.currentSong + 1) % this.state.SongList.length }
        })
    }
    handleRewindbtn = () => { 
        console.log("rewind btn");
        this.setState((prevstate) => {
            return { currentSong: (prevstate.currentSong - 1)>=0?(prevstate.currentSong - 1):(this.state.SongList.length-1) }
        },()=>{console.log(this.state.currentSong);})
    }
    /*******************/
    showArtist = () => {

    }
    playSong=()=>{
        console.log("play Song");
        this.setState({PlayingSong:this.state.SongList[this.state.currentSong]})
    }

    showSongs = () => {
        console.log("Show  Songs");
        db.collection('Songs').get().then((snapshot) => {
            const SongList = snapshot.docs.map((doc) => {
                const data = doc.data();
                data['id'] = doc.id;
                return data;
            })
            this.setState({
                SongList, subDisplay: true,currentSong:0
            }, () => { console.log(this.state.SongList) })
        })

    }
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
                <Wheel handleMenubtn={this.handleMenubtn} handleWheelRotation={this.handleWheelRotation} handleSelectbtn={this.handleSelectbtn} handleForwardbtn={this.handleForwardbtn} handleRewindbtn={this.handleRewindbtn} />
            </div>
        )
    }
}
export default Ipod;