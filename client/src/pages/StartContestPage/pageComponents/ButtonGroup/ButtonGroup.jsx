import React from 'react';
import Style from './ButtonGroup.module.sass';
import textData from './textData.js';
import CustomButton from './CustomButton/CustomButton.jsx';
import { useState } from 'react';
import {useEffect} from 'react';

const renderButtons = (textData, checkedIdx, handleClick) => {
    return textData.map((item, idx) => {
        if (idx === checkedIdx) {
            return <CustomButton id={idx} onClick={handleClick} checked={true} header={item.header} data={item.data} key={idx}></CustomButton>
        }
        else {
            return <CustomButton id={idx} onClick={handleClick} checked={false} header={item.header} data={item.data} key={idx}></CustomButton>
        }
    })
}

const ButtonGroup = (props) => {

    const [checkedIdx, setCheckedIdx] = useState(0);

    useEffect(() => {
        const inputElement = document.querySelector("input[name='company_url_needed']");
        switch (checkedIdx) {
            case 0: { inputElement.value = "asname"; break; }
            case 1: { inputElement.value = "yes"; break; }
            case 2: { inputElement.value = "no"; break; }
            default: { inputElement.value = "undefined" }
        }
    })

    const handleClick = (e) => {
        const id = parseInt(e.target.id);
        setCheckedIdx(id);  
    }

return (
    <div className={Style.buttonGroup}>
        <h2>Do you want a matching domain (.com URL) with your name?</h2>
        <p>If you want a matching domain, our platform will only accept those name suggestions where the domain is available. (Recommended)</p>
        <div className={Style.buttonContainer}>
            {renderButtons(textData, checkedIdx, handleClick)}
        </div>
        <input name="company_url_needed" type="hidden" ></input>
    </div>
)
}

export default ButtonGroup;
