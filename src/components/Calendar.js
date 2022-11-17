import React, { useEffect, useState, useRef } from "react";

import "../styles/Calendar.css";
import "../styles/Modal.css";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, {Draggable} from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
import timeGridPlugin from "@fullcalendar/timegrid";
import TodayModal from "./TodayModal";
import { format } from "date-fns";
import { Col, Row } from "reactstrap";


const Calendar = () => {
    const [extraEvent, setExtraEvent] = useState();
    const extraEventRef = useRef("");  
    const [extraEventArr, setExtraEventArr] = useState([
    { title: "운동", id: 0, start : `2022-11-06T10:00`, end : `2022-11-06T11:00`, backgroundColor : 'grey', borderColor : 'grey' },
    { title: "알바", id: 1, start : `2022-11-07T10:00`, end : `2022-11-06T11:00`, backgroundColor : 'grey', borderColor : 'grey'},
    { title: "일기쓰기", id: 2, start : `2022-11-08T10:00`, end : `2022-11-06T11:00`, backgroundColor : 'grey', borderColor : 'grey' }
  ])

  const [extraEventID, setExtraEventID] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("extraEventID");
      if (saved !== null) {
        console.log(JSON.parse(saved))
        return JSON.parse(saved);
      } else {
        return parseInt(3);
      }
    }
  });
    
    useEffect(()=> {
      let draggableEl = document.getElementById("external-events");
      new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
        console.log(eventEl);
        const eventObj = {
          title : eventEl.getAttribute("title"),
          id : eventID,
          backgroundColor : eventEl.getAttribute("backgroundColor"),
          borderColor : eventEl.getAttribute("borderColor")
        }  
        console.log(eventObj);
        setExtraEvent(eventObj);

        return {
          title : eventObj.title,
          id : eventObj.id,
          backgroundColor : eventObj.backgroundColor,
          borderColor : eventObj.borderColor
        }

      }
    })
    },[])


    
    //event data
    const [eventArr, setEventArr] = useState(() => {
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem("events");
          if (saved !== null) {
            console.log(JSON.parse(saved))
            return JSON.parse(saved);
          } else {
            return [];
          }
        }
      });
      
    //event drag & drop시 선택도니 event ID 저장
    const [clickedID, setClickedID] = useState();
    //today modal
    const [todayModalOpen, setTodayModalOpen] = useState(false);
    //selected Date
    const [dateInfo, setDateInfo] = useState("");
    // 체크된 아이템을 담을 배열 {dateInfo : 날짜, id : eventID}
    const [checkItems, setCheckItems] = useState(() => {
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem("checkItems");
          if (saved !== null) {
            console.log(JSON.parse(saved))
            return JSON.parse(saved);
          } else {
            return [];
          }
        }
      });
    //진도율 체크
    const [progress, setProgress] = useState(0);
    //ID값 갱신
    const [eventID, setEventID ]= useState(() => {
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem("eventID");
          if (saved !== null) {
            console.log(JSON.parse(saved))
            return JSON.parse(saved);
          } else {
            return parseInt(0);
          }
        }
      });
      
    //정렬 기능
    const [sortSelected, setSortSelected] = useState("");



    const closeTodayModal = () => {
        setTodayModalOpen(false);
    };
    const openTodayModal = () => {
        setTodayModalOpen(true);
    };
    
    //진도율 계산 = 해당 날짜의 체크된 item개수 / 해당 날짜의 모든 event 개수 * 100
    const progressCal = (dateInfo) => {
        const todayEvents = eventArr.filter(event=>event.start.substring(0,10) === dateInfo)
        const todayCheckItems = checkItems.filter(item => item.dateInfo === dateInfo)
        const completed = todayEvents.length == 0 ? 0 : (todayCheckItems.length/todayEvents.length)*100;
        console.log(completed)
        return completed.toFixed(1);
    }

    const handleExtraEventDrop = (info) => {
      console.log(info)
      console.log(extraEvent)

      let date = new Date(`${info.date}`); //info에서 drop된 날짜의 시간정보 가져오기
      const dateInfo = format(date, "YYYY-MM-DD"); //날짜 포맷 바꿔주기
      console.log(dateInfo)

      const newEvent = {...extraEvent, start : `${dateInfo}T10:00`, end : `${dateInfo}T11:00`}
      console.log(newEvent)
      setEventArr([...eventArr, newEvent]);
      setEventID(parseInt(eventID) + 1);

    }

    const handleEventReceive = (info) => {
      console.log(info)
      info.event.remove()
    }

    //날짜 클릭 시
    const handleDateClick = (info) => {
        setDateInfo(info.dateStr); 
        setProgress(progressCal(info.dateStr));
        openTodayModal();
    };

    // 이벤트(일정) 클릭 시
    const handleEventClick = (info) => {
        console.log(`이벤트 클릭`);
        console.log(info)
    };
    // 이벤트(일정) 드래그 시작 시
    const handleEventDragStart = (info) => {
        console.log("event drag start");
        setClickedID(info.event._def.publicId);
    }
    // 드래그 한 이벤트(일정)을 드롭할 시
    const handleEventDrop = (info) => {
        console.log("event drag end");
        console.log(info);
        //const dateInfo = format(info.event._instance.range.start, "YYYY-MM-DD"); //날짜 포맷 바꿔주기
        //setDateInfo(dateInfo);
        //console.log(dateInfo);

        const selectedEvent = eventArr.find(el=>el.id==clickedID) //사용자가 드래그 하고 있는 이벤트 객체를 가져옴
        
        //여기서 9시간을 빼주는 작업을 해줘야함
        let date = new Date(`${info.event._instance.range.start}`); //info에서 drop된 날짜의 시간정보 가져오기
        console.log(`작업해주기 전 date 정보 : ${date}`);
        date.setHours(date.getHours()-9); //9시간 빼주기
        console.log(`작업해준 후 date 정보 : ${date}`);
        const dateInfo = format(date, "YYYY-MM-DD"); //날짜 포맷 바꿔주기
        setDateInfo(dateInfo);
        console.log(`날짜 포맷 바꿔준 뒤 dateInfo : ${dateInfo}`);
        
        //console.log(info.event._instance.range.start);
        //console.log(info);
        
        //event drop된 날짜로 데이터 변경해주기
        const startTime = `${dateInfo}T${selectedEvent.start.substring(11,16)}`;
        const endTime = `${dateInfo}T${selectedEvent.end.substring(11,16)}`;

        const eventObj = {
            ...selectedEvent,
            start: startTime, //날짜정보만 변경하면 되므로 start,end값만 변경
            end: endTime
        };
        //기존 이벤트(일정) 삭제 후 날짜정보 변경된 이벤트 넣기
        const newEventArr = eventArr.filter(event => event.id != selectedEvent.id);
        setEventArr([...newEventArr, eventObj]); 
        
        //체크박스도 같이 관리해줘야할듯...
        //체크박스리스트에서 이동한 이벤트객체 찾아서 dateInfo변경해주기
        checkItems.map(item => {
            if (item.id == clickedID) {
                item.dateInfo = dateInfo; 
            }
        })   
        
    }
    useEffect(()=> {
        localStorage.setItem("events", JSON.stringify(eventArr));
        localStorage.setItem("eventID", JSON.stringify(eventID));
        localStorage.setItem("checkItems", JSON.stringify(checkItems));
        localStorage.setItem("extraEventID", JSON.stringify(extraEventID))
    },[eventArr, eventID, checkItems, extraEventID])

    useEffect(() => {
        const data = localStorage.getItem("events");
        if (data) {
          setEventArr(JSON.parse(data));
        }
        const id = localStorage.getItem("eventID");
        if(id) {
            setEventID(parseInt(id));
        }
        const check_data = localStorage.getItem("checkItems");
        if (check_data) {
          setCheckItems(JSON.parse(check_data));
        }
        const extra_id = localStorage.getItem("extraEventID");
        if(extra_id) {
          setExtraEventID(parseInt(extra_id));
        }
      }, []); 

      const extraEventDelete = (event) => {
          console.log(event);
          const newExtraEventArr = extraEventArr.filter(ex=>ex.id != event.id)
          setExtraEventArr(newExtraEventArr)
      }

      const extraEventAdd = () => {
        if(extraEventRef.current.value == "") {
          alert("일정을 입력하세요")
          return;
        }

        const newTitle = extraEventRef.current.value;
        const eventObj = {
          id: extraEventID,
          title: newTitle,
          start: `2022-11-06T10:00`,
          end: `2022-11-06T11:00`,
          backgroundColor : 'grey',
          borderColor : 'grey'
      };

      setExtraEventArr([...extraEventArr, eventObj]);
      setExtraEventID(parseInt(extraEventID)+1);
      extraEventRef.current.value="";
      }

    return (
        <div className="calendar-contents">
          <Row>
          <Col lg={3} sm={3} md={3}>
          <div
              id="external-events"
              style={{
                padding: "10px",
                width: "80%",
                height: "auto",
                maxHeight: "-webkit-fill-available",
                borderStyle :  'solid'
              }}
            >
              <p align="center">
                <strong>빠른 일정 추가</strong>
              </p>
              <div className ="extra-event-list" style={{rowGap : '20px'}} >
              {extraEventArr.map(event => (
                <div key = {event.id} className="extra-event-obj" style={{display:'grid', gridTemplateColumns: '4fr 1fr'}}>
                  <div className="fc-event" style = {{backgroundColor : 'grey', borderRadius: '5px', margin : '1em 0'}}
                    key={event.id}
                    title={event.title}
                    id={event.id}
                    start={event.start}
                    end={event.end}
                    backgroundcolor={event.backgroundColor}
                    bordercolor={event.borderColor}
                  >
                  {event.title}
                  </div>
                  <button className="close" onClick={()=>extraEventDelete(event)}>x</button>
                  </div>
              ))}
              <textarea style={{width: '100%', height: '3em', resize: 'none'}} ref={extraEventRef}/>
              <button onClick={()=>extraEventAdd()}>추가</button>
              </div>
            </div>
            </Col>

          <Col lg={9} sm={9} md={9}>
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
                droppable={true}
                dayMaxEvents={true}
                eventDragStart={handleEventDragStart}
                eventDrop={handleEventDrop}   
                drop={handleExtraEventDrop}
                eventReceive={handleEventReceive}
                eventDisplay={'block'}
                eventTextColor={'black'}
            />
            <TodayModal
                open={todayModalOpen}
                close={closeTodayModal}
                header={dateInfo}
                setEventArr = {setEventArr}
                eventArr = {eventArr}
                checkItems={checkItems}
                setCheckItems={setCheckItems}
                progress={progress}
                setProgress={setProgress}
                progressCal= {progressCal}
                eventID = {eventID}
                setEventID = {setEventID}
                sortSelected={sortSelected}
                setSortSelected={setSortSelected}
            />
            </Col>
        </Row>
        </div>
    );
};

export default Calendar;