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
            // setText('');
        } else {
            // throw alert
        }
    };

    return (
        <div className='searchbar'>
            <TimeFilters />
            <form onSubmit={onSubmit}>
                <br />
                <Input
                    fluid
                    type='text'
                    iconPosition='left'
                    placeholder='Search for modules by name or code'
                    value={text}
                    onChange={onChange}
                >
                    <Icon name='search' />
                    <input />
                </Input>
                <br />
                <input type='submit' value='Search' className='btn btn-dark' />
                <button className='btn btn-light' onClick={() => setText('')}>
                    Clear Search
                </button>
            </form>
        </div>
    );
};

export default SearchModuleFilter;
