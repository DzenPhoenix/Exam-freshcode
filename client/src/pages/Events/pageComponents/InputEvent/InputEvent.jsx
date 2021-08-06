import React from "react";
import { connect } from 'react-redux';
import { Formik, Field, Form } from "formik";
import Style from "./InputEvent.module.sass";
import moment from "moment";

const initialValues = {
  eventName: "New event",
  eventDate: moment().format("YYYY-MM-DD"),
  eventTime: moment().format("HH:mm"),
  eventRemindTime: moment().format("HH:mm"),
};

const handleClick = (values, email) => {
  const check = window.confirm("Create event?");
  if (check) {
    const eventListItem = localStorage.getItem("Event: " + email);
    const eventList=eventListItem? JSON.parse(eventListItem):[];
    eventList.push(JSON.stringify(values));
    localStorage.setItem("Event: " + email, JSON.stringify(eventList));
  }

}

const InputEvent = (props) => {
  const data = props.data;
  return (
    <Formik initialValues={initialValues} onSubmit={(values) => handleClick(values, data.email)}>
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

const mapStateToProps = (state) => {
  const userStore = state.userStore;
  const data = userStore.data;
  return { data };
};


export default connect(mapStateToProps)(InputEvent);
