import React, { useContext, useState, useEffect } from "react";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import MapContext from "../../context/map/mapContext";
import logo from './bus.svg';
import checker from '../../utils/checker';

const MainMap = () => {
    const [markers, setMarkers] = useState([])
    const { firstLocation, secondLocation, busStops } = useContext(MapContext);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
    })
    const mapContainerStyle = {
        width: "100vw",
        height: "50vh"
    }
    const options = {
        disableDefaultUI: true,
        zoomControl: true,
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
            <div className="map">
                <h1>
                    First Location{"   "}
                    <span role="img" aria-label="startFlag">
                        🚩
                    </span>
                    <br />
                    Second Location {" "}
                    <span role="img" aria-label="endFlag">
                        🏴
                    </span>
                    <br/>
                    Bus Stop{" "}
                    <span role="img" aria-label="Bus-Stop">
                        🚌 
                    </span>
                </h1>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={16}
                    center={center}
                    options={options}
                >
                {firstLocation !== null && secondLocation !== null ? console.log(checker(firstLocation, secondLocation, busStops)) : console.log("hi")}
                {markers.map((coords, index) => {
                    console.log(markers)
                    return (
                        <Marker key={index} position={coords}/>
                        )}
                )}
                {busStops.map((BusStop, index) => {
                    return (
                        <Marker 
                            key={index} 
                            position={{lat: BusStop.location[0], lng: BusStop.location[1]}} 
                            icon={{
                                url: logo,
                                scaledSize: new window.google.maps.Size(40,40),
                            }}
                        />
                    )
                })}
                {console.log(markers)}
                </GoogleMap>
            </div>
    )
        
}

export default MainMap;

