import React, { useContext, useState, useEffect, Fragment } from 'react';
import SearchContext from '../../context/search/searchContext';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import { Result } from 'express-validator';

const ModuleItem = (props) => {
    const searchContext = useContext(SearchContext);

    const { title, moduleCode, moduleCredit, semesterData } = props.module;
    const { addSelection, selection } = searchContext;

    const [selectedModule, setSelectedModule] = useState('');

    console.log(props.module);
    // might need to get from config
    const BIDDING_ROUND = 'ROUND_1';

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

    const onChange = (e) => {
        console.log(JSON.parse(e.target.value));
        setSelectedModule(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const jsonModule = JSON.parse(selectedModule);
        console.log(jsonModule);
        const formattedModule = {
            moduleCode: moduleCode,
            title: title,
            lessonType: jsonModule.lessonType,
            classNo: jsonModule.classNo,
            size: jsonModule.size,
            timing: [...jsonModule.venue].map((venue, index) => {
                return {
                    startTime: jsonModule.startTime[index],
                    endTime: jsonModule.endTime[index],
                    day: jsonModule.day[index],
                    venue: venue
                };
            })
        };
        console.log(formattedModule);
        addSelection(formattedModule);
    };

    const mergeSameClassNoTimings = (timetable) => {
        console.log(timetable);
        const result = [];

        timetable.forEach((lesson) => {
            const existing = result.filter(
                (result) =>
                    result.classNo === lesson.classNo &&
                    result.lessonType === lesson.lessonType
            );
            // so if there is an existing classNo, then add the respective details to the arrays that you see below
            if (existing.length > 0) {
                const existingIndex = result.indexOf(existing[0]);
                // result[existingIndex].value = result[
                //     existingIndex
                // ].value.concat(lesson.value);
                result[existingIndex] = {
                    ...result[existingIndex],
                    startTime: [
                        ...result[existingIndex].startTime,
                        lesson.startTime
                    ],
                    endTime: [...result[existingIndex].endTime, lesson.endTime],
                    day: [...result[existingIndex].day, lesson.day],
                    venue: [...result[existingIndex].venue, lesson.venue]
                };
            } else {
                // if not, then convert all of them into arrays
                const formattedLesson = {
                    ...lesson,
                    startTime: [lesson.startTime],
                    endTime: [lesson.endTime],
                    day: [lesson.day],
                    venue: [lesson.venue]
                };
                result.push(formattedLesson);
            }
        });
        console.log(result);
        return result;
    };

    let mergedTimetable;

    if (semesterData.length > 0) {
        mergedTimetable = mergeSameClassNoTimings(
            semesterData[0].timetable
        ).filter((lesson) => {
            if (BIDDING_ROUND === 'ROUND_1') {
                return (
                    lesson.lessonType === 'Sectional Teaching' ||
                    lesson.lessonType === 'Lecture'
                );
            } else {
                return (
                    lesson.lessonType === 'Laboratory' ||
                    lesson.lessonType === 'Recitation' ||
                    lesson.lessonType === 'Tutorial'
                );
            }
        });
        console.log(props.module.moduleCode);
        console.log(mergedTimetable);
    }

    useEffect(() => {
        if (mergedTimetable) {
            setSelectedModule(JSON.stringify(mergedTimetable[0]));
        }
        //eslint-disable-next-line
    }, []);

    return (
        <div className='card text-left'>
            <div>{title}</div>
            <div>{moduleCode}</div>
            <div>{`${moduleCredit} MCs`}</div>
            {mergedTimetable && (
                <Fragment>
                    {/* might wanna change the word 'classes' to a conditional */}
                    <label>{`Timeslot for classes:`}</label>
                    <form onSubmit={onSubmit}>
                        <select value={selectedModule} onChange={onChange}>
                            {mergedTimetable.map((timeslot) => (
                                <option
                                    key={timeslot.classNo}
                                    value={JSON.stringify(timeslot)}
                                >
                                    {`Class ${timeslot.classNo}:`}
                                    {timeslot.venue.map((venue, index) => {
                                        let separator;

                                        index !== timeslot.venue.length - 1
                                            ? (separator = ';')
                                            : (separator = '');

                                        return ` ${venue} ${timeslot.day[index]} ${timeslot.startTime[index]} - ${timeslot.endTime[index]}${separator}`;
                                    })}
                                </option>
                            ))}
                        </select>
                        <input
                            type='submit'
                            value='Add module'
                            className='btn btn-light'
                        />
                    </form>
                </Fragment>
            )}
        </div>
    );
};

ModuleItem.propTypes = {
    moduleName: PropTypes.string,
    moduleCode: PropTypes.string,
    moduleCredits: PropTypes.number
};

export default ModuleItem;
