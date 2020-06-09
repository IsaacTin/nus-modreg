import React, { useContext, useEffect } from 'react';
import SearchModuleFilter from '../search/SearchModuleFilter';
import Sidebar from '../sidebar/Sidebar';
import SearchModules from '../search/SearchModules';
import Nusmods from '../nusmods/Nusmods';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="homepage">
            <Nusmods />
            <SearchModuleFilter />
            <Sidebar />
        </div>
    );
};

export default Home;
