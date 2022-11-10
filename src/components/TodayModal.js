import React, { useRef, useState, useEffect } from "react";
import Modal from "./Modal";
import "../styles/Modal.css";
import Checkbox from "./CheckBox";

const TodayModal = (props) => {
    
    const { open, close, header, eventlist, setEventArr, eventArr } = props;
    
    const [isYellowPicked , setIsYellowPicked] = useState(false);
    const [isMintPicked , setIsMintPicked] = useState(false);
    const [isPinkPicked , setIsPinkPicked] = useState(false);
    const [defaultData, setDefaultData] = useState([{id : '', title : '', start : '', end : ''}]);

    //console.log(`eventButtons함수..${eventlist}`);
    //시간 순서대로 출력해주는 기능 고려해보기
        //edit modal
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [pickedEventTitle , setPickedEventTitle] = useState("");
    const [pickedEventStart , setPickedEventStart] = useState("");
    const [pickedEventEnd , setPickedEventEnd] = useState("");
    const [pickedEventID, setPickedEventID] = useState(0);

    const startTimeRef = useRef("");
    const endTimeRef = useRef("");
    const eventRef = useRef("");
    //useRefs
    const eventID = useRef(0);
    const eventColor = useRef("");
    
    const openModal = () => {
        setModalOpen(true);
        setEditMode(false);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const eventClick = (event) => {
        setDefaultData({
            id : event.id, 
            title : event.title,
            start : event.start.substring(11, 16),
            end : event.end.substring(11, 16),
        });
        setModalOpen(true);
        setEditMode(true);
        
        console.log("event.id 입니다.", event);
        console.log("defaultData 입니다.", defaultData);
    }
    const buttonClicked = (event) => {
        console.log(event);
        setPickedEventTitle(event.title);
        setPickedEventStart(event.start);
        setPickedEventEnd(event.end);
        setPickedEventID(event.id)
        //openEditModal(); 
    }

    //모달 저장 버튼 클릭시 이벤트
    const onSaveEvent = (e) => {
        const startTime = `${header}T${startTimeRef.current.value}`;
        const endTime = `${header}T${endTimeRef.current.value}`;
        const eventContent = eventRef.current.value;
        const eventId = eventID;
        const bgColor = eventColor.current;
        const eventObj = {
            id: eventId,
            title: eventContent,
            start: startTime,
            end: endTime,
            backgroundColor : bgColor,
            borderColor : bgColor
        };
        const newEventArr = eventArr.filter(
            (event) => event.id != eventId
        );
        eventID.current += 1;
        setEventArr([...newEventArr, eventObj]);
    };

    const deleteEvent=(id)=> {
        eventArr.map((event) => console.log(`eventArr의 id : ${event.id}`))
        const newEventArr = eventArr.filter(
            (event) => event.id != id
        );
        console.log(newEventArr);
        eventID.current += 1;
        setEventArr(newEventArr);
    };


    const eventButtons = eventlist.filter((event)=>
    event.start.substring(0,10) === header).map((event) => {      
        const start = event.start.substring(11,16);
        const end = event.end.substring(11,16);
        return (
            <div className='modal-event-object'>
                <button style={{backgroundColor : event.backgroundColor}} onClick={()=>eventClick(event)}
                key={event.id}> {`${start}-${end} ${event.title}`}</button>
                <button className='delete-button' key={event.id} onClick={()=>deleteEvent(event.id)}>&times;</button>
            </div>
        )
    });
    useEffect(()=> {
        
    },[eventColor.current])

    const colorPicked = (color) => {
        eventColor.current=`${color}`
        if(color === 'rgb(255, 245, 154)') {
            setIsYellowPicked(true);
            setIsMintPicked(false);
            setIsPinkPicked(false);
        }
             //아 어떤 컬러를 픽하느냐에 따라 다를듯 ㅠㅠ
        else if (color === 'rgb(143, 255, 231)') {
            setIsYellowPicked(false);
            setIsMintPicked(true);
            setIsPinkPicked(false);
        }
        else if (color === 'rgb(255, 185, 208)') {
            setIsYellowPicked(false);
            setIsMintPicked(false);
            setIsPinkPicked(true);
        }
        //console.log(`${isYellowPicked}, ${isMintPicked}, ${isPinkPicked}`);

    }

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? "openTodayModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>
                        <div className = "modal-event-list">
                          {eventButtons}
                        </div>
                    </main>
                    <footer>
                        <button className="add-event" onClick={openModal}>
                            일정 추가
                        </button>
                    </footer>
                </section>
            ) : null}

            {editMode == false ? (<Modal open={modalOpen} close={closeModal} header={header}>
                <div className="modal-main-div">
                    <div>
                        <span>Color</span>
                    </div>
                    <div className ="modal-color-div">
                        <div
                        onClick={()=>colorPicked("rgb(255, 245, 154)")} 
                        className = {isYellowPicked ? "modal-yellow-picked-div" :"modal-yellow-div"}></div>
                        <div 
                        onClick={()=>colorPicked("rgb(143, 255, 231)")} 
                        className = {isMintPicked ? "modal-mint-picked-div" :"modal-mint-div"}></div>
                        <div 
                        onClick={()=>colorPicked("rgb(255, 185, 208)")} 
                        className = {isPinkPicked ? "modal-pink-picked-div" :"modal-pink-div"}></div>
                    </div>
                    <div>
                        <span>Time</span>
                    </div>
                    <div className="modal-time-div">
                        <input type="time" step="300" ref={startTimeRef} />
                        <input type="time" step="300" ref={endTimeRef} />
                    </div>
                    <div>
                        <span>Input</span>
                    </div>
                    <div className="modal-input-div">
                        <textarea ref={eventRef} placeholder="할일을 입력하세요" className="modal-textarea" />
                    </div>
                </div>
                <div className="modal-save-div">
                    <button
                        type="button"
                        className="modal-button"
                        onClick={onSaveEvent}
                    >
                        저 장
                    </button>
                </div>
            </Modal>) : (<Modal open={modalOpen} close={closeModal} header={header}>
                <div className="modal-main-div">
                    <div>
                        <span>Color</span>
                    </div>
                    <div className ="modal-color-div">
                        <div
                        onClick={()=>colorPicked("rgb(255, 245, 154)")} 
                        className = {isYellowPicked ? "modal-yellow-picked-div" :"modal-yellow-div"}></div>
                        <div 
                        onClick={()=>colorPicked("rgb(143, 255, 231)")} 
                        className = {isMintPicked ? "modal-mint-picked-div" :"modal-mint-div"}></div>
                        <div 
                        onClick={()=>colorPicked("rgb(255, 185, 208)")} 
                        className = {isPinkPicked ? "modal-pink-picked-div" :"modal-pink-div"}></div>
                    </div>
                    <div>
                        <span>Time</span>
                    </div>
                    <div className="modal-time-div">
                        <input type="time" step="300" ref={startTimeRef} defaultValue = {defaultData.start} />
                        <input type="time" step="300" ref={endTimeRef} defaultValue = {defaultData.end}/>
                    </div>
                    <div>
                        <span>Input</span>
                    </div>
                    <div className="modal-input-div">
                        <textarea ref={eventRef} placeholder="할일을 입력하세요" className="modal-textarea" defaultValue = {defaultData.title}/>
                    </div>
                </div>
                <div className="modal-save-div">
                    <button
                        type="button"
                        className="modal-button"
                        onClick={onSaveEvent}
                    >
                        수 정
                    </button>
                </div>
            </Modal>)}
        </div>
    );
};

export default TodayModal;