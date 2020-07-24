import React from 'react';
import fourth from './images/fourthPic.png';
import fifth from './images/fifthPic.png';
import sixth from './images/sixthPic.png';

const PageThree = () => {
    return ( 
        <div className="guidepage">
            <header>
                Plan With Timetable
            </header>
            <img src={fourth} className="guide-photos" />
            <img src={fifth} className="guide-photos" />
            <img src={sixth} className="guide-photos" />
        </div>
     );
}
 
export default PageThree;