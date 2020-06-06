import React, { useEffect, useContext } from 'react';
import SearchContext from '../../context/search/searchContext';
import PropTypes from 'prop-types';

const ModuleItem = (props) => {
    const searchContext = useContext(SearchContext);

    const { moduleName, moduleCode, moduleCredits } = props.module;
    const { addSelection, clearSelection, selection } = searchContext;

    const onClick = (e) => {
        e.preventDefault();
        if (
            selection.length === 0 ||
            !selection.includes(props.module._id.toString())
        ) {
            addSelection(props.module);
        } else {
            console.log('salah la bro');
        }
    };

    useEffect(() => {
        console.log(selection);
    });
    return (
        <button className='card text-left' onClick={onClick}>
            <div>{moduleName}</div>
            <div>{moduleCode}</div>
            <div>{moduleCredits}</div>
        </button>
    );
};

ModuleItem.propTypes = {
    moduleName: PropTypes.string,
    moduleCode: PropTypes.string,
    moduleCredits: PropTypes.number
};

export default ModuleItem;
