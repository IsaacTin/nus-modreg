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
                This is location 
            </div>
        </div>
    );
};

export default Location;
