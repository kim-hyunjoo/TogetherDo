import React, { useRef, useState, useEffect } from "react";
import Modal from "./Modal";
import "../styles/Modal.css";

const TodayModal = (props) => {
    
    const { open, close, header, eventlist, setEventArr, eventArr } = props;
    
    const [isYellowPicked , setIsYellowPicked] = useState(false);
    const [isMintPicked , setIsMintPicked] = useState(false);
    const [isPinkPicked , setIsPinkPicked] = useState(false);
    const [defaultData, setDefaultData] = useState({id : 0, title : '', start : '', end : ''});
    // 체크된 아이템을 담을 배열
    const [checkItems, setCheckItems] = useState([]);
    //console.log(`eventButtons함수..${eventlist}`);
    //시간 순서대로 출력해주는 기능 고려해보기
        //edit modal
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

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

    const changeColor = (color) => {
        eventColor.current=`${color}`
        if(color === 'rgb(255, 245, 154)') {
            setIsYellowPicked(true);
            setIsMintPicked(false);
            setIsPinkPicked(false);
        }
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
    }

    const eventClick = (event) => {
        setDefaultData({
            ...defaultData,
            id : event.id, 
            title : event.title,
            start : event.start.substring(11, 16),
            end : event.end.substring(11, 16),
        });
        changeColor(event.backgroundColor)
        setModalOpen(true);
        setEditMode(true);
        
        console.log("event 입니다.", event);
        console.log("defaultData 입니다.", defaultData);
    }

    //수정해서 저장하는거랑 그냥 일정 수가하는거랑 다른 save를 해야함

    //모달 저장 버튼 클릭시 이벤트
    const onSaveEvent = (editMode) => {
        //editMode일때만 여러 컴포넌트가 보임
        const startTime = `${header}T${startTimeRef.current.value}`;
        const endTime = `${header}T${endTimeRef.current.value}`;
        const eventContent = eventRef.current.value;
        const eventId = editMode == true ? defaultData.id : eventID.current;
        const bgColor = eventColor.current;
        const eventObj = {
            id: eventId,
            title: eventContent,
            start: startTime,
            end: endTime,
            backgroundColor : bgColor,
            borderColor : bgColor
        };

        if(editMode == true){
            console.log(`eventArr : ${eventArr}`)
            
            const newEventArr = eventArr.filter((event) => {
                console.log(`selected event id : ${eventId}`)
                console.log(`eventArr id : ${event.id}`)
                return(event.id != eventId)
                });
            console.log(`newEventArr : ${newEventArr}`)
            setEventArr([...newEventArr, eventObj]);
        }
        else {
            setEventArr([...eventArr, eventObj]);
            eventID.current +=1;
            console.log(`uesRef eventid : ${eventID.current}`)
        }
        
    };

    const deleteEvent=(id)=> {
        eventArr.map((event) => console.log(`eventArr의 id : ${event.id}`))
        const newEventArr = eventArr.filter(
            (event) => event.id != id
        );
        console.log(newEventArr);
        setEventArr(newEventArr);
    };
    
     // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
        // 단일 선택 시 체크된 아이템을 배열에 추가
        setCheckItems(prev => [...prev, id]);
        } else {
        // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
        setCheckItems(checkItems.filter((el) => el !== id));
        }
    };
    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if(checked) {
        // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
        const idArray = [];
        eventArr.forEach((el) => idArray.push(el.id));
        setCheckItems(idArray);
        }
        else {
        // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
        setCheckItems([]);
        }
    }


    const eventButtons = eventlist.filter((event)=>
    event.start.substring(0,10) === header).map((event) => {      
        const start = event.start.substring(11,16);
        const end = event.end.substring(11,16);
        return (
            <div className='modal-event-object' key={event.id}>
                <input type="checkbox" key={event.id} onChange={(e) => handleSingleCheck(e.target.checked, event.id)} 
                checked={checkItems.includes(event.id) ? true : false}></input>
                <button style={{backgroundColor : event.backgroundColor}} onClick={()=>eventClick(event)}
                key={event.id}> {`${start}-${end} ${event.title}`}</button>
                <button className='delete-button' key={event.id} onClick={()=>deleteEvent(event.id)}>&times;</button>
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
                        <div className="modal-event-top">
                            <input type='checkbox' name='select-all' onChange={(e) => handleAllCheck(e.target.checked)}
                            // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                            checked={(checkItems.length === eventArr.length && eventArr.filter((event)=>
                                event.start.substring(0,10) === header).length !== 0) ? true : false}/>
                            <label>TODO-LIST</label>
                        </div>
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

            <Modal open={modalOpen} close={closeModal} header={header}>
                <div className="modal-main-div">
                    <div>
                        <span>Color</span>
                    </div>
                    <div className ="modal-color-div">
                        <div
                        onClick={()=>changeColor("rgb(255, 245, 154)")} 
                        className = {isYellowPicked ? "modal-yellow-picked-div" :"modal-yellow-div"}></div>
                        <div 
                        onClick={()=>changeColor("rgb(143, 255, 231)")} 
                        className = {isMintPicked ? "modal-mint-picked-div" :"modal-mint-div"}></div>
                        <div 
                        onClick={()=>changeColor("rgb(255, 185, 208)")} 
                        className = {isPinkPicked ? "modal-pink-picked-div" :"modal-pink-div"}></div>
                    </div>
                    <div>
                        <span>Time</span>
                    </div>
                    <div className="modal-time-div">                      
                        <input type="time" step="300" ref={startTimeRef} defaultValue={editMode ? defaultData.start : null}/>
                        <input type="time" step="300" ref={endTimeRef} defaultValue={editMode ? defaultData.end : null}/>
                    </div>
                    <div>
                        <span>Input</span>
                    </div>
                    <div className="modal-input-div">
                        <textarea ref={eventRef} placeholder="할일을 입력하세요" className="modal-textarea" defaultValue={editMode ? defaultData.title : null} />
                    </div>
                </div>
                <div className="modal-save-div">
                    <button
                        type="button"
                        className="modal-button"
                        onClick={()=>onSaveEvent(editMode)}
                    >
                        {editMode ? "수 정" : "저 장"}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default TodayModal;