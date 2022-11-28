import ExtraEvent from "./ExtraEvent";
import GuestBook from "./GuestBook";
import "../styles/SideBar.css"

const SideBar = (props) => {
    const {extraEventArr, setExtraEventArr, extraEventDelete, extraEventID, setExtraEventID,
    loginUser, user, saveUser, setSaveUser
    } = props;

 return(
    <div className="sidebar-container">
        <ExtraEvent 
        extraEventArr = {extraEventArr}
        setExtraEventArr = {setExtraEventArr}
        extraEventDelete={extraEventDelete}
        extraEventID={extraEventID}
        setExtraEventID={setExtraEventID}
        />
        <GuestBook
        loginUser = {loginUser}
        user={user}
        saveUser={saveUser}
        setSaveUser={setSaveUser}
        isSideBar={true}
        />
    </div>
    )
}

export default SideBar;