import React, { useContext } from 'react';
import Sidebar from '../sidebar/Sidebar';
import LayoutContext from '../../context/layout/layoutContext';

const Location = () => {
    const layoutContext = useContext(LayoutContext);
    const { isSidebarOpen } = layoutContext;
    return (
        <div>
            <Sidebar />
            <div className={isSidebarOpen ? 'main-shift' : 'main'}>
                Location planning with Google Maps API
            </div>
        </div>
    );
};

export default Location;
