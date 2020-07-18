import React, { Fragment, useContext, useEffect, useState } from 'react';
import ModuleItem from './ModuleItem';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import AlerContext from '../../context/alert/alertContext';
import SearchContext from '../../context/search/searchContext';
import ModuleContext from '../../context/module/moduleContext';
import moduleArrayConverter from '../../utils/moduleArrayConverter';
import classNameConverter from '../../utils/classNameConverter';
import dayToIndex from '../../utils/dayToIndex';

const SearchModules = () => {
    const alertContext = useContext(AlerContext);
    const searchContext = useContext(SearchContext);
    const moduleContext = useContext(ModuleContext);

    // displays all the search results from NUSmods API
    const [displaySearchResults, setDisplaySearchResults] = useState([]);
    // used to toggle spinner - logic problem?
    const [searching, setSearching] = useState(false);

    const { setAlert } = alertContext;
    const {
        filtered,
        clearFilter,
        timeFilter,
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
                const results = await moduleArrayConverter(filtered);
                setDisplaySearchResults(
                    filterByTime(
                        results.filter(
                            (module) =>
                                module !== null &&
                                module.semesterData.length > 0 &&
                                module.semesterData[0].timetable.length > 0
                        )
                    )
                );
                setSearching(false);
            };
            fetchSearch();
        } else {
            isSearchedFalse();
            setDisplaySearchResults([]);
        }
        // eslint-disable-next-line
    }, [filtered, selection, JSON.stringify(timeFilter)]);

    const filterByTime = (searchResults) => {
        // if all filters are empty, then just return the searchResults
        if (
            timeFilter.filter((day) => day.startTime.length !== 0).length === 0
        ) {
            return searchResults;
        }

        // console.log statement
        searchResults.forEach((module) => {
            module.semesterData[0].timetable.forEach((lesson) => {
                console.log(lesson);
            });
        });

        const results = searchResults.filter((module) => {
            module.semesterData[0].timetable = module.semesterData[0].timetable.filter(
                (lesson) => {
                    // what is lesson actually? --> contains the timetable data for each lesson slot
                    const dayIndex = dayToIndex(lesson.day);
                    // denotes other possible time slots for this same lesson
                    // assuming that the other time slots are not on the same day, then it will filter for this time slot
                    const otherTimeSlots = module.semesterData[0].timetable.filter(
                        (otherLesson) =>
                            lesson.classNo === otherLesson.classNo &&
                            lesson.lessonType === otherLesson.lessonType &&
                            lesson.day !== otherLesson.day
                    );
                    console.log('otherTimeSlots:');
                    console.log(otherTimeSlots);
                    return (
                        (lesson.lessonType === 'Lecture' ||
                            lesson.lessonType === 'Sectional Teaching') &&
                        // return if the start time and end time match that of the filters present
                        timeFilter[dayIndex].startTime.filter(
                            (dayStartTime, index) =>
                                dayStartTime <= lesson.startTime &&
                                timeFilter[dayIndex].endTime[index] >=
                                    lesson.endTime
                        ).length > 0 &&
                        // does this specific class slot still have other timings? if have, then do the slots fulfill the filter criteria?
                        (otherTimeSlots.length > 0
                            ? otherTimeSlots.filter((timeslot) => {
                                  console.log('timeslot:');
                                  console.log(timeslot);
                                  const otherDayIndex = dayToIndex(
                                      timeslot.day
                                  );
                                  console.log(`startTime`);
                                  return (
                                      timeFilter[
                                          otherDayIndex
                                      ].startTime.filter(
                                          (otherDayStartTime, otherIndex) =>
                                              otherDayStartTime <=
                                                  timeslot.startTime &&
                                              timeFilter[otherDayIndex].endTime[
                                                  otherIndex
                                              ] >= timeslot.endTime
                                      ).length > 0
                                  );
                              }).length > 0
                            : true)
                    );
                }
            );
            return module.semesterData[0].timetable.length > 0;
        });

        console.log('results:');
        console.log(results);

        return results;
    };

    // useEffect(() => {
    //     if (filtered !== null) {
    //         const fetchSearch = async () => {
    //             const results = await moduleArrayConverter(filtered);
    //             return results.filter(
    //                 (module) =>
    //                     module !== null &&
    //                     module.semesterData.length > 0 &&
    //                     module.semesterData[0].timetable.length > 0
    //             );
    //         };
    //         const results = fetchSearch();
    //         setDisplaySearchResults(filterByTime(results));
    //     }
    //     // eslint-disable-next-line
    // }, [JSON.stringify(timeFilter), filtered]);

    if (filtered !== null && displaySearchResults.length === 0 && !searching) {
        return <h4>No module found.</h4>;
    }

    const onClickConfirm = (e) => {
        e.preventDefault();
        // if (selection.length === 0) {
        //     // notify user that no modules have been selected
        //     setAlert('No modules selected', 'danger');
        // }
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
            if (error === null) {
                clearSelection();
                clearFilter();
                // notify user that selection has succesfully been added
            } else {
                // print out the stupid error
            }
        } else {
            setAlert(
                'Module with specified time slot is already in cart',
                'danger'
            );
        }
    };

    const onDelete = (e, module) => {
        e.preventDefault();
        deleteSelection(module);
    };

    return (
        <Fragment>
            <Alert />
            {searching ? (
                <Spinner />
            ) : (
                <div
                    className={`search-results-container ${
                        displaySearchResults.length !== 0
                            ? ' search-border '
                            : ''
                    }`}
                >
                    {displaySearchResults.length !== 0 && (
                        <div id='search-header'>
                            <h4>Search results</h4>{' '}
                            <i className='fas fa-search'></i>
                        </div>
                    )}
                    <div className='search-results-content grid-4'>
                        {displaySearchResults.length !== 0 &&
                            displaySearchResults.map((module, index) => (
                                <ModuleItem key={index} module={module} />
                            ))}
                    </div>
                </div>
            )}
            {/* perhaps abstract out the below code? */}
            <ul className='container grid-4'>
                {selection.length !== 0 &&
                    selection.map((module, index) => (
                        <li key={index} className='card text-left'>
                            {`${module.moduleCode}: ${classNameConverter(
                                module.lessonType
                            )} [${module.classNo}]`}
                            <br />
                            <button
                                className='btn btn-sm btn-danger'
                                onClick={(e) => onDelete(e, module)}
                            >
                                <i className='fas fa-times-circle'></i>
                            </button>
                        </li>
                    ))}
            </ul>
            {selection.length > 0 && (
                <button className='btn btn-light' onClick={onClickConfirm}>
                    Add to cart
                </button>
            )}
        </Fragment>
    );
};

export default SearchModules;
