import React, { useContext, useState, useEffect } from "react";
import {GoogleMap, useLoadScript, Marker,  InfoWindow, DirectionsService, DirectionsRenderer} from "@react-google-maps/api";
import MapContext from "../../context/map/mapContext";
import logo from './bus.svg';
import checker from '../../utils/checker';
import blue_marker from './blue_marker.svg';
import brown_marker from './brown_marker.svg';
import ModuleContext from '../../context/module/moduleContext';

const MainMap = () => {
    let filteredMarker = null;
    let filteredBusStop = null;
    const [markers, setMarkers] = useState([]);
    const [selectedBusStops, setSelectedBusStops] = useState([])
    const [selectedMarkers, setSelectedMarkers] = useState([]);
    const [routes, setRoutes] = useState({
        response: null,
        travelMode: 'DRIVING',
        origin: '',
        destination: ''
    })
    const { firstLocation, 
            secondLocation, 
            busStops, 
            setFirstNearest, 
            setSecondNearest, 
            firstNearest, 
            secondNearest, 
            loaded, 
            setLoaded, 
            day,
        } = useContext(MapContext);

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

    const directionsCallback = (response) => {
        console.log(response);
        if(response !== null) {
            if(response.status === 'OK') {
                console.log(routes)
                setLoaded(true);
                return (
                    setRoutes((prevstate) => ({
                        ...prevstate,
                        response
                    })
                ))
            }
        } else {
            return (
                console.log('response: ', response)
            )
        }
    }

    let center = firstLocation === null || secondLocation === null ? {lat: 1.296643, lng: 103.776398} : {lat: (firstLocation.y + secondLocation.y)/2 , lng: (firstLocation.x +secondLocation.x)/2}

    useEffect(() => {
        let temp = [];
        if(firstLocation !== null && secondLocation !== null && !loaded && day !== null) {
            temp.push(firstLocation)
            temp.push(secondLocation)
            setMarkers(temp)
            setSelectedMarkers(temp)
            const nearest = checker(firstLocation, secondLocation, busStops);
            if(nearest !== null) {
                setFirstNearest(nearest[0]);
                setSecondNearest(nearest[1]);
            } else {
                setFirstNearest(null);
                setSecondNearest(null);
            }
        } else if (markers.length === 0) {
            temp.push({y: 1.296643, x: 103.776398, venue: "National University Of Singapore"})
            setMarkers(temp)
        } 
    }, [firstLocation, secondLocation, loaded, day])

    useEffect(() => {
        if(firstNearest !== null && secondNearest !== null) {
            setRoutes({
                origin: {lat: firstNearest.location[0], lng: firstNearest.location[1]},
                destination: {lat: secondNearest.location[0], lng: secondNearest.location[1]},
                response: null,
                travelMode: 'DRIVING'
            })
        } else {
            setRoutes({
                response: null,
                travelMode: 'DRIVING',
                origin: '',
                destination: ''
            })
        }
    }, [firstNearest, secondNearest])
  
    useEffect(() => {
        if (filteredMarker !== null) {
            setSelectedMarkers(filteredMarker)
            filteredMarker = null;
        }
        if (filteredBusStop !== null) {
            setSelectedBusStops(filteredBusStop)
            filteredBusStop = null;
        }
    }, [filteredMarker, filteredBusStop])

    /*useEffect(() => {
        if(firstNearest !== null && secondNearest !== null && firstLocation !== null && secondLocation !== null) {
            console.log(firstNearest)
            setRoutes([
                {origin: {lat: firstLocation.y, lng: firstLocation.x}, destination: {lat: firstNearest[0].location[0], lng: firstNearest[0].location[1]}, travelMode: 'WALKING', response: null},
                {origin: {lat: firstNearest[0].location[0], lng: firstNearest[0].location[1]}, destination: {lat: secondNearest[0].location[0], lng: secondNearest[0].location[1]}, travelMode: 'DRIVING', response: null},
                {origin: {lat: secondNearest[0].location[0], lng: secondNearest[0].location[0]}, destination: {lat: secondLocation.y, lng: secondLocation.x}, travelMode: 'WALKING', response: null}
            ])
        } else if (firstLocation !== null && secondLocation !== null) {
            setRoutes([
                {origin: {lat: firstLocation.y, lng: firstLocation.x}, destination: {lat: secondLocation.y, lng: secondLocation.x}, travelMode: 'WALKING', response: null}
            ])
        }
    }, [firstNearest, secondNearest])*/


    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps";


    return (
            <div className="map">
                <h1>
                    First Location{"   "}
                    <span>
                        <img src={brown_marker} className="brown-marker" />
                    </span>
                    <br />
                    Second Location {" "}
                    <span>
                        <img src={blue_marker} className="blue-marker" />
                    </span>
                    <br/>
                    Bus Stop{" "}
                    <span>
                        <img src={logo} className="bus-stop"/> 
                    </span>
                </h1>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={17}
                    center={center}
                    options={options}
                >
                {markers.map((place, index) => {
                    if(index === 0) {
                        return (
                            <Marker key={index} position={{lat: place.y, lng: place.x}} icon={{url: brown_marker, scaledSize: new window.google.maps.Size(25,40)}} onClick={() => setSelectedMarkers([...selectedMarkers, place])}/>
                        )
                    } else {
                        return (
                            <Marker key={index} position={{lat: place.y, lng: place.x}} icon={{url: blue_marker, scaledSize: new window.google.maps.Size(40,40)}} onClick={() => setSelectedMarkers([...selectedMarkers, place])}/>
                        )
                    }}
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
                            onClick={() => {
                                setSelectedBusStops([...selectedBusStops, BusStop])
                                center = {lat: (center.lat + BusStop.location[0])/2, lng: (center.lng + BusStop.location[1])/2}
                            }}
                        />
                    )
                })}
                {!loaded && routes.origin !== '' && routes.destination !== '' && 
                        <DirectionsService
                            options={{
                                destination: routes.destination,
                                origin: routes.origin,
                                travelMode: routes.travelMode
                            }}
                            callback={directionsCallback}
                        /> 
                }
                {routes.response !== null && 
                    <DirectionsRenderer
                        options={{
                            directions: routes.response
                        }}
                    />
                }
                {selectedMarkers ? selectedMarkers.map((marker) => {
                    return (
                        <InfoWindow 
                            position = {{lat: marker.y, lng: marker.x}}
                            onCloseClick={async () => {
                                filteredMarker = await selectedMarkers.filter((marker1) => marker.venue !== marker1.venue)
                            }}
                        >
                            <div>
                                <h2>{marker.venue}</h2>
                                <p>{firstLocation !== null && secondLocation !== null ? marker.venue === firstLocation.venue ? "First Location" : marker.venue === secondLocation.venue ? "Second Location" : "" : ""}</p>
                            </div>
                        </InfoWindow>
                    )
                }) : null}
                {selectedBusStops ? selectedBusStops.map((busStop, index) => {
                    let details = ""
                    return (
                        <InfoWindow
                            key={index}
                            className="busstop"
                            position = {{lat: busStop.location[0] + 0.00020, lng: busStop.location[1]}}
                            onCloseClick={async () => {
                                filteredBusStop = await selectedBusStops.filter((busStop1) => busStop.name !== busStop1.name)
                            }}
                        >
                            <div>
                                <h2>{busStop.name}</h2>
                                <hr />
                                {busStop.routes.map((bus, index) => {
                                    if(index === busStop.routes.length - 1) {
                                        details += bus 
                                    } else {
                                        details += bus + ", "
                                    }
                                }
                                )}
                                <div>{details}</div>
                            </div>
                        </InfoWindow>
                    )
                }) : null}
                </GoogleMap>
            </div>
    )
        
}

export default MainMap;

