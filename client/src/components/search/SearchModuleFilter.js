import React, { useContext, useState } from 'react';
import TimeFilters from './TimeFilters';
import SearchContext from '../../context/search/searchContext';
import { Input, Icon } from 'semantic-ui-react';

const SearchModuleFilter = () => {
    const searchContext = useContext(SearchContext);
    // const text = useRef('');
    const [text, setText] = useState('');

    const { filterModules, clearFilter, isSearchedTrue } = searchContext;

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
                {/* <input
                    name='text'
                    type='text'
                    placeholder='Search for modules by name or module code...'
                    value={text}
                    onChange={onChange}
                /> */}
                <br />
                <Input
                    fluid
                    type='text'
                    icon={<Icon name='search' />}
                    iconPosition='left'
                    placeholder='Search for modules by name or code'
                    value={text}
                    onChange={onChange}
                />
                <TimeFilters />
                {/* add cards for time filters too */}
                <br />
                <input type='submit' value='Search' className='btn btn-dark' />
                <button className='btn btn-light' onClick={() => setText('')}>
                    Clear
                </button>
            </form>
        </div>
    );
};

export default SearchModuleFilter;
