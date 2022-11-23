
import "../styles/GuestBook.css"
const GuestBook = (props) => {


    return (
    <div className="guest-book">
        <div className="guest-header">
            * Comment *
        </div>
        <div className="guest-main">
            ~ 여러 댓글들 ~
        </div>
        <div className="guest-footer">
            <input type="textarea"></input>
            <button>댓글달기</button>
        </div>
    </div>
    )
}

export default GuestBook;