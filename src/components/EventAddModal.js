import React from "react";
import "../styles/Modal.css";

const EventAddModal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, changeColor, isBluePicked, isGrBluePicked, isGreenPicked, isGreyPicked, 
        isOrangePicked, isPinkPicked, isPurplePicked, isYellowPicked, startTimeRef, endTimeRef, defaultData, editMode,
    noTimeDisable, noTimeClicked, eventRef, onSaveEvent, disable } = props;

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={()=>close()}>
                            &times;
                        </button>
                    </header>
                    <main>
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
                        <input type="time"  step="300" ref={endTimeRef} defaultValue={editMode ? defaultData.end : null} disabled={noTimeDisable}/>
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
                    </main>
                    <footer>
                        <button className="close" onClick={()=>close()}>
                            close
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
};

export default EventAddModal;
