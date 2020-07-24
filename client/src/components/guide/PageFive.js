import React from 'react';
import tenth from './images/tenthPic.png';
import eleventh from './images/eleventhPic.png';

const PageFive = () => {
    return ( 
        <div className="guidepage">
            <header>
                Rank Lessons
            </header>
            <img src={tenth} className="guide-photos" />
            <img src={eleventh} className="guide-photos" />
        </div>
     );
}
 
export default PageFive;
