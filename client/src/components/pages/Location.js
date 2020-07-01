import React, { useContext } from 'react';
import Sidebar from '../sidebar/Sidebar';
import LayoutContext from '../../context/layout/layoutContext';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const Map = () => {
    return (
        <GoogleMap 
            defaultZoom={10} 
            defaultCenter={{ lat: 1.296643, lng: 103.776398}}
        />
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const Location = () => {
    const layoutContext = useContext(LayoutContext);
    const { isSidebarOpen } = layoutContext;
    return (
        <div>
            <Sidebar />
            <div className={isSidebarOpen ? 'main-shift' : 'main'}>
                Location planning with Google Maps API
                <WrappedMap googleMapURL={}/>
            </div>
        </div>
    );
};

export default Location;
