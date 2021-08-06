import React from 'react';
import Header from '../../components/Header/Header';
import InputEvent from './pageComponents/InputEvent/InputEvent.jsx';
import Style from './Events.module.sass';

const Events=()=> {
    return (
        <div className={Style.events}>
            <Header></Header>
            <InputEvent></InputEvent>
        </div>
    )
}

export default Events;
