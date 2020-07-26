import React, { useContext, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import LayoutContext from '../../context/layout/layoutContext';
import MainMap from '../map/MainMap';
import MapMenu from '../map/MapMenu';
import MapTable from '../map/MapTable';
import MapContext from '../../context/map/mapContext';
import ModuleContext from '../../context/module/moduleContext';
import coordsArrayConverter from  '../../utils/coordsArrayConverter';


const Location = () => {
    const layoutContext = useContext(LayoutContext);
    const { isSidebarOpen } = layoutContext;

    const {getBusStops, setCoords, setDay, day, currentCoords} = useContext(MapContext);
    const {displayedModules} = useContext(ModuleContext)

    useEffect(() => {
        getBusStops();
            if(day === null) {
                setDay("Monday");
            }
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (displayedModules.length !== 0 && day !== null && currentCoords.length === 0) {
            let temp = [];
            displayedModules.forEach((module) => {
                if (
                    module.timing.filter((timeslot) => timeslot.day === day)
                        .length !== 0
                ) {
                    temp.push(module);
                }
            });
            console.log(day)
            console.log(temp);
            const fetchCoords = async () => {
                setCoords(await coordsArrayConverter(temp, day));
            };
            fetchCoords();
        }
    },[currentCoords, day])


    return (
        <div>
            <Sidebar />
            <div className={isSidebarOpen ? 'main-shift' : 'main'}>
            </div>
            <MainMap />
            <MapMenu />
            <MapTable />
        </div>
    );
};

export default Location;
