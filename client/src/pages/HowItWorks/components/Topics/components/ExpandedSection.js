import React,{useState} from 'react';
import Style from './ExpandedSection.module.sass';


const ExpandedSection=(props)=>{

    const{header,body,isExpand}=props;
    const [isExpanded,setExpanded]=useState(isExpand);

    const handleClick = ()=>{
        setExpanded(!isExpanded);
    }

    return (
        <div className={Style.expandedSection}>
            <div className={Style.btn} onClick={handleClick}>
                <div>{header}</div>
                <img className={isExpanded? Style.verticalArrow:null} src="staticImages/howItworks/arrow.png" alt ="arrow" ></img>
            </div>   
            <div className={isExpanded? Style.showBody:Style.hideBody} dangerouslySetInnerHTML={{ __html: body }}></div>
        </div>
    )
}

export default ExpandedSection;
