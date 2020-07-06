import React, { useContext } from 'react';
import MapContext from '../../context/map/mapContext';
import { Table } from 'semantic-ui-react';

const MapRow = ({index, coords}) => {
    const {currentCoords, setFirstLocation, setSecondLocation, firstLocation} = useContext(MapContext);

    /*const handleClick = (index) => {
        setFirstLocation(currentCoords(index))
        setSecondLocation(currentCoords(index + 1))
    }*/

    const handleClick = (index) => {
        setFirstLocation(currentCoords[index])
        setSecondLocation(currentCoords[index + 1])
    }
    
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
                        Distance
                    </Table.Cell>
                </Table.Row>
            );
    } else {
        return null;
    }
}
 
export default MapRow;