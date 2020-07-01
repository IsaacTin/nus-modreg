import React from 'react'
import { Table } from 'semantic-ui-react';


const EmptySlot = ({startTime, endTIme}) => {
    return ( 
        <Table.Cell >
            <button className="tableCell">
                
            </button>
        </Table.Cell>
     );
}
 
export default EmptySlot;