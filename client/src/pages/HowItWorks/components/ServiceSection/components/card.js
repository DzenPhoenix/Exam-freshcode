import React from 'react';
import Style from './card.module.sass';

const card =(props)=>{
    return (
        <div className={Style.container}>
            <img src = {props.imageSrc} alt = "icon"></img>
            <h3>{props.header}</h3>
            <p>{props.body}</p>
            <a href={props.buttonRef}>{props.buttonText}</a>
        </div>
    )
}

export default card;
