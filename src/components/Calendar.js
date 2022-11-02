import React, { useEffect, useRef, useState } from "react";
import "../styles/Calendar.css";
import "../styles/Modal.css";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
import timeGridPlugin from "@fullcalendar/timegrid";

import Modal from "./Modal";
import TodayModal from "./TodayModal";


const Calendar = () => {
    //event data
    const [eventArr, setEventArr] = useState([]);
    //today modal
    const [todayModalOpen, setTodayModalOpen] = useState(false);
    //modal open
    const [modalOpen, setModalOpen] = useState(false);

    //selected Date
    const [dateInfo, setDateInfo] = useState("");
    
    const [isYellowPicked , setIsYellowPicked] = useState(false);
    const [isMintPicked , setIsMintPicked] = useState(false);
    const [isPinkPicked , setIsPinkPicked] = useState(false);

    //useRefs
    const eventID = useRef(0);
    const startTimeRef = useRef("");
    const endTimeRef = useRef("");
    const eventRef = useRef("");
    const eventColor = useRef("");
    

    

 //   useEffect(() => {
 //       console.log(`useEffect : ${[eventArr]}`);
 //   }, [eventArr]);

    const closeTodayModal = () => {
        setTodayModalOpen(false);
    };
    const openTodayModal = () => {
        setTodayModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    const openModal = () => {
        setModalOpen(true);
    };



    //날짜 클릭 시
    const handleDateClick = (info) => {
        openTodayModal();
        console.log(info.dateStr);
        setDateInfo(info.dateStr);
    };
    // useEffect(() => {
    //     //dataInfo가 변경된 렌더링에만 실행
    //     if (!!dateInfo) {
    //         //dataInfo가 존재한다면 콘솔 출력
    //         console.log("dateInfo : ", dateInfo);
    //     }
    //     //dispatch()
    // }, [dateInfo]);

    //모달 저장 버튼 클릭시 이벤트
    const onSaveEvent = (e) => {
        const startTime = `${dateInfo}T${startTimeRef.current.value}`;
        const endTime = `${dateInfo}T${endTimeRef.current.value}`;
        const eventContent = eventRef.current.value;
        const eventId = eventID.current;
        const bgColor = eventColor.current;
        const eventObj = {
            id: eventId,
            title: eventContent,
            start: startTime,
            end: endTime,
            backgroundColor : bgColor,
            borderColor : bgColor
        };
        
        eventID.current += 1;
        //calendar.addEvent({eventObj});
        setEventArr([...eventArr, eventObj]);
        console.log(eventID.current);
    };

    // 이벤트(일정) 클릭 시
    const handleEventClick = (info) => {
        console.log(info);
        //삭제함수는 이동했음!
/*
        const id = info.event._def.publicId; ////클릭한 일정 Id
        console.log(`클릭한 일정의 id : ${id}`);
        eventArr.map((event) => console.log(`eventArr의 id : ${event.id}`));
        const newEventArr = eventArr.filter(
            (event) => event.id != info.event._def.publicId
        );
        console.log(newEventArr);
        setEventArr(newEventArr);
        */
    };
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
        <div className="calendar-contents">
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                    momentPlugin,
                    timeGridPlugin,
                ]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: "",
                    center: "prev title next",
                    end: "today",
                }}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                events={eventArr}
                contentHeight={600}
                selectable={true}
                eventDisplay={'block'}
                eventTextColor={'black'}
				
                // select={function (e) {
                //     handleDateClick();
                //     const title = prompt("Event Title:");
                //     if (title) {
                //         this.addEvent({
                //             title: title,
                //             start: e.start,
                //             end: e.end,
                //             allDay: e.allDay,
                //         });
                //     }
                //     this.unselect();
                // }}

                // titleFormat={function (date) {
                //     return `${date.date.year}년 ${date.date.month + 1}월`;
                // }}

                // dayHeaderContent={function (date) {
                //     let weekList = ["일", "월", "화", "수", "목", "금", "토"];
                //     return weekList[date.dow];
                // }}
            />
            <TodayModal
                open={todayModalOpen}
                close={closeTodayModal}
                header={dateInfo}
                eventlist={eventArr}
                openModal={openModal}
                setEventArr = {setEventArr}
                eventArr = {eventArr}
            />

            
            
            <Modal open={modalOpen} close={closeModal} header={dateInfo}>
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
            </Modal>
        </div>
    );
};

export default Calendar;
