import '../assets/Wheel.css';

function Wheel(props) {
    return (
        <div className='wheel'>
            <div id='wheelRotator' draggable="false"></div>
            <button className='wheel-actions' id="menu" draggable="false">MENU</button>
            <img alt="backward" className='wheel-actions' id="backward" src="https://cdn-icons-png.flaticon.com/512/3/3778.png" draggable="false"></img>
            <button className='wheel-actions' id='select-btn' draggable="false"></button>
            <img alt="forward" className='wheel-actions' id="forward" src="https://cdn-icons-png.flaticon.com/512/1/1824.png" draggable="false"></img>
            <img alt="play-pause" className='wheel-actions' id="play-pause" src="https://cdn-icons-png.flaticon.com/512/7960/7960808.png" draggable="false"></img>


        </div>
    );
}
export default Wheel;