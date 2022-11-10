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
    //selected Date
    const [dateInfo, setDateInfo] = useState("");

    //useRefs
    const eventID = useRef(0);
    const startTimeRef = useRef("");
    const endTimeRef = useRef("");
    const eventRef = useRef("");
    const eventColor = useRef("");

    const closeTodayModal = () => {
        setTodayModalOpen(false);
    };
    const openTodayModal = () => {
        setTodayModalOpen(true);
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

    // 이벤트(일정) 클릭 시
    const handleEventClick = (info) => {
        console.log(info);
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
                eventDisplay={'block'}
                eventTextColor={'black'}
            />
            <TodayModal
                open={todayModalOpen}
                close={closeTodayModal}
                header={dateInfo}
                eventlist={eventArr}
                setEventArr = {setEventArr}
                eventArr = {eventArr}
            />
        </div>
    );
};

export default Calendar;