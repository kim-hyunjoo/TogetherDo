import "../styles/SideMenu.css"
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';

const ExternalCalendar = () => {
    let draggableEl = document.getElementById("external-events");
    
    return (
        
        new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        //let id = eventEl.getAttribute("data");
        return {
          title: title
          //id: id
        };
      }
    })
        
    )
}

export default ExternalCalendar;