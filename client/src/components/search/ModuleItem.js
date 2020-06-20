import React, { useContext } from 'react';
import SearchContext from '../../context/search/searchContext';
import PropTypes from 'prop-types';

const ModuleItem = (props) => {
    const searchContext = useContext(SearchContext);

    const { title, moduleCode, moduleCredit } = props.module;
    const { addSelection, selection } = searchContext;

    const onClick = (e) => {
        e.preventDefault();
        if (
            selection.length === 0 ||
            !selection.includes(props.module._id.toString())
        ) {
            addSelection(props.module);
        } else {
            // change to alert with alert context
            console.log('salah la bro');
        }
    };

    return (
        <button className='card text-left' onClick={onClick}>
            <div>{title}</div>
            <div>{moduleCode}</div>
            <div>{`${moduleCredit} MCs`}</div>
        </button>
    );
};

ModuleItem.propTypes = {
    moduleName: PropTypes.string,
    moduleCode: PropTypes.string,
    moduleCredits: PropTypes.number
};

export default ModuleItem;
