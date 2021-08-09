import React from 'react';
import Event from '../Event/Event.jsx';
import Style from './EventList.module.sass';

const EventList = (props) => {
    const eventData = props.eventData;
    const deleteEvent=props.deleteEvent;
    return (
        <div className={Style.eventList}>
            <h2>Events:</h2>
            {
                eventData.map(
                    (item, idx) => {
                    return <Event event={item} key={idx} deleteEvent={deleteEvent}></Event>}
                )
            }
        </div>
    )
}

export default EventList;
