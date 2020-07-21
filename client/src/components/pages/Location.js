import React, { useContext, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import LayoutContext from '../../context/layout/layoutContext';
import MainMap from '../map/MainMap';
import MapMenu from '../map/MapMenu';
import MapTable from '../map/MapTable';
import MapContext from '../../context/map/mapContext';

const Location = () => {
    const layoutContext = useContext(LayoutContext);
    const { isSidebarOpen } = layoutContext;

    const {getBusStops, } = useContext(MapContext);

    useEffect(() => {
        getBusStops();
    // eslint-disable-next-line
    }, [])


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
