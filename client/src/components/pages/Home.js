import React, { useContext, useEffect } from 'react';
import SearchModuleFilter from '../search/SearchModuleFilter';
import Sidebar from '../sidebar/Sidebar';
import SearchModules from '../search/SearchModules';
import Nusmods from '../nusmods/Nusmods';
import AuthContext from '../../context/auth/authContext';
import LayoutContext from '../../context/layout/layoutContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    const layoutContext = useContext(LayoutContext);

    const { isSidebarOpen } = layoutContext;

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div id='main' className='home-grid'>
            <div className={isSidebarOpen ? 'main-shift' : 'main'}>
                <Nusmods className='timetable' />
                <div className='search'>
                    <SearchModuleFilter />
                    <SearchModules />
                </div>
            </div>
            <Sidebar />
        </div>
    );
};

export default Home;
