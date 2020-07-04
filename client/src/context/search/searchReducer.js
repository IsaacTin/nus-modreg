import {
    FILTER_MODULES,
    FILTER_ERROR,
    CLEAR_FILTER,
    ADD_SELECTION,
    CLEARALL_SELECTION,
    DELETE_SELECTION,
    IS_SEARCHED_TRUE,
    IS_SEARCHED_FALSE,
    ADD_TIME_FILTER,
    DELETE_TIME_FILTER,
    CLEAR_ALL_TIME_FILTERS
} from '../types';

const addTimeFilter = (timings, timeFilter) => {
    let result = [...timeFilter];
    let dayIndex;
    switch (timings[0]) {
        case 'Monday':
            dayIndex = 0;
            break;
        case 'Tuesday':
            dayIndex = 1;
            break;
        case 'Wednesday':
            dayIndex = 2;
            break;
        case 'Thursday':
            dayIndex = 3;
            break;
        case 'Friday':
            dayIndex = 4;
            break;
        default:
            dayIndex = -1;
    }

    // remove duplicates
    result[dayIndex].startTime.push(timings[1]);
    result[dayIndex].endTime.push(timings[2]);
    result[dayIndex] = {
        startTime: [...new Set(result[dayIndex].startTime)],
        endTime: [...new Set(result[dayIndex].endTime)]
    };

    // check if it's one whole long timeslot
    result[dayIndex].startTime.forEach((startingTime, stIndex) => {
        result[dayIndex].endTime.forEach((endingTime, etIndex) => {
            if (startingTime === endingTime) {
                result[dayIndex].startTime.splice(stIndex, 1);
                result[dayIndex].endTime.splice(etIndex, 1);
            }
        });
    });

    // THIS IS NOT AN ERROR!! it needs to be passed through twice (i also dk why honestly...)
    result[dayIndex].startTime.forEach((startingTime, stIndex) => {
        result[dayIndex].endTime.forEach((endingTime, etIndex) => {
            if (startingTime === endingTime) {
                result[dayIndex].startTime.splice(stIndex, 1);
                result[dayIndex].endTime.splice(etIndex, 1);
            }
        });
    });
    console.log(result);
    return result;
};

