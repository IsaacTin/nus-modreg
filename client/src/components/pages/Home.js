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
    }, []);

    return (
        <div>
            <Nusmods />
            <SearchModuleFilter />
            <SearchModules />
            <Sidebar />
        </div>
    );
};

export default Home;
