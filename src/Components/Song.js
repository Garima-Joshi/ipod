import "../assets/Song.css"
function Song(prop) {
    var { music } = prop;
    const styles = {
        artist: {
            fontSize: "0.8em",
            textAlign:'center',
        },
        musicOption: {
            backgroundImage: `url(${music.cover})`,
            backgroundSize: 'contain',
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
        <div className="music-option" style={styles.musicOption} >
            <div className="overlay">
                <p style={styles.name}>{music.name}</p>
                <p style={styles.album}>{music.album}</p>
                <p style={styles.artist}>Artist: {music.artist}</p>
            </div>
        </div>
    )
}

export default Song;