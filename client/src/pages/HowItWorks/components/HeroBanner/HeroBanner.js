import React from 'react';
import Style from './HeroBanner.module.sass';

const HeroBanner = (props) => {
    return (
        <div className={Style.heroBanner}>
            <div className={Style.container}>
                <div className={Style.textBlock}>
                    <span>World's #1 Naming Platform</span>
                    <div className={Style.text}>
                        <h1>How Does Squadhelp Work?</h1>
                        <p>Squadhelp helps you come up with a great name for your business by combining the power of crowdsourcing with sophisticated technology and Agency-level validation services.</p>
                    </div>
                    <div className={Style.playButton}>
                        <a href="https://vimeo.com/368584367">
                            <small></small>
                            Play Video
                        </a>
                    </div>
                </div>
                <div>
                    <img src="/staticImages/manOnSmartphone.png" alt="man on smartphone"></img>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner;

