import React, { useRef, useState, useEffect } from "react";
import "../styles/Modal.css";
import "../styles/FollowModal.css";
const FollowModal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, loginUser, saveUser, setSaveUser, isMypage, userData } = props;
    const [list, setList] = useState([]);
    
    const searchRef = useRef("");
    const searchUser = () => {
        if(searchRef.current.value=="") {
            alert("검색어를 입력해주세요");
            return;
        }
        //이름 찾아서 출력시켜주기
        //본인은 제외시키기!!
        const list = saveUser.filter(user=>user.userName.includes(searchRef.current.value)).filter(user=>user.email != loginUser);    
        console.log(list);
        searchRef.current.value="";
        setList(list);
    }

    const followHandler = (user) => {
        console.log("팔로우누름")
        //followings 정보 변경
        const data1 = saveUser.map(it => it.email == loginUser ? { ...it, data : { ...it.data, followings : [...it.data.followings, user.email]} } : it)
        //followers 정보 변경
        const data2 = data1.map(it => it.email == user.email ? { ...it, data : { ...it.data, followers : [...it.data.followers, loginUser]} } : it)
        setSaveUser(data2);
    }

    const followCancelHandler = (user) => {
        console.log("팔로우취소누름")
        //followings 정보 변경
        const data1 = saveUser.map(it => it.email == loginUser ? { ...it, data : { ...it.data, followings : [ ...it.data.followings.filter(it=>it != user.email) ]} } : it)
        //followers 정보 변경
        const data2 = data1.map(it => it.email == user.email ? { ...it, data : { ...it.data, followers : [ ...it.data.followers.filter(it=> it != loginUser)]} } : it)
        setSaveUser(data2);
    }

    const userList = list.map(user => {
        return (
            <div key={user.email} className="user-div">
                <p className = "user-name">{user.userName}</p>
                <p className = "user-email">{user.email}</p>
                {
                    saveUser.find(user=>user.email == loginUser).data.followings.includes(user.email) ?
                    <button className="user-follow-button" style={{backgroundColor : "grey"}}onClick={()=>followCancelHandler(user)}
                    >취소</button>
                 : 
                 <button className="user-follow-button" onClick={()=>followHandler(user)}
                    >팔로우</button>
                 
                }
            </div>
        )})
        
    
    
    //followers에서 email값으로 saveUser에서 찾아서 이름 이메일 찾아줘야함,,
    let followers = (open==true &&isMypage) ? userData.data.followers.map(it=> {
        const email = it;
        const userName = saveUser.find(user=>user.email == it).userName;
        return (
            <div key={email} className="user-div">
                <p className = "user-name">{userName}</p>
                <p className = "user-email">{email}</p>
            </div>
        )
    }) : null;

    let followings =  (open==true && isMypage) ? userData.data.followings.map(it=> {
        const email = it;
        const userName = saveUser.find(user=>user.email == it).userName;
        return (
            <div key={email} className="user-div">
                <p className = "user-name">{userName}</p>
                <p className = "user-email">{email}</p>
            </div>
        )
    }): null;

    useEffect(()=> {
        followers = (open==true &&isMypage) ? userData.data.followers.map(it=> {
            const email = it;
            const userName = saveUser.find(user=>user.email == it).userName;
            return (
                <div key={email} className="user-div">
                    <p className = "user-name">{userName}</p>
                    <p className = "user-email">{email}</p>
                </div>
            )
        }) : null;
        followings =  (open==true && isMypage) ? userData.data.followings.map(it=> {
            const email = it;
            const userName = saveUser.find(user=>user.email == it).userName;
            return (
                <div key={email} className="user-div">
                    <p className = "user-name">{userName}</p>
                    <p className = "user-email">{email}</p>
                </div>
            )
        }): null;

    },[saveUser])


    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={()=>close()}>
                            &times;
                        </button>
                    </header>
                    <main>
                        {isMypage ? null : 
                        <div className = "follow-search">
                            <input type = "text" ref={searchRef}></input>
                            <button className="search-button" onClick={()=>searchUser()}>검색</button>
                        </div>
                        }
                        
                        <div className="follow-userlist">
                            { isMypage ? ( header == "followers" ? followers : followings) : userList}
                        </div>
                    </main>
                    <footer>
                        <button className="close" onClick={()=>close()}>
                            close
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
};

export default FollowModal;
