import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";


const Map = () => {
    return (
        <GoogleMap 
            defaultZoom={20} 
            defaultCenter={{ lat: 1.296643, lng: 103.776398}}
        />
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const MainMap = () => {
    return ( 
        <div style={{width: '100vw', height: '100vh'}}>
                <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                        process.env.REACT_APP_GOOGLE_KEY
                    }`}
                    loadingElement={<div style={{ height: "100%"}}/>}
                    containerElement={<div style={{ height: "100%"}}/>}
                    mapElement={<div style={{ height: "100%"}}/>}
                />
        </div>
     );
}
 
export default MainMap;