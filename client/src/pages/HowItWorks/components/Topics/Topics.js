import React from 'react';
import Style from './Topics.module.sass';
import textData from './textData/textData.js';
import ExpandedSection from "./components/ExpandedSection.js";

const renderNavBar = function (textData) {
    return textData.map(function (theme, idx) {
        return <a key={idx} href={"#"+idx} >{theme.header}</a>
    })
}

const renderFaqTheme = function (theme, key) {
    return <div className={Style.faqBlock} key={key}>
        <h3 id={key-1} >{theme.header}</h3>
        {theme.body.map(function (item, idx) {
            return <ExpandedSection key={idx}
                header={item.header}
                body={item.body}
                isExpand={idx === 0} />
        })}
    </div>
}

const renderFaq = function (textData) {
    return textData.map(function (theme, idx) {
        return renderFaqTheme(theme, idx + 1);
    })
}

const Topics = (props) => {
    return (
        <div className={Style.topics}>
            <div className={Style.navBar}>
                {renderNavBar(textData)}
            </div>
            <div className={Style.faqContainer}>
                {renderFaq(textData)}
            </div>
        </div>
    )
}

export default Topics;
