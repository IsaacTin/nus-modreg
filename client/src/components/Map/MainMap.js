import React, { useContext, useState, useEffect } from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import MapContext from "../../context/map/mapContext";

const MainMap = () => {
    const [markers, setMarkers] = useState([])
    const { firstLocation, secondLocation } = useContext(MapContext);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
    })
    const mapContainerStyle = {
        width: "100vw",
        height: "50vh"
    }

    const center = firstLocation === null || secondLocation === null ? {lat: 1.296643, lng: 103.776398} : {lat: (firstLocation.y + secondLocation.y)/2 , lng: (firstLocation.x +secondLocation.x)/2}

    useEffect(() => {
        let temp = [];
        if(firstLocation !== null && secondLocation !== null) {
            temp.push({lat: firstLocation.y, lng: firstLocation.x})
            temp.push({lat: secondLocation.y, lng: secondLocation.x})
            setMarkers(temp)
        } else {
            temp.push({ lat: 1.296643, lng: 103.776398})
            setMarkers(temp)
        }
        }, [firstLocation, secondLocation])
  


    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps";


    return (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={16}
                    center={center}
                    markers={markers}
                >
                {markers.map((coords, index) => {
                    console.log(markers)
                    return (
                        <Marker key={index} position={coords}/>
                        )}
                )}
                {console.log(markers)}
                </GoogleMap>
    )
        
}

export default MainMap;

