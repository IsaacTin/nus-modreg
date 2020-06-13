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

    const {
        filtered,
        selection,
        deleteSelection,
        clearSelection
    } = searchContext;
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

    const onClickConfirm = (e) => {
        e.preventDefault();
        if (selection.length === 0) {
            // notify user that no modules have been selected
        }
        addModules(selection);
        // might need to check why error becomes undefined ah
        if (error === null || error === undefined) {
            clearSelection();
            setDisplaySelection([]);
            // notify user that selection has succesfully been added
        } else {
            // print out the stupid error
        }
    };

    const onDelete = (e, module) => {
        e.preventDefault();
        deleteSelection(module);
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
            <ul className='container grid-4'>
                {displaySelection.length !== 0 &&
                    displaySelection.map((module) => (
                        <li key={module._id} className='card text-left'>
                            {module.moduleName}
                            {` (${module.moduleCode}) `}
                            <button
                                className='btn btn-sm btn-danger'
                                onClick={(e) => onDelete(e, module)}
                            >
                                <i className='fas fa-times-circle'></i>
                            </button>
                        </li>
                    ))}
            </ul>
            <button className='btn btn-light' onClick={onClickConfirm}>
                Confirm Modules
            </button>
        </Fragment>
    );
};

export default SearchModules;
