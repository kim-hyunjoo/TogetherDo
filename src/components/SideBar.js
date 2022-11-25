import ExtraEvent from "./ExtraEvent";

const SideBar = (props) => {
    const {extraEventArr, setExtraEventArr, extraEventDelete, extraEventID, setExtraEventID} = props;

 return(
    <ExtraEvent 
    extraEventArr = {extraEventArr}
    setExtraEventArr = {setExtraEventArr}
    extraEventDelete={extraEventDelete}
    extraEventID={extraEventID}
    setExtraEventID={setExtraEventID}
    />
    )
}

export default SideBar;