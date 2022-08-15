import '../assets/Screen.css';
import Menu from './Menu';
function Screen(props) {

    var { state, activeOption } = props
    return (
        <div className="screen">
            {/************ MAIN MENU ****************/}
            {
                state.menuVisible && <div className='menu'>
                    <p>ipod js</p>
                    {Object.keys(state.menu).map((option, index) => { return <Menu option={option} key={index} activeOption={activeOption} index={index} /> })}
                </div>
            }

{console.log("Screen "+activeOption)}
            {/****************OPTION MENU******************/}
            {
                state.optionVisible !== null && <div className='menu'>
                    <p>{Object.keys(state.menu)[state.optionVisible]}</p>
                    {Object.keys(Object.values(state.menu)[state.optionVisible]).map((option, index) => { console.log(activeOption);return <Menu option={option} key={index} activeOption={activeOption} index={index} /> })}
                </div>
            }
        </div>
    );
}

export default Screen;