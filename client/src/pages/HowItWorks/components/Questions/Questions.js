import React from 'react';
import Style from './Questions.module.sass';

const Questions = (props) => {
    return (
        <div className={Style.questions}>
            <div className={Style.icons}>
                <div>
                    <img src="staticImages/howItWorks/stars.svg" alt="stars"></img>
                    <p><b>4.9 out of 5 stars</b> from 25,000+ customers.</p>
                </div>
                <div>
                    <img src="staticImages/howItWorks/comunity.png" alt="comunity"></img>
                    <p>Our branding community stands <b>200,000+</b> strong.</p>
                </div>
                <div>
                    <img src="staticImages/howItWorks/sharing-files.svg" alt="sharing-files"></img>
                    <p><b>140+ Industries</b> supported across more than <b>85 countries</b> and counting.</p>
                </div>
            </div>
            <div className={Style.textBody}>
                <div className={Style.paySatisfactionContainer}>
                    <div className={Style.paySatisfaction}>
                        <img src="staticImages/howItWorks/arrow_1.png" alt="arrow"></img>
                        <div>
                            <h4>Pay a Fraction of cost vs hiring an agency</h4>
                            <p>For as low as $199, our naming contests and marketplace allow you to get an amazing brand quickly and affordably.</p>
                        </div>
                    </div>
                    <div className={Style.paySatisfaction}>
                        <img src="staticImages/howItWorks/arrow_1.png" alt="arrow"></img>
                        <div>
                            <h4>Satisfaction Guarantee</h4>
                            <p>Of course! We have policies in place to ensure that you are satisfied with your experience.
                                <a href="www.google.com">Learn more</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={Style.contacts}>
                    <h4>Questions?</h4>
                    <p>Speak with a Squadhelp platform expert to learn more and get your questions answered.</p>
                    <button>Schedule Consultation</button>
                    <a href="www.google.com">
                        <img src="staticImages/howItWorks/phone_icon.svg" alt="phone"></img>
                        <p>(877) 355-3585</p>
                    </a>
                    <p>Call us for assistance</p>
                </div>

            </div>
            <div className={Style.featuredIn}>
                <h6>Featured In</h6>
                <div>
                    <img src="staticImages/howItWorks/forbes.svg" alt="Forbes"></img>
                    <img src="staticImages/howItWorks/TNW.svg" alt="TNW"></img>
                    <img src="staticImages/howItWorks/chicago.svg" alt="Chicago"></img>
                    <img src="staticImages/howItWorks/Mashable.svg" alt="Mashable"></img>
                </div>
            </div>
        </div>
    )
}

export default Questions;
