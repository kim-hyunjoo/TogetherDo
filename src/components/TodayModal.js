import React, { useRef, useState, useEffect } from "react";
import Modal from "./Modal";
import "../styles/Modal.css";
import Checkbox from "./CheckBox";

const TodayModal = (props) => {
    
    const { open, close, header, eventlist, openModal, 
        setEventArr, eventArr } = props;

        /*
    console.log(`eventButtons함수..${eventlist}`);
    //시간 순서대로 출력해주는 기능 고려해보기
        //edit modal
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [pickedEventTitle , setPickedEventTitle] = useState("");
    const [pickedEventStart , setPickedEventStart] = useState("");
    const [pickedEventEnd , setPickedEventEnd] = useState("");
    const [pickedEventID, setPickedEventID] = useState(0);

    const startTimeRef = useRef("");
    const endTimeRef = useRef("");
    const eventRef = useRef("");
    //useRefs
    const eventID = useRef(0);
    


    const closeEditModal = () => {
        setEditModalOpen(false);
    };
    const openEditModal = () => {
        //여기서 바로 true가 안되는것같음 ㅇㅇ
        setEditModalOpen(true);
        console.log(editModalOpen);
    };

    const buttonClicked = (event) => {
        console.log(event);
        setPickedEventTitle(event.title);
        setPickedEventStart(event.start);
        setPickedEventEnd(event.end);
        setPickedEventID(event.id)
        openEditModal(); 
    }

    //모달 저장 버튼 클릭시 이벤트
    const onSaveEvent = (e) => {
        const startTime = `${header}T${startTimeRef.current.value}`;
        const endTime = `${header}T${endTimeRef.current.value}`;
        const eventContent = eventRef.current.value;
        const eventId = pickedEventID.current;
        const eventObj = {
            id: eventId,
            title: eventContent,
            start: startTime,
            end: endTime,
        };

        //calendar.addEvent({eventObj});
        //기존꺼 삭제 뒤 다시 추가
        const newEventArr = eventArr.filter(
            (event) => event.id != eventID
        );
        setEventArr([...newEventArr, eventObj]);
    };

*/

/*
    <Modal open={editModalOpen} close={closeEditModal} header={header}>
        <div className="modal-main-div">
            <div>
                <span>시간 설정</span>
            </div>
            <div className="modal-time-div">
                <input type="time" ref={startTimeRef} />
                <input type="time" ref={endTimeRef}/>
            </div>
            <div>
                <span>일정</span>
            </div>
            <div>
                <textarea ref={eventRef} className="modal-textarea" />
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
    </Modal>
*/
    const deleteEvent=(id)=> {
        eventArr.map((event) => console.log(`eventArr의 id : ${event.id}`))
        const newEventArr = eventArr.filter(
            (event) => event.id != id
        );
        console.log(newEventArr);
        setEventArr(newEventArr);
    };
    

    const eventButtons = eventlist.filter((event)=>
    event.start.substring(0,10) === header).map((event) => {
        
        const start = event.start.substring(11,16);
        const end = event.end.substring(11,16);
        return (
            <div className='modal-event-object'>
                <Checkbox key={event.id} text = {`${start}-${end} ${event.title}`}></Checkbox>
                <button className='delete-button' key={event.id} 
                onClick={()=>deleteEvent(event.id)}>&times;</button>
            </div>
        )
    });

    

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
        </div>
    );
};

export default TodayModal;
