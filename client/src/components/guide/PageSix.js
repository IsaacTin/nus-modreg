import React from 'react';
import twelth from './images/twelthPic.png';
import thirteenth from './images/thirteenthPic.png';
import fourteenth from './images/fourteenthPic.png';

const PageSix = () => {
    return ( 
        <div className="guidepage">
            <header>
                Confirm Ranking of Lessons
            </header>
            <img src={twelth} className="guide-photos" />
            <img src={thirteenth} className="guide-photos" />
            <img src={fourteenth} className="guide-photos" />
        </div>
     );
}
 
export default PageSix;
