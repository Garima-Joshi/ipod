import '../assets/Menu.css';
function Menu(props){
    var{index,activeOption}=props;
    console.log(props.option);
    const divStyling = (index) => {
        if (activeOption === index) {
            return { backgroundColor: "brown" };
        }
        return {};
    };
return(
    <div className='menuOption' style={divStyling(index)}>{props.option}</div>
);

}

export default Menu;