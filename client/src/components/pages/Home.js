import React, { useContext, useEffect } from 'react';
import SearchModuleFilter from '../search/SearchModuleFilter';
import Sidebar from '../sidebar/Sidebar';
import SearchModules from '../search/SearchModules';
import Nusmods from '../nusmods/Nusmods';
import AuthContext from '../../context/auth/authContext';
import LayoutContext from '../../context/layout/layoutContext';

import { CSSTransition } from 'react-transition-group';

const Home = () => {
    const authContext = useContext(AuthContext);
    const layoutContext = useContext(LayoutContext);

    const { isSidebarOpen } = layoutContext;

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <CSSTransition
            in={isSidebarOpen}
            appear
            timeout={300}
            classNames='shift'
        >
            <div className={isSidebarOpen ? 'shift' : ''}>
                <div className='container home-grid'>
                    <Nusmods className='timetable' />
                    <div className='search'>
                        <SearchModuleFilter />
                        <SearchModules />
                    </div>
                </div>

                <Sidebar />
            </div>
        </CSSTransition>
    );
};

export default Home;
