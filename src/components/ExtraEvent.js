const ExtraEvent = (props) => {
    const {extraEventArr, extraEventDelete, extraEventAdd, extraEventRef} = props;
    return (
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
    )
}

export default ExtraEvent;