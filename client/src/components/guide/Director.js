import React from 'react';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import PageFour from './PageFour';
import PageFive from './PageFive';
import PageSix from './PageSix';

const Director = ({number}) => {
    if (number === 1) {
        return <PageOne />
    } else if (number === 2) {
        return <PageTwo />
    } else if (number === 3) {
        return <PageThree />
    } else if (number === 4) {
        return <PageFour />
    } else if (number === 5) {
        return <PageFive />
    } else if (number === 6) {
        return <PageSix />
    } 
    
}
 
export default Director;