const deleteTimeFilter = (timings, timeFilter) => {
    let dayIndex;
    const result = [...timeFilter];
    switch (timings[0]) {
        case 'Monday':
            dayIndex = 0;
            break;
        case 'Tuesday':
            dayIndex = 1;
            break;
        case 'Wednesday':
            dayIndex = 2;
            break;
        case 'Thursday':
            dayIndex = 3;
            break;
        case 'Friday':
            dayIndex = 4;
            break;
        default:
            dayIndex = -1;
    }

    const filtered = [...timeFilter];

    // must use while loop, if not there will be some weird thing going on with the splice method
    let i = 0;
    while (i < result[dayIndex].startTime.length) {
        const slotStartTime = result[dayIndex].startTime[i];
        const slotEndTime = result[dayIndex].endTime[i];

        console.log(`slotStartTime: ${slotStartTime}`);
        console.log(`slotEndTime: ${slotEndTime}`);

        if (slotStartTime === timings[1] && slotEndTime === timings[2]) {
            // if it matches exactly to the timeslot
            console.log(`case 1`);
            console.log(filtered[dayIndex].startTime.splice(i, 1));
            console.log(filtered[dayIndex].endTime.splice(i, 1));
        } else if (slotStartTime === timings[1] && slotEndTime > timings[2]) {
            // if the start time matches, but the current end time is lesser than the slot's => replace the slot's start time with the current end time
            // this kind of styles: x | o | o | o (x is the current slot)
            console.log(`case 2`);
            filtered[dayIndex].startTime.splice(i, 1, timings[2]);
        } else if (slotStartTime < timings[1] && slotEndTime === timings[2]) {
            // if the end time matches, but the current start time is greater than the slot's => replace the slot's end time with the current start time
            // this kind of styles: o | o | o | x (x is the current slot)
            console.log(`case 3`);
            filtered[dayIndex].endTime.splice(i, 1, timings[1]);
        } else if (slotStartTime < timings[1] && slotEndTime > timings[2]) {
            // if the current slot is in between a big slot
            // this kind of styles: o | x | o | o (x is the current slot)
            console.log(`case 4`);
            filtered[dayIndex] = {
                startTime: [...result[dayIndex].startTime, timings[2]].sort(),
                endTime: [...result[dayIndex].endTime, timings[1]].sort()
            };
            i++;
        } else {
            i++;
        }
    }

    // let matchStartTime = false;
    // let matchEndTime = false;

    // result[dayIndex].startTime.forEach((timing) => {
    //     if (timing === timings[1]) {
    //         matchStartTime = true;
    //     }
    // });
    // result[dayIndex].endTime.forEach((timing) => {
    //     if (timing === timings[2]) {
    //         matchEndTime = true;
    //     }
    // });

    // if (matchStartTime && matchEndTime) {
    //     const startIndex = result[dayIndex].startTime.indexOf(timings[1]);
    //     const endIndex = result[dayIndex].endTime.indexOf(timings[2]);
    //     result[dayIndex] = {
    //         startTime: result[dayIndex].startTime.splice(startIndex, 1),
    //         endTime: result[dayIndex].endTime.splice(endIndex, 1)
    //     };
    // } else if (matchStartTime && !matchEndTime) {
    //     const index = result[dayIndex].startTime.indexOf(timings[1]);
    //     result[dayIndex] = {
    //         startTime: result[dayIndex].startTime.splice(index, 1, timings[2]),
    //         endTime: result[dayIndex].endTime
    //     };
    // } else if (!matchStartTime && matchEndTime) {
    //     const index = result[dayIndex].endTime.indexOf(timings[2]);
    //     result[dayIndex] = {
    //         startTime: result[dayIndex].startTime,
    //         endTime: result[dayIndex].endTime.splice(index, 1, timings[1])
    //     };
    // } else {
    //     result[dayIndex].startTime.forEach((timing, index) => {
    //         if (
    //             timings[1] > timing &&
    //             timings[2] < result[dayIndex].endTime[index]
    //         ) {
    //             result[dayIndex].startTime.push(timings[2]);
    //             result[dayIndex].endTime.push(timings[1]);
    //         }
    //     });

    //     result[dayIndex] = {
    //         startTime: [...new Set(result[dayIndex].startTime)].sort(),
    //         endTime: [...new Set(result[dayIndex].endTime)].sort()
    //     };
    // }

    console.log(filtered);
    return filtered;
};

export default (state, action) => {
    switch (action.type) {
        case FILTER_MODULES:
            return {
                ...state,
                filtered: action.payload,
                searchLoading: false
            };
        case FILTER_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case ADD_TIME_FILTER:
            return {
                ...state,
                timeFilter: addTimeFilter(action.payload, state.timeFilter)
            };
        case DELETE_TIME_FILTER:
            return {
                ...state,
                timeFilter: deleteTimeFilter(action.payload, state.timeFilter)
            };
        case CLEAR_ALL_TIME_FILTERS:
            return {
                ...state,
                timeFilter: [
                    { startTime: [], endTime: [] },
                    { startTime: [], endTime: [] },
                    { startTime: [], endTime: [] },
                    { startTime: [], endTime: [] },
                    { startTime: [], endTime: [] }
                ]
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
                error: null,
                searchLoading: true
            };
        case IS_SEARCHED_TRUE:
            return {
                ...state,
                isSearched: true
            };
        case IS_SEARCHED_FALSE:
            return {
                ...state,
                isSearched: false
            };
        case ADD_SELECTION:
            return {
                ...state,
                selection: [...state.selection, action.payload]
            };
        case DELETE_SELECTION:
            return {
                ...state,
                selection: state.selection.filter(
                    (module) =>
                        module.moduleCode !== action.payload.moduleCode ||
                        module.classNo !== action.payload.classNo
                )
            };
        case CLEARALL_SELECTION:
            return {
                ...state,
                selection: []
            };
        default:
            return state;
    }
};
