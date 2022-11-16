import React, { useRef, useState, useEffect } from "react";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import "../styles/Modal.css";

const TodayModal = (props) => {   
    const { open, close, header, setEventArr, eventArr, checkItems, setCheckItems, progress, setProgress, eventID, setEventID} = props;
    //색상커스텀 useState
    const [isYellowPicked , setIsYellowPicked] = useState(false);
    const [isMintPicked , setIsMintPicked] = useState(false);
    const [isPinkPicked , setIsPinkPicked] = useState(false);
    //이벤트 수정할 때 (edit modal) 선택한 이벤트 객체를 저장
    const [defaultData, setDefaultData] = useState({id : 0, title : '', start : '', end : ''});

    //수정, 저장 버튼을 한번 눌렀을 시 비활성화하기 위한 useState
    const [disable, setDisable] = useState(false);
    //modal, edit modal
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    
    //정렬 기능
    //const selectList = ["time", "completed", "incomplete"];
    const [selected, setSelected] = useState("");
    useEffect(()=> {
        console.log("렌더링 됐습니다.");
    })

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
        setDisable(false);//저장,수정 버튼 활성화
    };

    //색상커스텀
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

    //이벤트를 수정하기 위해 모달 내에서 이벤트를 클릭했을 때 실행
    const eventClick = (event) => {
        //선택한 이벤트를 useState에 저장
        setDefaultData({
            ...defaultData,
            id : event.id, 
            title : event.title,
            start : event.start.substring(11, 16),
            end : event.end.substring(11, 16),
        });
        //color정보는 따로 저장
        changeColor(event.backgroundColor)
        setModalOpen(true);
        //Edit Modal 열기
        setEditMode(true);
        
        console.log("event 입니다.", event);
        console.log("defaultData 입니다.", defaultData);
    }

    //모달 저장or수정 버튼 클릭시 이벤트
    const onSaveEvent = (editMode) => {
        //저장하려고 할 때 startTimeRef, endTimeRef, eventRef 하나라도 비어있을 시 경고창
        if(startTimeRef.current.value == "") {
            alert("시작 시간을 입력하세요")
            return;
        }
        if(endTimeRef.current.value === "") {
            alert("종료 시간을 입력하세요")
            return;
        }
        if(eventRef.current.value === "") {
            alert("일정을 입력하세요")
            return;
        }
        
        const startTime = `${header}T${startTimeRef.current.value}`;
        const endTime = `${header}T${endTimeRef.current.value}`;
        const eventContent = eventRef.current.value;
        //edit mode의 경우 선택된 이벤트의 ID 그대로 저장, 아닐 경우 새로운 eventID 부여
        const eventId = editMode == true ? defaultData.id : eventID; 
        const bgColor = eventColor.current;
        const eventObj = {
            id: eventId,
            title: eventContent,
            start: startTime,
            end: endTime,
            backgroundColor : bgColor,
            borderColor : bgColor
        };

        if(editMode == true){ //edit mode일 경우 기존에 선택된 이벤트 객체 삭제 후 저장
            const newEventArr = eventArr.filter(event => event.id != eventId);
            setEventArr([...newEventArr, eventObj]);
        }
        else { 
            setEventArr([...eventArr, eventObj]);
            setEventID(parseInt(eventID) + 1); //새로 생성되는 이벤트에 부여할 eventID 갱신
        } 
        setDisable(true);//수정,저장 버튼 비활성화
    };

    //이벤트 삭제
    const deleteEvent=(id)=> {
        const newEventArr = eventArr.filter(event => event.id != id); //id를 이용하여 삭제
        setEventArr(newEventArr);
        const newCheckItems = checkItems.filter(item => item.id != id)
        setCheckItems(newCheckItems);
    };
    
     // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        console.log(checkItems);
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems(prev => [...prev, { dateInfo : header, id : id}]);
            } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el.id != id));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        const idArray = [];
        if(checked) {
        // 전체 선택 클릭 시 해당 날짜(dateInfo) 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트  
        const newEventArr = eventArr.filter(event => event.start.substring(0,10) == header); //오늘날짜인것들만..
        console.log(newEventArr);
        newEventArr.forEach((el) => idArray.push({ dateInfo : header, id : el.id}));
        console.log(idArray);
        setCheckItems([...idArray]);
        
        }
        else {
        // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
        // 전체 선택 해제시 그날의 dateInfo에 해당하는 값 제거 
        const newCheckItems = checkItems.filter(el=>el.dateInfo != header);
        setCheckItems(newCheckItems);
        }
    }

    useEffect(()=> {
        const todayEvents = eventArr.filter(event=>event.start.substring(0,10) === header)
        const todayCheckItems = checkItems.filter(item => item.dateInfo === header)
        const completed = todayEvents.length == 0 ? 0 : (todayCheckItems.length/todayEvents.length)*100;
        setProgress(completed.toFixed(1))
        console.log(`오늘의 일정 개수 : ${todayEvents.length}, 오늘의 체크된 개수 : ${todayCheckItems.length}`)
        console.log(eventButtons)
    }, [checkItems, eventArr])

    //header(해당날짜)와 비교하여 eventArr에 있는 이벤트 중 같은 날짜만 filter (이 작업을 안할경우 모든 eventArr객체가 나타나게 됨)
    const todayEventArr = eventArr.filter((event)=>event.start.substring(0,10) === header);
    
    //날짜 클릭 시 해당 날짜의 일정 목록을 checkbox 및 button을 이용하여 todo-list 구현
    const eventButtons = todayEventArr.length == 0 ? "일정이 없습니다." : todayEventArr.map((event) => {      
        const start = event.start.substring(11,16); //시간정보만 가져오기
        const end = event.end.substring(11,16); //시간정보만 가져오기
        return (
            <div className='modal-event-object' key={event.id}>
                {/* 체크박스, css효과를 주기 위해 label로 감쌈 */}
                <label className="checkbox_container">
                    <input type="checkbox" key={event.id} onChange={(e) => handleSingleCheck(e.target.checked, event.id)} 
                    checked={checkItems.map(item=> item.id).includes(event.id) ? true : false}></input>
                </label>
                {/* 이벤트 제목 */}
                <button className='event-button' style={{backgroundColor : event.backgroundColor}} 
                onClick={()=>eventClick(event)}> {`${start}-${end} ${event.title}`}</button>
                {/* 삭제버튼 */}
                <button className='delete-button' onClick={()=>deleteEvent(event.id)}>&times;</button>
            </div>
        )
    }); 


    const handleSelectChange = (e) => {
        console.log("select바뀜")
        setSelected(e.target.value);
    }

    /*
    useEffect(()=>{
        //일정 시작시간에 맞춰 sorting하기
        let eventSorting = [...eventArr];
        eventSorting.sort((a, b) => new Date(a.start) - new Date(b.start))
        setEventArr(eventSorting);
    },[eventArr.length]) //언제언제 sorting을 해줘야하지... ㅠㅠ 아 그냥 select구현해서 항상 select되있게하면 실행되려나?
*/

    useEffect(()=>{
        if(selected == "time") {
            //일정 시작시간에 맞춰 sorting하기
            let eventSorting = [...eventArr];
            eventSorting.sort((a, b) => new Date(a.start) - new Date(b.start))
            setEventArr(eventSorting);
            //checkItem도 같이 여기서 정렬을 해줄까..? checkitem은 dateInfo랑 id값을가짐
        }
        else if(selected== "completed") {
            //checkItem먼저 출력한 뒤, eventArr 엔 있는데 checkItem에 없는 애들 출력해줘야함....
            //만약 이 상태에서 내가 체크를 하거나 해제하면 그거에 따라 바로 바뀌어야함..
            let eventCompleted = [];
            eventArr.filter(event=>{
                if (checkItems.map(item=> item.id).includes(event.id)){
                    eventCompleted.push(event)
                }
            })
            let eventIncomplete = [];
            eventArr.filter(event=>{
                if (!checkItems.map(item=> item.id).includes(event.id)){
                    eventIncomplete.push(event)
                }
            })
            setEventArr([...eventCompleted, ...eventIncomplete])
            console.log([...eventCompleted, ...eventIncomplete])
        }
        else if(selected == "incomplete") {
            let eventCompleted = [];
            eventArr.filter(event=>{
                if (checkItems.map(item=> item.id).includes(event.id)){
                    eventCompleted.push(event)
                }
            })
            let eventIncomplete = [];
            eventArr.filter(event=>{
                if (!checkItems.map(item=> item.id).includes(event.id)){
                    eventIncomplete.push(event)
                }
            })
            setEventArr([...eventIncomplete, ...eventCompleted])
            console.log([...eventIncomplete, ...eventCompleted])
        }

    },[selected, eventArr.length, checkItems.length])

    useEffect(()=>{
        setSelected("time");
    }, [open])
    
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
                            {/* 체크박스 all check */}
                            <div className="checkbox-all">
                            <input type='checkbox'  name='select-all' onChange={(e) => handleAllCheck(e.target.checked)}
                            // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                            //해당날짜의 event가 하나도 없을 때 선택 해제
                            //checkItems의 날짜가 header 이고 eventArr.dateInfo가 header인거의 length가 서로 다를때
                            checked={( 
                                (checkItems.filter(el=>el.dateInfo == header).length ==
                                eventArr.filter(el=>el.start.substring(0,10) == header).length)
                                && 
                                (eventArr.filter((event)=>event.start.substring(0,10) === header).length !== 0)
                                ) ? true : false}/>
                            <label>TODO-LIST</label>
                            </div>
                            <select className="select-box" value={selected} onChange={(e) => handleSelectChange(e)}>
                                <option value="time">시간 순</option>
                                <option value="completed">완료된 항목 순</option>
                                <option value="incomplete">미완료된 항목 순</option>
                            
                            </select>
                        </div>

                        <div className = "modal-event-list">
                          {eventButtons}
                        </div>

                        <div className = "modal-progress-bar">
                        <ProgressBar completed={progress} />
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
                        disabled={disable}
                        style={{backgroundColor :`${disable? 'gray': 'green'}`}}
                    >
                        {editMode ? "수 정" : "저 장"}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default TodayModal;