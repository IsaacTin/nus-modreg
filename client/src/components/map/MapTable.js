import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import MapContext from '../../context/map/mapContext';
import MapRow from './MapRow';

const MapTable = () => {
    const { currentCoords } = useContext(MapContext);

    if (currentCoords.length === 0) {
        return (
            <div>
                <h1>No Lessons Today</h1>
            </div>
        )
    } 

    return ( 
        <Table
            textAlign='center'
            selectable
        >
            <Table.Header>
                <Table.HeaderCell>
                    Trip no.
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Start Point
                </Table.HeaderCell>
                <Table.HeaderCell>
                    End Point
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Buses
                </Table.HeaderCell>
            </Table.Header>

            <Table.Body>
            {currentCoords.map((coords, index) => {
                return (
                    <MapRow key={index} index={index} coords={coords}/>
                )
            })}
            </Table.Body>
        </Table>
     );
}
 
export default MapTable;