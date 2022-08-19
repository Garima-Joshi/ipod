import "../assets/BottomPlayer.css";
import { useRef, useEffect } from "react";
function BottomPlayer(props) {
    var { music } = props;

    //AUDIO PLAYER REF
    var player = useRef();

    //PLAY_PAUSE BUTTON REF
    var playPause=document.getElementById("play-pause");

    //TRUE IF SONG IS PLAYE ELSE FALSE
    var isPlaying=null;

    //FOR PLAYING AND PAUSING THE SONG ON CLICK
    playPause.addEventListener("click",()=>{
        if(isPlaying)
            {
                player.current.pause();
                isPlaying=false;
            }
        else
        {
            player.current.play();
            isPlaying=true;
        }
    })

    //TO START SONG WHEN RENDERED
    useEffect(() => {
        player.current.play();
        isPlaying=true;
    })
    
    //FOR LOADING TIMINGS OF SONGS
    const onLoadedMetadataHandler = (player) => {
        var songDuration=document.getElementById("songDuration");
        var durationSlider = document.getElementById("durationSlider");
        songDuration.children[2].innerText = (player.target.duration / 60).toFixed(2);

        //STARTS AUTOUPDATION OF CURRENT DURATION OF SONG 
         setInterval(function () {
             songDuration.children[0].innerText = (player.target.currentTime / 60).toFixed(2);
             durationSlider.value = player.target.currentTime * (100 / player.target.duration);
             durationSlider.style.background = `linear-gradient(to right, #03d2fbc6 0%, #03d2fbc6 ${(durationSlider.value-durationSlider.min+1)/(durationSlider.max-durationSlider.min)*100}%, #8eacc0 ${(durationSlider.value-durationSlider.min)/(durationSlider.max-durationSlider.min)*100}%, #8eacc0 100%)`
         }, 1000);
    }


return (
    <footer id="songDuration">
        <span>0:00</span><input type="range" min='0' max="100" value="0" id="durationSlider" /><span>0:00</span>
        <audio id="AudioPlayer" ref={player} onLoadedMetadata={onLoadedMetadataHandler} src={music.audio} type="audio/mpeg" preload="metadata"></audio>
    </footer>
)
}
export default BottomPlayer;