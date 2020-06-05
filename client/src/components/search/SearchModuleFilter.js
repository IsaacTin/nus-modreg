import React, { useContext, useEffect, useRef } from 'react';
import SearchContext from '../../context/search/searchContext';

const SearchModuleFilter = () => {
    const searchContext = useContext(SearchContext);
    const text = useRef('');

    const { filtered, filterModules, clearFilter } = searchContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = (e) => {
        if (text.current.value !== '') {
            filterModules(e.target.value);
        } else {
            clearFilter();
        }
    };
    return (
        <form>
            <input
                ref={text}
                type='text'
                placeholder='Search for modules...'
                onChange={onChange}
            />
        </form>
    );
};

export default SearchModuleFilter;
