import React from 'react';
import Style from './ServiceSection.module.sass';
import Card from './components/card.js';
import textData from './textData/textData.js';

const renderCards = function (textData) {
    return textData.map(function (item, idx) {
        return <Card key={idx}
            imageSrc={item.imageSrc}
            header={item.header}
            body={item.body}
            buttonRef={item.buttonRef}
            buttonText={item.buttonText} />
    })
}

const ServiceSection = (props) => {
    return (
        <div className={Style.ServiceSection}>
            <div className={Style.container}>
                <div className={Style.threeWays}>
                    <small>Our Services</small>
                    <h2>3 Ways To Use Squadhelp</h2>
                    <p>Squadhelp offers 3 ways to get you a perfect name for your business.</p>
                </div>
                <div className={Style.cardContainer}>
                {
                    renderCards(textData)
                }
                </div>
            </div>
        </div>
    )
}

export default ServiceSection;
