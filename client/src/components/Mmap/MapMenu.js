import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import MapContext from '../../context/map/mapContext'
import ModuleContext from '../../context/module/moduleContext';
import coordsArrayConverter from  '../../utils/coordsArrayConverter';

const MapMenu = () => {
    const {setDay, day, setCoords} = useContext(MapContext);
    const {displayedModules} = useContext(ModuleContext)

    const handleClick = (day) => {
        setDay(day);
        if (displayedModules.length !== 0 && day !== null) {
            let temp = [];
            displayedModules.forEach((module) => {
                if (
                    module.timing.filter((timeslot) => timeslot.day === day)
                        .length !== 0
                ) {
                    temp.push(module);
                }
            });
            console.log(temp);
            const fetchCoords = async () => {
                setCoords(await coordsArrayConverter(temp, day));
            };
            fetchCoords();
        }
    }

    return ( 
        <Menu
            widths='5'
        >
            <Menu.Item
                onClick={() => handleClick("Monday")}
                active={day === "Monday"}
            >
                Monday
            </Menu.Item>
            <Menu.Item
                onClick={() => handleClick("Tuesday")}
                active={day === "Tuesday"}
            >
                Tuesday
            </Menu.Item>
            <Menu.Item
                onClick={() => handleClick("Wednesday")}
                active={day === "Wednesday"}
            >
                Wednesday
            </Menu.Item>
            <Menu.Item
                onClick={() => handleClick("Thursday")}
                active={day === "Thursday"}
            >
                Thursday
            </Menu.Item>
            <Menu.Item
                onClick={() => handleClick("Friday")}
                active={day === "Friday"}
            >
                Friday
            </Menu.Item>
        </Menu>
     );
}
 
export default MapMenu;