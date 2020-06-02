import React, { useContext, useRef } from 'react';
import ModuleItem from './ModuleItem';
import SearchContext from '../../context/search/searchContext';

const SearchModuleFilter = () => {
    const searchContext = useContext(SearchContext);
    const text = useRef('')

    const {filtered, filterModules, clearFilter} = searchContext;

    return ( 
        <div>
            <ModuleItem />
        </div>
     );
}
 
export default SearchModuleFilter