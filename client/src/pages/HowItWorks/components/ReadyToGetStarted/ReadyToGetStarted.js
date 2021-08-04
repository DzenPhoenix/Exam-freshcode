import React from 'react';
import Style from './ReadyToGetStarted.module.sass';

const ReadyToGetStarted=(props)=>{

    return (
        <div className={Style.readyToGetStarted}>
            <h3>Ready to get started?</h3>
            <p>Fill out your contest brief and begin receiving custom name suggestions within minutes.</p>
            <a href="https://www.google.com/" alt="start contest">Start A Contest</a>
        </div>
    )
}

export default ReadyToGetStarted;