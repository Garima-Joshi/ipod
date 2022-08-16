import '../assets/Screen.css';
import Menu from './Menu';
import Song from './Song';
function Screen(props) {

    var { state, activeOption } = props
    return (
        <div className="screen">
            {/************ MAIN MENU ****************/}
            {
                state.menuVisible && state.optionVisible===null && <div className='menu'>
                    <p>ipod js</p>
                    {Object.keys(state.menu).map((option, index) => { return <Menu option={option} key={index} activeOption={activeOption} index={index} /> })}
                </div>
            }

            {/****************OPTION MENU******************/}
            {
                state.optionVisible !== null&& !state.subDisplay && <div className='menu'>
                    <p>{Object.keys(state.menu)[state.optionVisible]}</p>
                    {Object.keys(Object.values(state.menu)[state.optionVisible]).map((option, index) => { console.log(activeOption);return <Menu option={option} key={index} activeOption={activeOption} index={index} /> })}
                </div>
            }

            {/* SONG LIST DISPLAY */}
            {state.subDisplay &&
            <div className='music'>
                <Song music={state.SongList[state.currentSong]} key={state.SongList[state.currentSong].id} />
            </div>}
            {/* {state.subDisplay &&
            <div className='music'>
            {state.SongList.map((option)=>{return <Song music={option} key={option.id} />})}
            </div>
            } */}
        </div>
    );
}

export default Screen;