import '../assets/Wheel.css';

function Wheel(props) {
    var{handleMenubtn,handleWheelRotation,handleSelectbtn,handleForwardbtn,handleRewindbtn}=props;

    return (
        <div className='wheel'>
            <div id='wheelRotator'
            onMouseDown={()=>{
                handleWheelRotation();
            }}
             draggable="false"></div>
             {/* WHEEL BUTTONS */}
            <button className='wheel-actions' id="menu" onClick={handleMenubtn} draggable="false">MENU</button>
            <img alt="backward" className='wheel-actions' id="backward" onClick={handleRewindbtn} src="https://cdn-icons-png.flaticon.com/512/3/3778.png" draggable="false"></img>
            <button className='wheel-actions' id='select-btn' onClick={handleSelectbtn} draggable="false"></button>
            <img alt="forward" className='wheel-actions' id="forward" onClick={handleForwardbtn} src="https://cdn-icons-png.flaticon.com/512/1/1824.png" draggable="false"></img>
            <img alt="play-pause" className='wheel-actions' id="play-pause" src="https://cdn-icons-png.flaticon.com/512/7960/7960808.png" draggable="false"></img>

        </div>
    );
}
export default Wheel;