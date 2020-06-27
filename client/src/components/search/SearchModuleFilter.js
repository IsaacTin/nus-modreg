import React, { useContext, useState } from 'react';
import SearchContext from '../../context/search/searchContext';

const SearchModuleFilter = () => {
    const searchContext = useContext(SearchContext);
    // const text = useRef('');
    const [text, setText] = useState('');

    const {
        filterModules,
        clearFilter,
        isSearchedTrue
    } = searchContext;

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        clearFilter();
        isSearchedTrue();
        if (text !== '') {
            filterModules(text);
            setText('');
        } else {
            // throw alert
        }
    };

    return (
        <div className='searchbar'>
            <form onSubmit={onSubmit}>
                <input
                    name='text'
                    type='text'
                    placeholder='Search for modules by name or module code...'
                    value={text}
                    onChange={onChange}
                />
                <input type='submit' value='Search' className='btn btn-light' />
            </form>
        </div>
    );
};

export default SearchModuleFilter;
