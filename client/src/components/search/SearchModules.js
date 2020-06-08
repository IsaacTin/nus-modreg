import React, { Fragment, useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ModuleItem from './ModuleItem';
import SearchContext from '../../context/search/searchContext';
import ModuleContext from '../../context/module/moduleContext';
import moduleArrayConverter from '../../utils/moduleArrayConverter';

const SearchModules = () => {
    const searchContext = useContext(SearchContext);
    const moduleContext = useContext(ModuleContext);

    const [displaySearchResults, setDisplaySearchResults] = useState([]);
    const [displaySelection, setDisplaySelection] = useState([]);

    const { filtered, selection } = searchContext;
    const { addModules, error } = moduleContext;

    useEffect(() => {
        if (filtered !== null) {
            const fetchSearch = async () => {
                setDisplaySearchResults(await moduleArrayConverter(filtered));
            };
            fetchSearch();
        } else {
            setDisplaySearchResults([]);
        }

        if (selection.length !== 0) {
            const fetchSelection = async () => {
                setDisplaySelection(await moduleArrayConverter(selection));
            };
            fetchSelection();
        } else {
            setDisplaySelection([]);
        }
    }, [filtered, selection]);

    if (filtered !== null && displaySearchResults.length === 0) {
        return <h4>No module found.</h4>;
    }

    const onClick = (e) => {
        e.preventDefault();
        addModules(selection);
        // might need to check why error becomes undefined ah
        if (error === null || error === undefined) {
            setDisplaySelection([]);
            console.log(displaySelection);
            // notify user that selection has succesfully been added
        } else {
            // print out the stupid error
        }
    };

    return (
        <Fragment>
            <TransitionGroup>
                <div className='grid-3'>
                    {displaySearchResults.length !== 0 &&
                        displaySearchResults.map((module) => (
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
            <ul className='container' style={{ display: 'flex' }}>
                {displaySelection.length !== 0 &&
                    displaySelection.map((module) => (
                        <li className='card'>
                            {module.moduleName}
                            {` (${module.moduleCode})`}
                        </li>
                    ))}
            </ul>
            <button className='btn btn-light' onClick={onClick}>
                Confirm Modules
            </button>
        </Fragment>
    );
};

export default SearchModules;
