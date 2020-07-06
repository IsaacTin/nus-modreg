import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import MapContext from '../../context/map/mapContext'

const MapMenu = () => {
    const { setDay, day } = useContext(MapContext);

    return ( 
        <Menu
            widths='5'
        >
            <Menu.Item
                onClick={() => setDay("Monday")}
                active={day === "Monday"}
            >
                Monday
            </Menu.Item>
            <Menu.Item
                onClick={() => setDay("Tuesday")}
                active={day === "Tuesday"}
            >
                Tuesday
            </Menu.Item>
            <Menu.Item
                onClick={() => setDay("Wednesday")}
                active={day === "Wednesday"}
            >
                Wednesday
            </Menu.Item>
            <Menu.Item
                onClick={() => setDay("Thursday")}
                active={day === "Thursday"}
            >
                Thursday
            </Menu.Item>
            <Menu.Item
                onClick={() => setDay("Friday")}
                active={day === "Friday"}
            >
                Friday
            </Menu.Item>
        </Menu>
     );
}
 
export default MapMenu;