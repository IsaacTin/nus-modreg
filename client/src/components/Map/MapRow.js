import React, { useContext } from 'react';
import MapContext from '../../context/map/mapContext';
import { Table } from 'semantic-ui-react';
import checker from '../../utils/checker';

const MapRow = ({index, coords}) => {
    const {currentCoords, setFirstLocation, setSecondLocation, firstLocation, setLoaded, setFirstNearest, setSecondNearest, busStops} = useContext(MapContext);


    const handleClick = (index) => {
        setFirstLocation(currentCoords[index])
        setSecondLocation(currentCoords[index + 1])
        setLoaded(false)
        setFirstNearest(null);
        setSecondNearest(null);
    }

    const findBuses = (buses) => {
        let info = "";
        const firstBuses = buses[0].routes;
        console.log(buses)
        const secondBuses = buses[1].routes;
        for (let i = 0; i < firstBuses.length; i++) {
            for(let k = 0; k < secondBuses.length; k++) {
                if(firstBuses[i] === secondBuses[k] && i !== firstBuses.length - 1) {
                    info += firstBuses[i] + " "
                } else if (firstBuses[i] === secondBuses[k]) {
                    info += firstBuses[i]
                }
            }
        }
        if (info === "") {
            return "Need to transfer buses. Data not available"
        } else {
            return info;
        }
    }

    const nearestBusStops = currentCoords.length > 1 && index !== currentCoords.length - 1 ? checker(currentCoords[index], currentCoords[index + 1], busStops) : null;
    
    if(index !== currentCoords.length - 1 && currentCoords.length > 1) {
        return ( 
                <Table.Row
                    onClick={() => handleClick(index)}
                    active={coords === firstLocation}
                >
                    <Table.Cell>
                        {index + 1}
                    </Table.Cell>
                    <Table.Cell>
                        {currentCoords[index].venue}
                    </Table.Cell>
                    <Table.Cell>
                        {currentCoords[index + 1].venue}
                    </Table.Cell>
                    <Table.Cell>
                        {nearestBusStops !== null ? findBuses(nearestBusStops) : "Walk"}
                    </Table.Cell>
                </Table.Row>
            );
    } else {
        return null;
    }
}
 
export default MapRow;