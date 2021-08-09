import React from "react";
import { Formik, Field, Form } from "formik";
import Style from "./InputEvent.module.sass";
import moment from "moment";

const initialValues = {
  eventName: "New event",
  eventDate: moment().format("YYYY-MM-DD"),
  eventTime: moment().format("HH:mm"),
  eventRemindTime: moment().format("HH:mm"),
  eventTimeCreating: moment().format("YYYY-MM-DD HH:mm"),
};

const handleClick = (values, email,addEvent) => {
  const check = window.confirm("Create event?");
  if (check) {
    const eventListItem = localStorage.getItem("Event: " + email);
    const eventList = eventListItem ? JSON.parse(eventListItem) : [];
    eventList.push(values);
    localStorage.setItem("Event: " + email, JSON.stringify(eventList));
    addEvent(values);
  }
}

const InputEvent = (props) => {

  const addEvent = props.addEvent;
  const email = props.email;

  return (
    <Formik initialValues={initialValues} onSubmit={(values)=>{handleClick(values,email,addEvent)}}>
      <Form className={Style.inputEvent}>
        <h2>Creating event:</h2>
        <div>
          <label>Event name:</label>
          <Field className={Style.field} name="eventName" type="text" />
        </div>
        <div>
          <label>Event date:</label>
          <Field name="eventDate" type="date" />
        </div>
        <div>
          <label>Event time:</label>
          <Field name="eventTime" type="time" />
        </div>
        <div>
          <label>Event remind time:</label>
          <Field name="eventRemindTime" type="time" />
        </div>
        <button type="submit">Create event</button>
      </Form>
    </Formik>
  );
};


export default InputEvent;
