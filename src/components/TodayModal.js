import React, { useRef, useState, useEffect } from "react";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import { solarToLunar } from "../module/LunarCalendar";
import "../styles/Modal.css";

const TodayModal = (props) => {
    const { open, close, header, setEventArr, eventArr, checkItems, setCheckItems, 
        progress, setProgress, eventID, setEventID, sortSelected, setSortSelected,
        pinnedItems,setPinnedItems, isFriends} = props;
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

    useEffect(() => {
        console.log("렌더링 됐습니다.");
    }, [progress]);

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

    //이벤트를 수정하기 위해 모달 내에서 이벤트를 클릭했을 때 실행
    const eventClick = (event) => {
        //선택한 이벤트를 useState에 저장
        setDefaultData({
            ...defaultData,
            id: event.id,
            title: event.title,
            start: event.start.substring(11, 16),
            end: event.end.substring(11, 16),
        });
        //color정보는 따로 저장
        changeColor(event.backgroundColor);
        setModalOpen(true);
        //Edit Modal 열기
        setEditMode(true);

        console.log("event 입니다.", event);
        console.log("defaultData 입니다.", defaultData);

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
/*
    useEffect(()=>{
        startTimeRef.current = "";
        endTimeRef.current = "";
        eventRef.current = "";
    }, [disable])
*/
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
        const startTime = noTime ? `${header}` : `${header}T${startTimeRef.current.value}`;
        const endTime = noTime ? `${header}` : `${header}T${endTimeRef.current.value}`;
        const eventContent = eventRef.current.value;
        //edit mode의 경우 선택된 이벤트의 ID 그대로 저장, 아닐 경우 새로운 eventID 부여
        const eventId = editMode == true ? defaultData.id : eventID;
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
            const newEventArr = eventArr.filter((event) => event.id != eventId);
            setEventArr([...newEventArr, eventObj]);
        } else {
            setEventArr([...eventArr, eventObj]);
            setEventID(parseInt(eventID) + 1); //새로 생성되는 이벤트에 부여할 eventID 갱신
        }
        setDisable(true);//수정,저장 버튼 비활성화
        setNoTime(false);
        setNoTimeDisable(false);
    };

    //이벤트 삭제
    const deleteEvent = (id) => {
        const newEventArr = eventArr.filter((event) => event.id != id); //id를 이용하여 삭제
        setEventArr(newEventArr);
        const newCheckItems = checkItems.filter((item) => item.id != id);
        setCheckItems(newCheckItems);
    };


    //중요 이벤트 설정
    const handlePin = (id) => {
        console.log("handlePin");

        console.log(pinnedItems);
        if (pinnedItems.filter((el) => el.id == id).length == 0) {
            setPinnedItems((prev) => [...prev, { dateInfo: header, id: id }]);
        } else {
            setPinnedItems(pinnedItems.filter((el) => el.id != id));
        }
    };

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        console.log(checkItems);
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems((prev) => [...prev, { dateInfo: header, id: id }]);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el.id != id));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        const idArray = [];
        if (checked) {
            // 전체 선택 클릭 시 해당 날짜(dateInfo) 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
            const newEventArr = eventArr.filter(
                (event) => event.start.substring(0, 10) == header
            ); //오늘날짜인것들만..
            console.log(newEventArr);
            newEventArr.forEach((el) =>
                idArray.push({ dateInfo: header, id: el.id })
            );
            console.log(idArray);
            setCheckItems([...idArray]);
        } else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            // 전체 선택 해제시 그날의 dateInfo에 해당하는 값 제거
            const newCheckItems = checkItems.filter(
                (el) => el.dateInfo != header
            );
            setCheckItems(newCheckItems);
        }
    };

    useEffect(()=> {
        const todayEvents = eventArr.filter(event=>event.start.substring(0,10) === header)
        const todayCheckItems = checkItems.filter(item => item.dateInfo === header)
        const completed = todayEvents.length == 0 ? 0 : (todayCheckItems.length/todayEvents.length)*100;
        setProgress(completed.toFixed(1))
        console.log(`오늘의 일정 개수 : ${todayEvents.length}, 오늘의 체크된 개수 : ${todayCheckItems.length}`)
    }, [checkItems, eventArr])

    const todayEventArr = eventArr.filter(event => event.start.substring(0, 10) === header);

    //날짜 클릭 시 해당 날짜의 일정 목록을 checkbox 및 button을 이용하여 todo-list 구현
    
    const eventButtons = todayEventArr.length == 0 ? "일정이 없습니다." : todayEventArr.map((event) => {
                  const start = event.start.substring(11, 16); //시간정보만 가져오기
                  const end = event.end.substring(11, 16); //시간정보만 가져오기
                  return (
                      <div className="modal-event-object" key={event.id}>
                          {/* 체크박스, css효과를 주기 위해 label로 감쌈 */}
                          <label className="checkbox_container">
                              <input type="checkbox" onChange={(e) => handleSingleCheck(e.target.checked, event.id)}
                                  checked={checkItems.map((item) => item.id).includes(event.id) ? true : false}
                                  disabled={isFriends ? true : false}
                              ></input>
                          </label>
                          {/* 이벤트 제목 */}
                          <button className="event-button" style={{ backgroundColor: event.backgroundColor }} 
                          onClick={() => eventClick(event)} disabled={isFriends ? true : false}
                          key={event.id}>{(start=="") ? `${event.title}` : `${start}-${end} ${event.title}`}</button>
                          {/* 삭제버튼 */}
                          <button className='delete-button' onClick={()=>deleteEvent(event.id)}
                          disabled={isFriends ? true : false}
                          >&times;</button>
                          <button style={{backgroundColor : "white" , width : "40px", height : "40px"}} 
                          onClick={() => handlePin(event.id)}
                              disabled={isFriends ? true : false}>
                          <img alt="pin"
                              id={`pin-${event.id}`}
                              src={
                                  pinnedItems
                                      .map((item) => item.id)
                                      .includes(event.id)
                                      ? "images/pin.png"
                                      : "images/pin_black.png"
                              }
                              width="40px"
                              height="40px"
                              
                          />
                          </button>
                          
                      </div>
                  );
              });

    const handleSelectChange = (e) => {
        console.log("select바뀜");
        setSortSelected(e.target.value);
    };

    useEffect(() => {
        if (sortSelected == "time") {
            //일정 시작시간에 맞춰 sorting하기
            let eventSorting = [...eventArr];
            //핀되어있는 요소
            let pinnedEvent = eventSorting.filter(
                (el) => pinnedItems.filter((pin) => pin.id == el.id).length == 1
            );
            let unPinnedEvent = eventSorting.filter(
                (el) => pinnedItems.filter((pin) => pin.id == el.id).length == 0
            );
            pinnedEvent.sort((a, b) => new Date(a.start) - new Date(b.start));
            unPinnedEvent.sort((a, b) => new Date(a.start) - new Date(b.start));

            setEventArr([...pinnedEvent, ...unPinnedEvent]);
            //checkItem도 같이 여기서 정렬을 해줄까..? checkitem은 dateInfo랑 id값을가짐
        } else if (sortSelected == "completed") {
            //checkItem먼저 출력한 뒤, eventArr 엔 있는데 checkItem에 없는 애들 출력해줘야함....
            //만약 이 상태에서 내가 체크를 하거나 해제하면 그거에 따라 바로 바뀌어야함..

            let eventSorting = [...eventArr];
            //핀되어있는 요소
            let pinnedAndChecked = eventSorting.filter(
                (el) =>
                    pinnedItems.filter((pin) => pin.id == el.id).length == 1 &&
                    checkItems.filter((check) => check.id == el.id).length == 1
            );
            let pinnedAndUnchecked = eventSorting.filter(
                (el) =>
                    pinnedItems.filter((pin) => pin.id == el.id).length == 1 &&
                    checkItems.filter((check) => check.id == el.id).length == 0
            );
            let unpinnedAndchecked = eventSorting.filter(
                (el) =>
                    pinnedItems.filter((pin) => pin.id == el.id).length == 0 &&
                    checkItems.filter((check) => check.id == el.id).length == 1
            );
            let unpinnedAndUnchecked = eventSorting.filter(
                (el) =>
                    pinnedItems.filter((pin) => pin.id == el.id).length == 0 &&
                    checkItems.filter((check) => check.id == el.id).length == 0
            );
            setEventArr([
                ...pinnedAndChecked,
                ...pinnedAndUnchecked,
                ...unpinnedAndchecked,
                ...unpinnedAndUnchecked,
            ]);
        } else if (sortSelected == "incomplete") {
            let eventSorting = [...eventArr];
            //핀되어있는 요소
            let pinnedAndChecked = eventSorting.filter(
                (el) =>
                    pinnedItems.filter((pin) => pin.id == el.id).length == 1 &&
                    checkItems.filter((check) => check.id == el.id).length == 1
            );
            let pinnedAndUnchecked = eventSorting.filter(
                (el) =>
                    pinnedItems.filter((pin) => pin.id == el.id).length == 1 &&
                    checkItems.filter((check) => check.id == el.id).length == 0
            );
            let unpinnedAndchecked = eventSorting.filter(
                (el) =>
                    pinnedItems.filter((pin) => pin.id == el.id).length == 0 &&
                    checkItems.filter((check) => check.id == el.id).length == 1
            );
            let unpinnedAndUnchecked = eventSorting.filter(
                (el) =>
                    pinnedItems.filter((pin) => pin.id == el.id).length == 0 &&
                    checkItems.filter((check) => check.id == el.id).length == 0
            );
            setEventArr([
                ...pinnedAndUnchecked,
                ...pinnedAndChecked,
                ...unpinnedAndUnchecked,
                ...unpinnedAndchecked,
            ]);
        }
    }, [sortSelected, eventArr.length, checkItems.length, pinnedItems.length]);

    useEffect(() => {
        setSortSelected("time");
        //일정 시작시간에 맞춰 sorting하기
        let eventSorting = [...eventArr];
        //핀되어있는 요소
        let pinnedEvent = eventSorting.filter(
            (el) => pinnedItems.filter((pin) => pin.id == el.id).length == 1
        );
        let unPinnedEvent = eventSorting.filter(
            (el) => pinnedItems.filter((pin) => pin.id == el.id).length == 0
        );
        pinnedEvent.sort((a, b) => new Date(a.start) - new Date(b.start));
        unPinnedEvent.sort((a, b) => new Date(a.start) - new Date(b.start));

        setEventArr([...pinnedEvent, ...unPinnedEvent]);

    }, [open]);

    const lunarHeader = (dateInfo) => {
        const [solYear, solMonth, solDay] = dateInfo.split("-");
        console.log(solMonth);
        let { lunYear, lunMonth, lunDay } = solarToLunar(
            solYear,
            solMonth,
            solDay
        );
        return `음${lunMonth}.${lunDay}`;
    };

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? "openTodayModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        <div className="date-header">{header}</div>
                        <div className="lunar-header">
                            {lunarHeader(header)}
                        </div>
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>
                        <div className="modal-event-top">
                            {/* 체크박스 all check */}
                            <div className="checkbox-all">
                                <input type="checkbox" name="select-all" onChange={(e) =>handleAllCheck(e.target.checked)}
                                    // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                                    //해당날짜의 event가 하나도 없을 때 선택 해제
                                    //checkItems의 날짜가 header 이고 eventArr.dateInfo가 header인거의 length가 서로 다를때
                                    checked={checkItems.filter((el) => el.dateInfo == header).length ==
                                        eventArr.filter((el) =>el.start.substring(0, 10) ==header).length 
                                        &&
                                        eventArr.filter((event) =>event.start.substring(0, 10) ===header).length !== 0
                                        ? true : false
                                    }
                                    disabled={isFriends ? true : false}
                                />
                                <label>TODO-LIST</label>
                            </div>
                            <select className="select-box" value={sortSelected} onChange={(e) => handleSelectChange(e)} >
                                <option value="time">시간 순</option>
                                <option value="completed">완료된 항목 순</option>
                                <option value="incomplete">미완료된 항목 순</option>
                            </select>
                        </div>

                        <div className="modal-event-list">{eventButtons}</div>

                        <div className="modal-progress-bar">
                            <ProgressBar completed={progress} />
                        </div>
                    </main>
                    <footer>
                        <button className="add-event" onClick={openModal} disabled={isFriends ? true : false}>
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
                    <div className="modal-color-div">
                    <div 
                            onClick={()=>changeColor("#f5c6e1")} 
                            className = {isPinkPicked ? "modal-pink-picked-div" :"modal-pink-div"}></div>
                        <div 
                            onClick={()=>changeColor("#c59bef")} 
                            className = {isPurplePicked ? "modal-purple-picked-div" :"modal-purple-div"}></div>

                        <div 
                            onClick={()=>changeColor("#90b9df")} 
                            className = {isBluePicked ? "modal-blue-picked-div" :"modal-blue-div"}></div>
                         <div 
                            onClick={()=>changeColor("#86e3c6")} 
                            className = {isGrBluePicked ? "modal-grblue-picked-div" :"modal-grblue-div"}></div>
                        <div
                            onClick={()=>changeColor("#8cf1a4")} 
                            className = {isGreenPicked ? "modal-green-picked-div" :"modal-green-div"}></div>                        

                        <div
                            onClick={()=>changeColor("#e6ec8f")} 
                            className = {isYellowPicked ? "modal-yellow-picked-div" :"modal-yellow-div"}></div>                        
                        <div
                            onClick={()=>changeColor("#febd7b")} 
                            className = {isOrangePicked ? "modal-orange-picked-div" :"modal-orange-div"}></div>                        
                        <div
                            onClick={()=>changeColor("#BDBDBD")} 
                            className = {isGreyPicked ? "modal-grey-picked-div" :"modal-grey-div"}></div>                        

                    </div>

                    <div>
                        <span>Time</span>
                    </div>

                    <div className="modal-time-div">                      
                        <input type="time" step="300" ref={startTimeRef} defaultValue={editMode ? defaultData.start : null} disabled={noTimeDisable}/>
                        <input type="time" step="300" ref={endTimeRef} defaultValue={editMode ? defaultData.end : null} disabled={noTimeDisable}/>
                        <input type="button" onClick={()=>noTimeClicked()} value = "시간X"/>

                    </div>
                    <div>
                        <span>Input</span>
                    </div>
                    <div className="modal-input-div">
                        <textarea
                            ref={eventRef}
                            placeholder="할일을 입력하세요"
                            className="modal-textarea"
                            defaultValue={editMode ? defaultData.title : null}
                        />
                    </div>
                </div>
                <div className="modal-save-div">
                    <button
                        type="button"
                        className="modal-button"
                        onClick={() => onSaveEvent(editMode)}
                        disabled={disable}
                        style={{
                            backgroundColor: `${disable ? "gray" : "green"}`,
                        }}
                    >
                        {editMode ? "수 정" : "저 장"}
                    </button>
                </div>
            </Modal>
        </div>
    );
                    };
                    

export default TodayModal;
