import '../assets/Menu.css';
function Menu(props){
    var{index,activeOption}=props;


    // FUNCTION TO SET BACKGROUND FOR AN ACTIVE OPTION
    const divStyling = (index) => {
        if (activeOption === index) {
            return { backgroundColor: "rgba(18, 244, 199, 0.797)",border:"2px ridge greenyellow" };
        }
        return {};
    };


return(
    <div className='menuOption' style={divStyling(index)}>{props.option}</div>
);
}

export default Menu;