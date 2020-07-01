import React, { useContext, useState, useEffect, Fragment } from 'react';
import AlertContext from '../../context/alert/alertContext';
import SearchContext from '../../context/search/searchContext';
import PropTypes from 'prop-types';

const ModuleItem = (props) => {
    const alertContext = useContext(AlertContext);
    const searchContext = useContext(SearchContext);

    const { title, moduleCode, moduleCredit, semesterData } = props.module;
    const { setAlert } = alertContext;
    const { addSelection, selection } = searchContext;

    const [selectedModule, setSelectedModule] = useState('');

    // might need to get from config
    const BIDDING_ROUND = 'ROUND_1';

    const onChange = (e) => {
        setSelectedModule(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const jsonModule = JSON.parse(selectedModule);
        const duplicates = selection.filter((lesson) => {
            return (
                moduleCode === lesson.moduleCode &&
                jsonModule.lessonType === lesson.lessonType &&
                jsonModule.classNo === lesson.classNo
            );
        });
        if (duplicates.length === 0) {
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
            addSelection(formattedModule);
        } else {
            // throw alert
            let duplicatedModules = '';
            duplicates.forEach((mod, index) => {
                duplicatedModules += `${mod.moduleCode} (Class Slot ${mod.classNo})`;
                if (index !== duplicates.length - 1) {
                    duplicatedModules += ', ';
                }
            });
            setAlert(
                `${duplicatedModules} ${
                    duplicates.length === 1 ? 'has' : 'have'
                } already been selected.`,
                'danger'
            );
            console.log(duplicates);
        }
    };

    const mergeSameClassNoTimings = (timetable) => {
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
