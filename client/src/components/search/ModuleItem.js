import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ModuleItem = (props) => {
    const { moduleName, moduleCode, moduleCredits } = props.module;
    const [module, setModule] = useState({});

    useEffect(() => {
        if (module) {
            setModule(module);
            console.log(module);
        }
    }, []);

    const onClick = (e) => {
        e.preventDefault();
        console.log('click click');
        setModule(props.module);
    };
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
