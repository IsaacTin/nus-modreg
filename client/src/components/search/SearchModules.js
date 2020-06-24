import React, { Fragment, useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ModuleItem from './ModuleItem';
import Spinner from '../layout/Spinner';
import SearchContext from '../../context/search/searchContext';
import ModuleContext from '../../context/module/moduleContext';
import moduleArrayConverter from '../../utils/moduleArrayConverter';

const SearchModules = () => {
    const searchContext = useContext(SearchContext);
    const moduleContext = useContext(ModuleContext);

    // displays all the search results from NUSmods API
    const [displaySearchResults, setDisplaySearchResults] = useState([]);
    // displays the modules that have currently been added to the selection
    const [displaySelection, setDisplaySelection] = useState([]);
    // used to toggle spinner - logic problem?
    const [searching, setSearching] = useState(false);

    const {
        filtered,
        selection,
        deleteSelection,
        clearSelection,
        searchLoading,
        isSearched,
        isSearchedFalse
    } = searchContext;
    const { addModules, error } = moduleContext;

    useEffect(() => {
        if (filtered !== null) {
            setSearching(true);
            const fetchSearch = async () => {
                setDisplaySearchResults(await moduleArrayConverter(filtered));
                setSearching(false);
            };
            fetchSearch();
        } else {
            isSearchedFalse();
            setDisplaySearchResults([]);
        }

        // if (selection.length !== 0) {
        //     const fetchSelection = async () => {
        //         setDisplaySelection(await moduleArrayConverter(selection));
        //     };
        //     fetchSelection();
        // } else {
        //     setDisplaySelection([]);
        // }
    }, [filtered, selection]);

    if (filtered !== null && displaySearchResults.length === 0 && !searching) {
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
                {searching ? (
                    <Spinner />
                ) : (
                    <div className='grid-3'>
                        {displaySearchResults.length !== 0 &&
                            displaySearchResults
                                .filter(
                                    (module) =>
                                        module.semesterData.length > 0 &&
                                        module.semesterData[0].timetable
                                            .length > 0
                                )
                                .map((module, index) => (
                                    <CSSTransition
                                        key={module._id}
                                        timeout={500}
                                        classNames='item'
                                    >
                                        <ModuleItem
                                            key={index}
                                            module={module}
                                        />
                                    </CSSTransition>
                                ))}
                    </div>
                )}
            </TransitionGroup>
            <ul className='container grid-4'>
                {selection.length !== 0 &&
                    selection.map((module, index) => (
                        <li key={index} className='card text-left'>
                            {module.title}
                            {` (${module.moduleCode}) `}
                            <br />
                            {`${module.lessonType} slot: ${module.classNo}`}
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
                Add to cart
            </button>
        </Fragment>
    );
};

export default SearchModules;
