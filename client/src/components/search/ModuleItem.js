import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ModuleItem = (props) => {
    const { moduleName, moduleCode, moduleCredits } = props.module;
    return (
        <div className='card text-center'>
            <div>{moduleName}</div>
            <div>{moduleCode}</div>
            <div>{moduleCredits}</div>
        </div>
    );
};

ModuleItem.propTypes = {
    moduleName: PropTypes.string,
    moduleCode: PropTypes.string,
    moduleCredits: PropTypes.number
};

export default ModuleItem;
