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
    
    //useRefs
    const eventID = useRef(0);
    const startTimeRef = useRef("");
    const endTimeRef = useRef("");
    const eventRef = useRef("");

    

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
        const eventObj = {
            id: eventId,
            title: eventContent,
            start: startTime,
            end: endTime,
        };
        
        eventID.current += 1;
        //calendar.addEvent({eventObj});
        setEventArr([...eventArr, eventObj]);
        console.log(eventID.current);
    };

    // 이벤트(일정) 클릭 시
    const handleEventClick = (info) => {
        console.log(info);

        const id = info.event._def.publicId; ////클릭한 일정 Id
        console.log(`클릭한 일정의 id : ${id}`);
        eventArr.map((event) => console.log(`eventArr의 id : ${event.id}`));
        const newEventArr = eventArr.filter(
            (event) => event.id != info.event._def.publicId
        );
        console.log(newEventArr);
        setEventArr(newEventArr);
    };

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
                        <span>시간 설정</span>
                    </div>
                    <div className="modal-time-div">
                        <input type="time" ref={startTimeRef} />
                        <input type="time" ref={endTimeRef} />
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
        </div>
    );
};

export default Calendar;
