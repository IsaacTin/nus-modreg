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

    const { filtered, selection } = searchContext;
    const { addModule } = moduleContext;

    // add comment hi
    // add comment bye
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

    if (filtered !== null && display.length === 0) {
        return <h4>No module found.</h4>;
    }

    return (
        <Fragment>
            <TransitionGroup>
                <div className='grid-3'>
                    {display.length !== 0 &&
                        display.map((module) => (
                            <CSSTransition
                                key={module._id}
                                timeout={500}
                                classNames='item'
                            >
                                <ModuleItem key={module._id} module={module} />
                            </CSSTransition>
                        ))}
                </div>
            </TransitionGroup>
            <ul className='container'>
                {selection.length !== 0 &&
                    selection.map((module) => <li>{module}</li>)}
            </ul>
        </Fragment>
    );
};

export default SearchModules;
