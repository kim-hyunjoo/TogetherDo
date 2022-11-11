import React, { useEffect, useRef, useState } from "react";
import "../styles/Calendar.css";
import "../styles/Modal.css";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
import timeGridPlugin from "@fullcalendar/timegrid";
import TodayModal from "./TodayModal";
import { format } from "date-fns";

   

const Calendar = () => {
    //event data
    const [eventArr, setEventArr] = useState([]);
    const [clickedID, setClickedID] = useState();
    //today modal
    const [todayModalOpen, setTodayModalOpen] = useState(false);
    //selected Date
    const [dateInfo, setDateInfo] = useState("");

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

    // 이벤트(일정) 클릭 시
    const handleEventClick = (info) => {
        console.log("event click");
    };

    const handleEventDragStart = (info) => {
        console.log("event drag start");
        setClickedID(info.event._def.publicId);
    }

    const handleEventDrop = (info) => {
        console.log("event drag end");
        const selectedEvent = eventArr.find(el=>el.id==clickedID)
        const dateInfo = format(info.event._instance.range.end, "YYYY-MM-DD"); // 21-10-11
        //event drop된 날짜로 데이터 변경해주기
        const startTime = `${dateInfo}T${selectedEvent.start.substring(11,16)}`;
        const endTime = `${dateInfo}T${selectedEvent.end.substring(11,16)}`;

        const eventObj = {
            ...selectedEvent,
            start: startTime,
            end: endTime
        };
        
        const newEventArr = eventArr.filter(event => event.id != selectedEvent.id);
        setEventArr([...newEventArr, eventObj]);
        
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
                editable={true}
                eventDragStart={handleEventDragStart}
                eventDrop={handleEventDrop}
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