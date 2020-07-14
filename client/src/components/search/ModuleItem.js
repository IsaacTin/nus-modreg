import React, { useContext, useState, Fragment } from 'react';
import Select from 'react-select';
import AlertContext from '../../context/alert/alertContext';
import SearchContext from '../../context/search/searchContext';
import arrayMove from 'array-move';
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

    const onChange = (e) => setSelectedModule(e.value);

    const onSubmit = (e) => {
        e.preventDefault();
        if (selectedModule === '') {
            console.log('no timing selected');
            setAlert('No timeslot selected', 'danger');
        } else {
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
                console.log('salah bro');
            }
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

                // sort according to days
                // result[existingIndex].day.sort((classDayA, classDayB) => {
                //     const sortByDay = (day) => {
                //         switch (day) {
                //             case 'Monday':
                //                 return 1;
                //             case 'Tuesday':
                //                 return 2;
                //             case 'Wednesday':
                //                 return 3;
                //             case 'Thursday':
                //                 return 4;
                //             case 'Friday':
                //                 return 5;
                //             default:
                //                 return 0;
                //         }
                //     };
                //     console.log('wassup im sorting');
                //     return sortByDay(classDayA) - sortByDay(classDayB);
                // });
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

        mergedTimetable.sort((firstClass, secondClass) => {
            return firstClass.classNo - secondClass.classNo;
        });
        // .sort((firstClass, secondClass) => {
        //     const convertDayToNumber = (day) => {
        //         switch (day) {
        //             case 'Monday':
        //                 return 1;
        //             case 'Tuesday':
        //                 return 2;
        //             case 'Wednesday':
        //                 return 3;
        //             case 'Thursday':
        //                 return 4;
        //             case 'Friday':
        //                 return 5;
        //         }
        //     };
        //     return (
        //         convertDayToNumber(firstClass) -
        //         convertDayToNumber(secondClass)
        //     );
        // });
        const convertDayToNumber = (day) => {
            switch (day) {
                case 'Monday':
                    return 1;
                case 'Tuesday':
                    return 2;
                case 'Wednesday':
                    return 3;
                case 'Thursday':
                    return 4;
                case 'Friday':
                    return 5;
            }
        };
        console.log(mergedTimetable);
        mergedTimetable.forEach((lesson) => {
            for (let i = 0; i < lesson.day.length - 1; i++) {
                for (let j = i + 1; j < lesson.day.length; j++) {
                    if (
                        convertDayToNumber(lesson.day[i]) -
                            convertDayToNumber(lesson.day[j]) >
                        0
                    ) {
                        const tempDay = lesson.day[i];
                        const tempStartTime = lesson.startTime[i];
                        const tempEndTime = lesson.endTime[i];
                        lesson.day[i] = lesson.day[j];
                        lesson.day[j] = tempDay;
                        lesson.startTime[i] = lesson.startTime[j];
                        lesson.startTime[j] = tempStartTime;
                        lesson.endTime[i] = lesson.endTime[j];
                        lesson.endTime[j] = tempEndTime;
                    }
                }
            }
        });
    }

    // useEffect(() => {
    //     if (mergedTimetable) {
    //         setSelectedModule(JSON.stringify(mergedTimetable[0]));
    //     }
    //     //eslint-disable-next-line
    // }, []);

    const stringOptions = mergedTimetable.map((timeslot) => {
        let lessonName;
        switch (timeslot.lessonType) {
            case 'Tutorial':
                lessonName = 'TUT';
                break;
            case 'Laboratory':
                lessonName = 'LAB';
                break;
            case 'Lecture':
                lessonName = 'LEC';
                break;
            case 'Sectional Teaching':
                lessonName = 'SEC';
                break;
            case 'Recitation':
                lessonName = 'REC';
                break;
            case 'Seminar-Style Module Class':
                lessonName = 'SEM';
                break;
            default:
                lessonName = '';
        }
        let option = `${lessonName} [${timeslot.classNo}]:`;
        timeslot.venue.forEach((venue, index) => {
            let separator;
            index !== timeslot.venue.length - 1
                ? (separator = ' and')
                : (separator = '');

            option += ` ${timeslot.day[index]}, ${timeslot.startTime[index]} - ${timeslot.endTime[index]} at ${venue} ${separator}`;
        });
        return { value: JSON.stringify(timeslot), label: option };
    });

    return (
        <div className='card text-left result-card'>
            <div id='class-info'>
                {`${title} (${moduleCode})`}
                {/* <br /> */}
                <div style={{ fontWeight: '900' }}>{`${moduleCredit} MCs`}</div>
            </div>

            {mergedTimetable && (
                <Fragment>
                    <label>{`Timeslot for classes:`}</label>
                    <form onSubmit={onSubmit}>
                        <Select
                            placeholder='Select Class Slot'
                            defaultValue={selectedModule}
                            options={stringOptions}
                            onChange={onChange}
                        />
                        <input
                            type='submit'
                            value='Add module'
                            className='btn btn-light'
                            style={{ margin: '0.5rem 0' }}
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
