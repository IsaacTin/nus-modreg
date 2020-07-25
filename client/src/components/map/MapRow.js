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

    const handleClickSingle = (index) => {
        setFirstLocation(currentCoords[index]);
        setSecondLocation(null)
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
                        {`${currentCoords[index].moduleCode}, 
                        ${currentCoords[index].lessonType === 'Tutorial'
                            ? 'TUT'
                            : currentCoords[index].lessonType === 'Laboratory'
                            ? 'LAB'
                            : currentCoords[index].lessonType === 'Lecture'
                            ? 'LEC'
                            : currentCoords[index].lessonType === 'Recitation'
                            ? 'REC'
                            : ''
                        }
                        ${currentCoords[index].classNo}`}
                        <br/>
                        {currentCoords[index].venue}
                    </Table.Cell>
                    <Table.Cell>
                        {`${currentCoords[index + 1].moduleCode}, 
                        ${currentCoords[index + 1].lessonType === 'Tutorial'
                            ? 'TUT'
                            : currentCoords[index + 1].lessonType === 'Laboratory'
                            ? 'LAB'
                            : currentCoords[index + 1].lessonType  === 'Lecture'
                            ? 'LEC'
                            : currentCoords[index + 1].lessonType  === 'Recitation'
                            ? 'REC'
                            : ''
                        } 
                        ${currentCoords[index].classNo}`}
                        <br/>
                        {currentCoords[index + 1].venue}
                    </Table.Cell>
                    <Table.Cell>
                        {nearestBusStops !== null ? findBuses(nearestBusStops) : "Walk"}
                    </Table.Cell>
                </Table.Row>
            );
    } else if (index === 0) {
        return ( 
            <Table.Row
                onClick={() => handleClickSingle(index)}
                active={coords === firstLocation}
            >
                <Table.Cell>
                    {index + 1}
                </Table.Cell>
                <Table.Cell>
                    {`${currentCoords[index].moduleCode}, 
                    ${currentCoords[index].lessonType === 'Tutorial'
                        ? 'TUT'
                        : currentCoords[index].lessonType === 'Laboratory'
                        ? 'LAB'
                        : currentCoords[index].lessonType === 'Lecture'
                        ? 'LEC'
                        : currentCoords[index].lessonType === 'Recitation'
                        ? 'REC'
                        : ''
                    }
                    ${currentCoords[index].classNo}`}
                    <br/>
                    {currentCoords[index].venue}
                </Table.Cell>
                <Table.Cell>
                    -
                </Table.Cell>
                <Table.Cell>
                    -
                </Table.Cell>
            </Table.Row>
        );
    } else {
        return (
            null
        );
    }
}
 
export default MapRow;