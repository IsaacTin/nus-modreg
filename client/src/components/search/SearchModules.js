import React, { Fragment, useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ModuleItem from './ModuleItem';
import SearchContext from '../../context/search/searchContext';
import ModuleContext from '../../context/module/moduleContext';
import moduleArrayConverter from '../../utils/moduleArrayConverter';

const SearchModules = () => {
    const searchContext = useContext(SearchContext);
    const moduleContext = useContext(ModuleContext);

    const [display, setDisplay] = useState([]);

    const { filtered } = searchContext;
    const { addModule } = moduleContext;

    useEffect(() => {
        if (filtered !== null) {
            const fetchDisplay = async () => {
                setDisplay(await moduleArrayConverter(filtered));
            };
            fetchDisplay();
        } else {
            setDisplay([]);
        }
    }, [filtered]);

    if (filtered !== null && filtered.length === 0) {
        return <h4>No module found.</h4>;
    }

    return (
        <div className='grid-3'>
            {display.length !== 0 &&
                display.map((module) => (
                    <ModuleItem key={module._id} module={module} />
                ))}
        </div>
    );
};

export default SearchModules;
