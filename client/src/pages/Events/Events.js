import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import moment from "moment";
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js'
import InputEvent from './pageComponents/InputEvent/InputEvent.jsx';
import EventList from './pageComponents/EventList/EventList.jsx';
import Style from './Events.module.sass';

const compare=(a,b)=>{
    const now = moment();
    
    const callMomentA = moment(a.eventDate + " " + a.eventTime);
    const estimateTimeA = callMomentA.diff(now);

    const callMomentB = moment(b.eventDate + " " + b.eventTime);
    const estimateTimeB = callMomentB.diff(now);

    if(estimateTimeA<estimateTimeB){
        return -1;
    }
    if(estimateTimeA>estimateTimeB){
        return 1;
    }
    return 0;
}

const eventFilter=(event)=>{
    const now = moment();
    const callMoment = moment(event.eventDate + " " + event.eventTime);
    const estimateTime = callMoment.diff(now);
    return estimateTime>0;
}

const parseEvents = (email) => {
    const eventListItem = localStorage.getItem("Event: " + email);
    const eventList = eventListItem ? JSON.parse(eventListItem) : [];
    const filteredList = eventList.filter(eventFilter);
    filteredList.sort(compare);
    return filteredList;
}


const Events = (props) => {
    const userData = props.data;
    const [events, setEvents] = useState(parseEvents(userData.email));

    const addEvent = (event) => {
        const newEvents = [...events,event];
        const filteredList = newEvents.filter(eventFilter);
        filteredList.sort(compare);
        setEvents(newEvents);
    }

    const deleteEvent=(event)=>{
        const newEvents = [...events];
        const eventIndex = newEvents.findIndex((element)=>{
            const currentCallDate = element.eventDate+element.eventTime;
            const eventCallDate = event.eventDate+event.eventTime;
            return currentCallDate === eventCallDate;
        });
        newEvents.splice(eventIndex,1);
        setEvents(newEvents);
    }

    return (
        <div className={Style.events}>
            <Header></Header>
            <div className={Style.eventContainer}>
                <InputEvent addEvent={addEvent} email={userData.email}></InputEvent>
                <EventList eventData={events} deleteEvent={deleteEvent}></EventList>
            </div>
            <Footer></Footer>
        </div>
    )
}

const mapStateToProps = (state) => {
    const userStore = state.userStore;
    const data = userStore.data;
    return { data };
};


export default connect(mapStateToProps)(Events);
