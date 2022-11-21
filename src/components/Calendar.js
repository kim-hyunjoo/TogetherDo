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

const Calendar = (props) => {
  //friends에서도 볼려면 
  const { loginUser } = props; //현재 로그인 된 USER의 이메일 정보
  useEffect(()=> {
    const data = JSON.parse(localStorage.getItem("users"));
    //const data = JSON.parse(saved);
    data.map(item => {
      if (item.email == loginUser) {
        console.log(`찾음 : ${item.email}`)
        //추가해줄때, 삭제해줄때,
      }
        
    })
  },[])
  //extra event data
  const [extraEvent, setExtraEvent] = useState(); //현재 extraEvent쪽에서 드래그 하고 있는 extra event 객체
  const [extraEventArr, setExtraEventArr] = useState(() => {//빠른 일정 추가를 위한 extra events 모음
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("extraEventArr");
      if (saved !== null) {
        console.log(JSON.parse(saved))
        return JSON.parse(saved);
      } else {
        return [];
      }
    }
  }) 
  const extraEventRef = useRef(""); //사용자에게 입력받아 extraEventArr에 추가하기 위한 ref
  const [extraEventID, setExtraEventID] = useState(() => { //각 extraEvent에 부여되는 ID값, localStorage에서 불러오기
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("extraEventID");
      if (saved !== null) {
        console.log(JSON.parse(saved))
        return JSON.parse(saved);
      } else {
        return parseInt(0);
      }
    }
  });
    
  //Calendar event data
  const [eventArr, setEventArr] = useState(() => { //localStorage에서 불러오기
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

  //event ID값 갱신
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

  // 체크된 아이템을 담을 배열 {dateInfo : 날짜, id : eventID}
  const [checkItems, setCheckItems] = useState(() => {
    if (typeof window !== "undefined") { //localStorage에서 불러오기
      const saved = localStorage.getItem("checkItems");
      if (saved !== null) {
        console.log(JSON.parse(saved))
        return JSON.parse(saved);
      } else {
        return [];
      }
    }
  });
  
   const [pinnedItems, setPinnedItems] = useState(() => {
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem("pinnedItems");
          if (saved !== null) {
            console.log(JSON.parse(saved))
            return JSON.parse(saved);
          } else {
            return [];
          }
        }
      });
      
  
  const [clickedID, setClickedID] = useState(); //캘린더 내에서 event drag & drop시 선택된 event ID 저장
  const [todayModalOpen, setTodayModalOpen] = useState(false); //today modal
  const [dateInfo, setDateInfo] = useState("");//클릭된 날짜 정보(today Modal로 데이터 전달) 
  const [progress, setProgress] = useState(0); //진도율 체크
  const [sortSelected, setSortSelected] = useState(""); //정렬 기능

  useEffect(()=> { //extra EventArr에 Draggable 속성을 추가해줌
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, { //extra Event 하나를 드래그 해서 캘린더에 넣을 때 발생한다
      itemSelector: ".extra-event-block",
      eventData: function(eventEl) {
        const eventObj = {
          title : eventEl.getAttribute("title"),
          id : eventID,
          backgroundColor : eventEl.getAttribute("backgroundColor"),
          borderColor : eventEl.getAttribute("borderColor")
        }  
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

  //test
  

  useEffect(()=> { //eventArr, eventID, checkItems, extraEventID값 변경 시 localStorage에 업데이트
    localStorage.setItem("events", JSON.stringify(eventArr));
    localStorage.setItem("eventID", JSON.stringify(eventID));
    localStorage.setItem("checkItems", JSON.stringify(checkItems));
    localStorage.setItem("extraEventArr", JSON.stringify(extraEventArr));
    localStorage.setItem("extraEventID", JSON.stringify(extraEventID));
    localStorage.setItem("pinnedItems", JSON.stringify(pinnedItems));

    const test = 
    {email : loginUser, 
    data : 
    { events : eventArr,
      eventID : eventID,
      extraEventArr : extraEventArr ,
      extraEventID : extraEventID,
      checkItems : checkItems,
      pinnedItems : pinnedItems} 
    }
    //test
    localStorage.setItem("test", JSON.stringify(test));
  },[eventArr, eventID, checkItems, extraEventID, extraEventArr, pinnedItems])
      
	 
    
  useEffect(() => { //처음 렌더링 시 localStorage에서 값 불러오기
    const data = localStorage.getItem("events");
    if (data) setEventArr(JSON.parse(data));

    const id = localStorage.getItem("eventID");
    if(id) setEventID(parseInt(id));

    const check_data = localStorage.getItem("checkItems");
    if (check_data) setCheckItems(JSON.parse(check_data));
    
    const extra_arr = localStorage.getItem("extraEventArr");
    if(extra_arr) setExtraEventArr(JSON.parse(extra_arr));

    const extra_id = localStorage.getItem("extraEventID");
    if(extra_id) setExtraEventID(parseInt(extra_id));
    
    const pinned_data = localStorage.getItem("pinnedItems");
    if (pinned_data) setPinnedItems(JSON.parse(pinned_data));
  }, []); 

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
    return completed.toFixed(1);
  }

  //extra Event가 Calendar에 drop 했을 시
  const handleExtraEventDrop = (info) => {
    let date = new Date(`${info.date}`); //extra event가 drop된 날짜 정보 가져오기
    const dateInfo = format(date, "YYYY-MM-DD"); //날짜 포맷 바꿔주기
    const newEvent = {...extraEvent, start : `${dateInfo}`, end : `${dateInfo}`} // 기존 extraEvent 객체에 start, end 속성 부여
    setEventArr([...eventArr, newEvent]); //캘린더 eventArr에 추가
    setEventID(parseInt(eventID) + 1); // eventID 값 갱신
  }

  //extra event가 drop 되면 기존 객체를 삭제. 
  const handleEventReceive = (info) => { //이 작업을 안해줄 시 캘린더에 이벤트가 중복으로 생긴다.
    info.event.remove()
  }
  
  //날짜 클릭 시
  const handleDateClick = (info) => {
    setDateInfo(info.dateStr); 
    setProgress(progressCal(info.dateStr)); //진도율 계산
    openTodayModal(); //today Modal Open
  };

  // 이벤트(일정) 클릭 시
  const handleEventClick = (info) => {
      console.log(`이벤트 클릭`);
      console.log(info)
  };
  // 이벤트(일정) 드래그 시작 시
  const handleEventDragStart = (info) => {
    console.log("event drag start");
    setClickedID(info.event._def.publicId); //드래그 하고 있는 event의 ID 저장
  }
  // 드래그 한 이벤트(일정)을 드롭할 시
  const handleEventDrop = (info) => {
    console.log("event drag end");
    console.log(info);
    const selectedEvent = eventArr.find(el=>el.id==clickedID) //사용자가 드래그 하고 있는 이벤트 객체를 가져옴
    
    //여기서 9시간을 빼주는 작업을 해줘야함
    let date = new Date(`${info.event._instance.range.start}`); //info에서 drop된 날짜의 시간정보 가져오기
    date.setHours(date.getHours()-9); //9시간 빼주기
    const dateInfo = format(date, "YYYY-MM-DD"); //날짜 포맷 바꿔주기
    setDateInfo(dateInfo);
    console.log(`날짜 포맷 바꿔준 뒤 dateInfo : ${dateInfo}`);
    
    //event drop된 날짜로 데이터 변경해주기
    const startTime = selectedEvent.start.length == 10 ? `${dateInfo}`: `${dateInfo}T${selectedEvent.start.substring(11,16)}`; //종일 event일 경우 날짜만 부여
    const endTime = selectedEvent.start.length == 10 ? `${dateInfo}`: `${dateInfo}T${selectedEvent.end.substring(11,16)}`;
    const eventObj = {
      ...selectedEvent,
      start: startTime, //날짜정보만 변경하면 되므로 start,end값만 변경
      end: endTime
    };

    //기존 이벤트(일정) 삭제 후 날짜정보 변경된 이벤트 넣기
    const newEventArr = eventArr.filter(event => event.id != selectedEvent.id);
    setEventArr([...newEventArr, eventObj]); 
    //체크박스리스트에서 이동한 이벤트객체 찾아서 dateInfo변경해주기
    checkItems.map(item => {
      if (item.id == clickedID) {
        item.dateInfo = dateInfo; 
      }
    })         
  }

  //extra Event 삭제
  const extraEventDelete = (event) => {
    console.log(event);
    const newExtraEventArr = extraEventArr.filter(ex=>ex.id != event.id)
    setExtraEventArr(newExtraEventArr)
  }

  //extra Event 추가
  const extraEventAdd = () => {
    if(extraEventRef.current.value == "") {
      alert("일정을 입력하세요")
      return;
    }

     
        const newTitle = extraEventRef.current.value;
        const eventObj = {
          id: extraEventID,
          title: newTitle,
          backgroundColor : 'grey',
          borderColor : 'grey'
      };

    setExtraEventArr([...extraEventArr, eventObj]); //extra EventArr에 추가
    setExtraEventID(parseInt(extraEventID)+1); //extra EventID 갱신
    extraEventRef.current.value="";
  }

  return (
    <div className="calendar-contents">
      <Row>
        <Col lg={3} sm={3} md={3} className = "side-bar">  
          <div id="external-events">
            <p align="center">
              <strong>* 자주 쓰는 일정 *</strong>
            </p>
          <div className ="extra-event-list">
            {extraEventArr.map(event => (
              <div key={event.id} className="extra-event-obj">
                <div className="extra-event-block"
                  key={event.id}
                  title={event.title}
                  id={event.id}
                  backgroundcolor={event.backgroundColor}
                  bordercolor={event.borderColor}
                  onClick={()=>console.log(event.title)}
                >
                {event.title}
              </div>
              <button className="close" onClick={()=>extraEventDelete(event)}>&times;</button>
            </div>
            ))}
            <textarea className="extra-event-input" ref={extraEventRef}/>
            <button className="extra-event-add" onClick={()=>extraEventAdd()}>추가</button>
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
          pinnedItems={pinnedItems}
				  setPinnedItems={setPinnedItems}
        />
      </Col>
    </Row>
  </div>
);}


export default Calendar;