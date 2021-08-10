import React from 'react';
import Style from './CustomButton.module.sass';
import classNames from 'classnames/bind';


const CustomButton = (props) => {
    const { header, data, checked, onClick, id } = props;

    const cx = classNames.bind(Style);
    const className = cx({
        customButton: true,
        customButton_checked: checked
    });

    return (
        <div id={id} onClick={onClick} className={className}>
            <h2>{header}</h2>
            <p>{data}</p>
        </div>
    )
}

export default CustomButton;