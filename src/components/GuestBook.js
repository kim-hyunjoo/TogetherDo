
import { format } from "date-fns";
import {useEffect, useRef, useState} from "react"
import "../styles/GuestBook.css"
const GuestBook = (props) => {
    const {loginUser, user, saveUser, setSaveUser} = props;
    const commentRef = useRef("");
    const [commentArr, setCommentArr] = useState(() => {
        if (typeof window !== "undefined") {
            console.log(user)
          const saved = JSON.parse(localStorage.getItem("users"));
          const data = saved.find(item=>item.email == user);
          console.log(data)
          const arr = data.data.comments;
          if (arr !== null) {  
            return arr;
          } else {
            return [];
          }
        }
      })

      useEffect(()=> {
        const data = saveUser.find(us=>us.email == user);
        const newData = {
         ...data,
         data : {
            ...data.data,
            comments : commentArr
            }
         }
         //기존꺼 삭제후 다시 기입???
         console.log(saveUser)
         const newSaveUser =  saveUser.filter(us=>us.email != user);
         setSaveUser([...newSaveUser,newData]);
         console.log([...newSaveUser,newData])
        localStorage.setItem("users", JSON.stringify(saveUser))
    },[commentArr])

    useEffect(()=>{
        const saved = JSON.parse(localStorage.getItem("users"));
        const userData = saved.find(item=>item.email == user).data;
        //const arr = userData.data.pinnedItems;
        console.log(userData)

        if(userData) {
            setCommentArr(userData.comments);
        }
    },[])

    const onSaveComment = () => {
        const comment = commentRef.current.value;
        if (comment == "") {
            alert("댓글을 작성하세요")
            return;
        }
        const userInfo = saveUser.find(us=>us.email == loginUser);
        const userName = userInfo.userName;
        let today = new Date(); // today 객체에 Date()의 결과를 넣어줬다
        const dateInfo = format(today, "MM/DD HH:mm")
        const data = [{comment, userName, dateInfo}]
        setCommentArr([...commentArr, ...data]);
        commentRef.current.value = "";
    }

    const commentDiv = commentArr.map((comment, i) => {
        
        return (
        <div className="comment-div" key={i}>
            <p className="comment-user">{comment.userName}</p>
            <p className="comment-comment">{comment.comment}</p>
            <p className="comment-date">{comment.dateInfo}</p>
        </div>
        )})

    return (
    <div className="guest-book">
        <div className="guest-header">
            * Comment *
        </div>
        <div className="guest-main">
            {commentArr.length == 0 ? "첫 번째 댓글을 달아주세요" : commentDiv}
        </div>
        <div className="guest-footer">
            <textarea 
            ref={commentRef} 
            placeholder="댓글을 남겨주세요"
            />
            <button
            onClick={()=>onSaveComment()}
            >등록</button>
        </div>
    </div>
    )
}

export default GuestBook;