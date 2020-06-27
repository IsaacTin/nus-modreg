import React, { Fragment, useContext, useEffect, useState } from 'react';
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
    // used to toggle spinner - logic problem?
    const [searching, setSearching] = useState(false);

    const {
        filtered,
        selection,
        deleteSelection,
        clearSelection,
        isSearchedFalse
    } = searchContext;
    const { currentModules, addModules, error } = moduleContext;

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
         // eslint-disable-next-line
    }, [filtered, selection]);

    if (filtered !== null && displaySearchResults.length === 0 && !searching) {
        return <h4>No module found.</h4>;
    }

    const onClickConfirm = (e) => {
        e.preventDefault();
        if (selection.length === 0) {
            // notify user that no modules have been selected
        }
        // check if currentModules alr has any of the modules currently being selected, else proceed
        // maybe can change to something more efficient? lol
        const duplicates = currentModules.filter((module) => {
            let isDuplicate = false;
            selection.forEach((lesson) => {
                if (
                    module.moduleCode === lesson.moduleCode &&
                    module.lessonType === lesson.lessonType &&
                    module.classNo === lesson.classNo
                ) {
                    isDuplicate = true;
                }
            });
            return isDuplicate;
        });
        if (duplicates.length === 0) {
            addModules(selection);
            // might need to check why error becomes undefined ah
            if (error === null || error === undefined) {
                clearSelection();
                // notify user that selection has succesfully been added
            } else {
                // print out the stupid error
            }
        } else {
            console.log('there are duplicates u idiot');
            console.log(duplicates);
        }
    };

    const onDelete = (e, module) => {
        e.preventDefault();
        deleteSelection(module);
    };

    return (
        <Fragment>
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
                                        <ModuleItem
                                            key={index}
                                            module={module}
                                        />
                                ))}
                    </div>
                )}
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
