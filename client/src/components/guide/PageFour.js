import React from 'react';
import seventh from './images/seventhPic.png';
import eighth from './images/eighthPic.png';
import ninth from './images/ninthPic.png';

const PageFour = () => {
    return ( 
        <div className="guidepage">
            <header>
                Plan with Location Planning
            </header>

            <img src={seventh} className="guide-photos" />
            <img src={eighth} className="guide-photos" />
            <img src={ninth} className="guide-photos" />
        
        </div>
     );
}
 
export default PageFour;
