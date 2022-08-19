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
                Settings: this.showSettings,
                Games: this.showGames,
                Home: this.returnHome
            },

            //FOR MENU VISIBLE AND ACTIVE OPTIONS
            menuVisible: false,
            optionVisible: null,
            activeOption: 0,
            subDisplay: false,

            //FOR SONGS
            SongList: null,
            currentSong: null,
            PlayingSong: null,

            //FOR OTHER SUB-OPTION
            otherSubMenuimg: null,
        }
    }
    change = 1;

    /**************************** WHEEL FORWARD BUTTON****************************************/
    //FOR HANDLING WHEEL ROTATION
    handleWheelRotation = () => {
        if(!this.state.menuVisible)
        return;
        this.change = 1;
        this.region.bind(this.wheelController, 'rotate', (e) => {
           // console.log("wheel")
            var listLength = 0;
            if (this.state.optionVisible !== null) {
                listLength = Object.keys(Object.values(this.state.menu)[this.state.optionVisible]).length;
                //console.log("if " + listLength+" "+Object.values(this.state.menu)[this.state.activeOption]);
            }
            else if (this.state.menuVisible) {
                listLength = Object.keys(this.state.menu).length;
                //console.log("else if " + listLength);
            }
            if (listLength === 0)
                return;

            var { distanceFromLast } = e.detail;
            this.change++;

            //logic of rotation
            if (this.change === 30) {
               // console.log("Inside handleWheelRotation")
                this.change = 1;
                this.setState((prevstate) => {
                    //console.log("ListLength " + listLength + " prevstate.activeOption " + prevstate.activeOption);
                    if (distanceFromLast * 10 > 0) {
                        //console.log(" if distanceFromLast pos " + (prevstate.activeOption + 1) % listLength);
                        return { activeOption: (prevstate.activeOption + 1) % listLength };
                    }
                    //console.log(" if distanceFromLast neg " + (prevstate.activeOption - 1) >= 0 ? (prevstate.activeOption - 1) : (listLength - 1))
                    return { activeOption: (prevstate.activeOption - 1) >= 0 ? (prevstate.activeOption - 1) : (listLength - 1) }
                })
            }

        });
    }

    //FOR HANDLING 'MENU' BUTTON
    handleMenubtn = () => {
        if (!this.state.menuVisible) {
            this.setState({ menuVisible: true })
        }
        else if (this.state.PlayingSong !== null) {
            this.setState({
                PlayingSong: null
            })
        }
        else if (this.state.currentSong !== null) {
            this.setState({
                currentSong: null,
                SongList: null,
                subDisplay: false
            })
        }
        else if (this.state.optionVisible !== null) {
            this.setState((prevstate) => {
                var prevoptionVisible = prevstate.optionVisible
                //console.log(" Inside handleMenubtn optionVisible " + prevoptionVisible);
                return {
                    activeOption: prevoptionVisible,
                    optionVisible: null,
                    subDisplay: false
                }
            })

        }
    }

    //FOR HANDLING SELECT BUTTON
    handleSelectbtn = () => {
        console.log("Select Button");
        if (this.state.PlayingSong != null) {
            console.log("Select btn not valid")
            return;
        }
        else if (this.state.currentSong !== null) {
            this.setState({ PlayingSong: this.state.SongList[this.state.currentSong] });
            // this.playSong();
            // playSong = () => {
            //     //console.log("play Song");
            //     this.setState({ PlayingSong: this.state.SongList[this.state.currentSong] });
            // }

        }
        else if (this.state.optionVisible !== null) {
            var displayFunction = Object.values(Object.values(this.state.menu)[this.state.optionVisible])[this.state.activeOption];
            displayFunction();

        }
        else if (this.state.menuVisible && this.state.optionVisible === null) {
            var options = Object.values(this.state.menu)[this.state.activeOption];
            if (typeof options === 'function') {
                options()
            }
            else
                this.setState({ optionVisible: this.state.activeOption })
        }
    }

    //FOR HANDLING 'FORWARD' BUTTON
    handleForwardbtn = () => {
        // console.log("forward btn");
        this.setState((prevstate) => {
            return { currentSong: (prevstate.currentSong + 1) % this.state.SongList.length }
        })
    }

    //FOR HANDLING 'REWIND' BUTTON
    handleRewindbtn = () => {
        //console.log("rewind btn");
        this.setState((prevstate) => {
            return { currentSong: (prevstate.currentSong - 1) >= 0 ? (prevstate.currentSong - 1) : (this.state.SongList.length - 1) }
        }, () => { console.log(this.state.currentSong); })
    }


    /**************************************** FUNCTIONS FOR DIFFERENT OPTIONS ***************************************/
    //FOR ARTST SUB-OPTION
    showArtist = () => {//nothing
    }

    //FOR SETTINGS SUB-OPTION
    showSettings = () => {
        this.setState({ optionVisible: this.state.activeOption, subDisplay: true, otherSubMenuimg: "https://cdn-icons.flaticon.com/png/512/668/premium/668293.png?token=exp=1660926751~hmac=2f4d8003d4b44bb60432561e3ddbc736" })
    }

    //FOR HOME SUB-OPTION
    returnHome = () => {
        //console.log("return home")
        this.setState({
            menu: {
                Music: { Artist: this.showArtist, Songs: this.showSongs },
                Settings: this.showSettings,
                Games: this.showGames,
                Home: this.returnHome
            },
            menuVisible: false,
            optionVisible: null,
            activeOption: 0,
            subDisplay: false,
            SongList: null,
            currentSong: null,
            PlayingSong: null,

            otherSubMenuimg: null,
        })
    }

    //FOR SONG SUB-OPTION
    showSongs = () => {
        //console.log("Show  Songs");
        db.collection('Songs').get().then((snapshot) => {
            const SongList = snapshot.docs.map((doc) => {
                const data = doc.data();
                data['id'] = doc.id;
                return data;
            })

            this.setState({
                SongList, subDisplay: true, currentSong: 0
            })
        })
    }
    //FOR GAMES SUB-OPTION
    showGames = () => {
        this.setState({ optionVisible: this.state.activeOption, subDisplay: true, otherSubMenuimg: "https://cdn-icons-png.flaticon.com/512/3612/3612569.png" })
    }



    /************************************************************************************************************************* */


    componentDidMount() {
        this.wheelController = document.getElementById("wheelRotator");
        this.region = new ZingTouch.Region(this.wheelController);
    }

    render() {
        return (

            <div className="Ipod-body">
                {/* SCREEN DISPLAY */}
                <Screen state={this.state} activeOption={this.state.activeOption} handlePlayPausebtn={this.handlePlayPausebtn} />

                {/*TOUCH WHEEL */}
                <Wheel handleMenubtn={this.handleMenubtn} handleWheelRotation={this.handleWheelRotation} handleSelectbtn={this.handleSelectbtn} handleForwardbtn={this.handleForwardbtn} handleRewindbtn={this.handleRewindbtn} handlePlayPausebtn={this.handlePlayPausebtn} />
            </div>
        )
    }
}
export default Ipod;