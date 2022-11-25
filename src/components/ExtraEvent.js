import React, { useRef, useState, useEffect } from "react";
import EventAddModal from "./EventAddModal";
import "../styles/ExtraEvent.css"

const ExtraEvent = (props) => {
    const {extraEventArr, setExtraEventArr, extraEventDelete, extraEventID, setExtraEventID} = props;
    
    const header = "자주 쓰는 일정";
    //색상커스텀 useState
    const [isPinkPicked , setIsPinkPicked] = useState(false);
    const [isPurplePicked , setIsPurplePicked] = useState(false);
    const [isBluePicked , setIsBluePicked] = useState(false);
    const [isGrBluePicked , setIsGrBluePicked] = useState(false);
    const [isGreenPicked , setIsGreenPicked] = useState(false);
    const [isYellowPicked , setIsYellowPicked] = useState(false);
    const [isOrangePicked , setIsOrangePicked] = useState(false);
    const [isGreyPicked , setIsGreyPicked] = useState(false);
    //이벤트 수정할 때 (edit modal) 선택한 이벤트 객체를 저장
    const [defaultData, setDefaultData] = useState({id : 0, title : '', start : '', end : ''});

    //노타임
    const [noTime, setNoTime] = useState(false);

    //수정, 저장 버튼을 한번 눌렀을 시 비활성화하기 위한 useState
    const [disable, setDisable] = useState(false);
    const [noTimeDisable, setNoTimeDisable] = useState(false);
    //modal, edit modal
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    //이벤트 속성 값을 저장하기 위한 useRefs
    const startTimeRef = useRef("");
    const endTimeRef = useRef("");
    const eventRef = useRef("");
    const eventColor = useRef("");

    const openModal = () => {
        setModalOpen(true);
        setEditMode(false);
    };
    const closeModal = () => {
        setModalOpen(false);
        setDisable(false); //저장,수정 버튼 활성화
    };

    //색상커스텀
    const changeColor = (color) => {
        eventColor.current = `${color}`;
        setIsPinkPicked(false);
        setIsPurplePicked(false);
        setIsBluePicked(false);
        setIsGrBluePicked(false);
        setIsGreenPicked(false);
        setIsYellowPicked(false);
        setIsOrangePicked(false);
        setIsGreyPicked(false);

         // 버튼색 : 핑크
        if(color === '#f5c6e1') { setIsPinkPicked(true); }
        else if (color === '#c59bef') { setIsPurplePicked(true); }
        else if (color === '#90b9df'){setIsBluePicked(true); }
        else if (color === '#86e3c6'){setIsGrBluePicked(true); }
        else if (color === '#8cf1a4'){setIsGreenPicked(true); }
        else if (color === '#e6ec8f'){setIsYellowPicked(true); }
        else if (color === '#febd7b'){setIsOrangePicked(true); }
        else if (color === '#BDBDBD'){setIsGreyPicked(true); }
    };

    const noTimeClicked = () => {
      if (noTime === false) {
          setNoTime(true);
          setNoTimeDisable(true);
      } else {
          setNoTime(false);
          setNoTimeDisable(false);
      }
      console.log(noTime);
    }
    //모달 저장or수정 버튼 클릭시 이벤트
    const onSaveEvent = (editMode) => {
      //저장하려고 할 때 startTimeRef, endTimeRef, eventRef 하나라도 비어있을 시 경고창
      //console.log(startTimeRef.current);
      if(noTime == false) {
          if(startTimeRef.current.value == "") {
              alert("시작 시간을 입력하세요")
              return;
          }
          if(endTimeRef.current.value == "") {
              alert("종료 시간을 입력하세요")
              return;
          }
          if(eventRef.current.value == "") {
              alert("일정을 입력하세요")
              return;
          }
      }
      const startTime = noTime ? null : `${startTimeRef.current.value}`;
      const endTime = noTime ? null : `${endTimeRef.current.value}`;
      const eventContent = eventRef.current.value;
      //edit mode의 경우 선택된 이벤트의 ID 그대로 저장, 아닐 경우 새로운 eventID 부여
      const eventId = editMode == true ? defaultData.id : extraEventID;
      const bgColor = eventColor.current;
      const eventObj = {
          id: eventId,
          title: eventContent,
          start: startTime,
          end: endTime,
          backgroundColor: bgColor,
          borderColor: bgColor,
      };

      if (editMode == true) {
          //edit mode일 경우 기존에 선택된 이벤트 객체 삭제 후 저장
          const newEventArr = extraEventArr.filter((event) => event.id != eventId);
          setExtraEventArr([...newEventArr, eventObj]);
      } else {
          setExtraEventArr([...extraEventArr, eventObj]);
          setExtraEventID(parseInt(extraEventID) + 1); //새로 생성되는 이벤트에 부여할 eventID 갱신
      }
      setDisable(true);//수정,저장 버튼 비활성화
      setNoTime(false);
      setNoTimeDisable(false);
  };


    return (
      <>
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
                  startTime={event.start}
                  endTime={event.end}
                  id={event.id}
                  backgroundcolor={event.backgroundColor}
                  bordercolor={event.borderColor}
                  onClick={()=>console.log(event)}
                  style={{backgroundColor : `${event.backgroundColor}`, bordercolor :`${event.borderColor}`}}
                >
                {event.start == null ? `${event.title}`: `${event.start}-${event.end} ${event.title}`}
              </div>
              <button className="close" onClick={()=>extraEventDelete(event)}>&times;</button>
            </div>
            ))}
            <button className="extra-event-add" onClick={()=>openModal()}>추가</button>
          </div>
        </div>
        <EventAddModal 
        open={modalOpen} 
        close={closeModal} 
        header={header}
        changeColor={changeColor}
        isBluePicked={isBluePicked}
        isGrBluePicked={isGrBluePicked}
        isGreenPicked={isGreenPicked}
        isGreyPicked={isGreyPicked}
        isOrangePicked={isOrangePicked}
        isPinkPicked={isPinkPicked}
        isPurplePicked={isPurplePicked}
        isYellowPicked={isYellowPicked}
        startTimeRef={startTimeRef}
        endTimeRef={endTimeRef}
        defaultData={defaultData}
        editMode={editMode}
        noTimeDisable={noTimeDisable}
        noTimeClicked={noTimeClicked}
        eventRef={eventRef}
        onSaveEvent={onSaveEvent}
        disable={disable}
        />
        </>
    )
}

export default ExtraEvent;