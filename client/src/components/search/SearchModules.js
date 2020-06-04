import React, { useContext } from 'react';
import ModuleContext from '../../context/module/moduleContext';
import SearchModuleFilter from './SearchModuleFilter';

const SearchModules = () => {
    const moduleContext = useContext(ModuleContext);

    const { addModule } = moduleContext;
    return (
        <div>
            <SearchModuleFilter />
            This is SearchModules
        </div>
    );
};

export default SearchModules;
