import React from 'react';
import first from './images/firstPic.png';
import second from './images/secondPic.png';

const PageOne = () => {
    return ( 
        <div className="guidepage">
            <header>
                Search and Select Lessons
            </header>
            <img className="guide-photos" src={first}/>
            <br/>
            <img className = "guide-photos" src={second}/>
        </div>
     );
}
 
export default PageOne;
