import React from 'react';
import Header from '../../components/Header/Header.js';
import HeroBanner from './components/HeroBanner/HeroBanner.js';
import ServiceSection from './components/ServiceSection/ServiceSection.js';
import HowDoNaming from './components/HowDoNaming/HowDoNaming.js';
import Topics from './components/Topics/Topics.js';
import ReadyToGetStarted from './components/ReadyToGetStarted/ReadyToGetStarted.js';
import Questions from './components/Questions/Questions.js';
import Footer from '../../components/Footer/Footer.js';
import Style from './HowItWorks.module.sass';

const HowItWorks = (props)=>{
    return (
        <div className={Style.howItWorks}>
           <Header></Header>
           <HeroBanner></HeroBanner>
           <ServiceSection></ServiceSection>
           <HowDoNaming></HowDoNaming>
           <Topics></Topics>
           <ReadyToGetStarted></ReadyToGetStarted>
           <Questions></Questions>
           <Footer></Footer>
        </div>
    )
}

export default HowItWorks;
