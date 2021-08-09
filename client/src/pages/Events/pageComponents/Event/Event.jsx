import React from "react";
import Style from "./Event.module.sass";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import moment from "moment";

const Event = (props) => {
    const { eventDate, eventTime, eventTimeCreating, eventName } = props.event;
    const deleteEvent = props.deleteEvent;

    const now = moment();
    const createMoment = moment(eventTimeCreating);
    const callMoment = moment(eventDate + " " + eventTime);
    const eventDuration = callMoment.diff(createMoment);
    const estimateTime = moment.utc(callMoment.diff(now)).format("HH:mm:ss");

    const [percentGone, setPercent] = useState(0);
    const [isGone,setIsGone] = useState(false);

    const divGone = useRef(null);

    useEffect(
        () => {
            if(!isGone){
                const timerId = setTimeout(
                    () => {
                        const timeGone = now.diff(createMoment);
                        if(timeGone<=eventDuration){
                            divGone.current.style.width = `${percentGone}%`;                
                            const percent = (timeGone / eventDuration)*100;
                            setPercent(percent);
                        }
                        else{
                            divGone.current.className=Style.done;
                            alert(`Event rise ${eventName}`);
                            setIsGone(true);
                            deleteEvent(props.event);
                        }
                           
                    }, 1000);
                    return () => {
                        clearTimeout(timerId);
                    };
            }
    });

    return (
        <div className={Style.event}>
            <div className={Style.barContainer}>
                <div ref={divGone} className={Style.gone}></div>
                <div className={Style.absolute}>{eventName} : {callMoment.format("DD:MM:YYYY:HH:mm")}, Estimate time: {estimateTime}</div>
            </div>
        </div>
    );
};

export default Event;
