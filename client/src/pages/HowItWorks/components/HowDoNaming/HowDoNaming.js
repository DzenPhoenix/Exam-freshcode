import React from 'react'
import Style from './HowDoNaming.module.sass';
import textData from './textData/textData.js';

const renderListContent = function(textData){
    return <ul>
        {
            textData.map(function(item,idx){
                return <li key={idx}>
                    <span>{idx+1+"."}</span>
                    <p>{item.body}</p>
                </li>
            })
        }
    </ul>
}

const HowDoNaming = (props)=> {
    return (
        <div className={Style.HowDoNaming}>
            <div className={Style.header}>
                <img src="staticImages/HowDoNaming/HowDoNamingIcon.png" alt="icon"></img>
                <h2>How Do Naming Contests Work?</h2>
            </div>
            <div className={Style.content}>
                <img src="staticImages/HowDoNaming/HowDoNamingImg.png" alt="ManWork"></img>
                {renderListContent(textData)}
            </div>
        </div>
    )
}

export default HowDoNaming;