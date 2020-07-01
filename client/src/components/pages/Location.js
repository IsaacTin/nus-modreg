import React, { useContext } from 'react';
import Sidebar from '../sidebar/Sidebar';
import LayoutContext from '../../context/layout/layoutContext';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import MainMap from '../Map/MainMap';



const Location = () => {
    const layoutContext = useContext(LayoutContext);
    const { isSidebarOpen } = layoutContext;
    return (
        <div>
            <Sidebar />
            <div className={isSidebarOpen ? 'main-shift' : 'main'}>
                Location planning with Google Maps API
            </div>
            {/*<MainMap />*/}
        </div>
    );
};

export default Location;
