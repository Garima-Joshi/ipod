import "../assets/Song.css";
import BottomPlayer from './BottomPlayer';

function Song(prop) {
    var { music,active } = prop;
    //STYLES FOR ELEMENTS
    const styles = {
        artist: {
            fontSize: "0.8em",
            textAlign:'center',
        },
        musicOption: {
            backgroundImage: `url(${music.cover})`,
            backgroundSize: '100% 100%',
            backgroundRepeat:'no-repeat',
        },
        name: {
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign:'center',
        },
        album: {
            fontSize: '1.3rem',
            fontWeight: 'bold',
            textAlign:'center',
            marginTop:'-10%',
        }
    }

    
    return (
        <div className={active?"music-option active":"music-option"} style={styles.musicOption} >
            <div id="overlay">
                <p style={styles.name}>{music.name}</p>
                <p style={styles.album}>{music.album}</p>
                <p style={styles.artist}>Artist: {music.artist}</p>
            </div>
            {active && <BottomPlayer music={music} />}
        </div>
        
    )
}

export default Song;