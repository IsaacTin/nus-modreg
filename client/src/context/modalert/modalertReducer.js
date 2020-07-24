import { SET_CONFLICT, REMOVE_CONFLICT, GET_CONFLICTS } from '../types';
import dayToIndex from '../../utils/dayToIndex';

export default (state, action) => {
    const getConflicts = (modules, day, conflicts) => {
        console.log(modules);
        const dayIndex = dayToIndex(day);
        const modulesByDay = [];
        modules.forEach((module) => {
            module.timing
                .filter((time) => time.day === day)
                .forEach((moduleTime) =>
                    modulesByDay.push({
                        ...moduleTime,
                        moduleCode: module.moduleCode,
                        classNo: module.classNo,
                        lessonType: module.lessonType
                    })
                );
        });

        console.log(`modulesByDay for ${day}`);
        console.log(modulesByDay);

        const dayConflicts = [];

        for (let i = 0; i < modulesByDay.length; i++) {
            for (let j = i + 1; j < modulesByDay.length; j++) {
                const firstModule = modulesByDay[i];
                const secondModule = modulesByDay[j];

                if (
                    (firstModule.startTime <= secondModule.startTime &&
                        firstModule.endTime >= secondModule.endTime) ||
                    (firstModule.startTime >= secondModule.startTime &&
                        firstModule.endTime <= secondModule.endTime &&
                        dayConflicts.filter(
                            (slot) =>
                                slot.first.startTime ===
                                    firstModule.startTime &&
                                slot.first.endTime === firstModule.endTime &&
                                slot.second.startTime ===
                                    secondModule.startTime &&
                                slot.second.endTime === secondModule.endTime
                        ).length === 0)
                ) {
                    // can carry on here
                    dayConflicts.push({
                        first: firstModule,
                        second: secondModule
                    });
                }
            }
        }

        conflicts[dayIndex] = dayConflicts;
        return conflicts;
    };

    switch (action.type) {
        case SET_CONFLICT:
            return {
                ...state,
                conflicts: [...state.conflicts, action.payload]
            };
        case REMOVE_CONFLICT:
            return {
                ...state,
                conflicts: state.conflicts.filter(
                    (conflict) =>
                        conflict.first !== action.payload.first &&
                        conflict.second !== action.payload.second
                )
            };
        case GET_CONFLICTS:
            return {
                ...state,
                conflicts: getConflicts(
                    action.payload.modules,
                    action.payload.day,
                    state.conflicts
                )
            };
    }
};
