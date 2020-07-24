import React, { useContext, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import RowItem from './RowItem';
import EmptySlot from './EmptySlot';
import ModalertContext from '../../context/modalert/modalertContext';

const Rows = ({ modules, day }) => {
    const modalertContext = useContext(ModalertContext);
    const { conflicts, setConflict, getConflicts } = modalertContext;

    useEffect(() => {
        getConflicts(modules, day);
        // eslint-disable-next-line
    }, [modules, day]);

    console.log('conflicts');
    console.log(conflicts);

    const dayShorthand = (day) => {
        switch (day) {
            case 'Monday':
                return 'MON';
            case 'Tuesday':
                return 'TUES';
            case 'Wednesday':
                return 'WED';
            case 'Thursday':
                return 'THURS';
            case 'Friday':
                return 'FRI';
            default:
                return '';
        }
    };

    // const getRows = () => {
    //     const modulesByDay = [];
    //     modules.forEach((module) => {
    //         module.timing
    //             .filter((time) => time.day === day)
    //             .forEach((module) => modulesByDay.push(module));
    //     });

    //     const conflictSlots = [];
    //     console.log(`modulesByDay for ${day}`);
    //     console.log(modulesByDay);

    //     for (let i = 0; i < modulesByDay.length; i++) {
    //         for (let j = i + 1; j < modulesByDay.length; j++) {
    //             const firstModule = modulesByDay[i];
    //             const secondModule = modulesByDay[j];

    //             if (
    //                 firstModule.startTime <= secondModule.startTime &&
    //                 firstModule.endTime >= secondModule.endTime
    //             ) {
    //                 // can carry on here
    //                 conflictSlots.push({
    //                     first: firstModule,
    //                     second: secondModule
    //                 });
    //             }
    //         }
    //     }

    //     console.log(conflictSlots);
    // };

    // getRows();

    const getTableCells = () => {
        let numColumns = 10;
        let count = 0;
        let cellStartTime = '0800';
        let cellEndTime;
        const tableCells = [];

        // console.log(`modules for ${day}:`);
        // console.log(modules);

        while (count < numColumns) {
            const cellModules = [...modules].filter(
                (module) =>
                    module.timing.filter(
                        (time) =>
                            time.day === day && time.startTime === cellStartTime
                    ).length !== 0
            );

            // console.log(day);
            // console.log(cellStartTime);
            // console.log(cellEndTime);
            // console.log(`count: ${count}`);
            // console.log(cellModules);

            // takes in two numbers and converts to string
            const timeToString = (startTime, timeToAdd) => {
                let result = startTime + timeToAdd;
                result =
                    result < 1000 ? `0${result.toString()}` : result.toString();
                return result;
            };

            if (cellModules.length === 0) {
                cellEndTime = timeToString(+cellStartTime, 100);
            }

            tableCells.push(
                cellModules.length !== 0 ? (
                    cellModules.map((cellModule) => {
                        let numCells;
                        cellModule.timing
                            .filter((moduleTiming) => moduleTiming.day === day)
                            .forEach((moduleTiming) => {
                                const cellDuration =
                                    (+moduleTiming.endTime -
                                        +moduleTiming.startTime) /
                                    100;
                                // console.log(`cellDuration: ${cellDuration}`);
                                numCells = cellDuration.toString();
                                if (cellDuration > 1) {
                                    numColumns -= cellDuration - 1;
                                    cellEndTime = timeToString(
                                        +cellStartTime,
                                        cellDuration * 100
                                    );
                                    // cellEndTime = timeToString(
                                    //     +cellStartTime,
                                    //     100
                                    // );
                                } else {
                                    cellEndTime = timeToString(
                                        +cellStartTime,
                                        100
                                    );
                                }
                            });
                        return (
                            <Table.Cell colSpan={numCells} key={count}>
                                <RowItem
                                    day={day}
                                    module={cellModule}
                                    key={cellModule.classNo}
                                />
                            </Table.Cell>
                        );
                    })
                ) : (
                    <Table.Cell key={count}>
                        <EmptySlot
                            day={day}
                            startTime={cellStartTime}
                            endTime={cellEndTime}
                        />
                    </Table.Cell>
                )
            );
            // testing
            cellStartTime = cellEndTime;
            count++;
        }
        return tableCells;
    };

    return (
        <Table.Row>
            <Table.Cell
                textAlign='center'
                verticalAlign='middle'
                active
                collapsing
            >
                {dayShorthand(day)}
            </Table.Cell>
            {getTableCells()}

            {/* <Table.Cell>
                {modules.map((module) =>
                    module.timing.filter(
                        (time) => time.startTime === '0800' && time.day === day
                    ).length !== 0 ||
                    module.timing.filter(
                        (time) => time.endTime === '0900' && time.day === day
                    ).length !== 0
                        ? (present1 = true && (
                              <RowItem
                                  module={module}
                                  day={day}
                                  key={module.classNo}
                              />
                          ))
                        : ''
                )}
                {present1 ? (
                    ''
                ) : (
                    <EmptySlot startTime={'0800'} endTime={'0900'} day={day} />
                )}
            </Table.Cell>
            <Table.Cell>
                {modules.map((module) =>
                    module.timing.filter(
                        (time) => time.startTime === '0900' && time.day === day
                    ).length !== 0 ||
                    module.timing.filter(
                        (time) => time.endTime === '1000' && time.day === day
                    ).length !== 0
                        ? (present2 = true && (
                              <RowItem
                                  module={module}
                                  day={day}
                                  key={module.classNo}
                              />
                          ))
                        : ''
                )}
                {present2 ? (
                    ''
                ) : (
                    <EmptySlot startTime={'0900'} endTime={'1000'} day={day} />
                )}
            </Table.Cell>
            <Table.Cell>
                {modules.map((module) =>
                    module.timing.filter(
                        (time) => time.startTime === '1000' && time.day === day
                    ).length !== 0 ||
                    module.timing.filter(
                        (time) => time.endTime === '1100' && time.day === day
                    ).length !== 0
                        ? (present3 = true && (
                              <RowItem
                                  module={module}
                                  day={day}
                                  key={module.classNo}
                              />
                          ))
                        : ''
                )}
                {present3 ? (
                    ''
                ) : (
                    <EmptySlot startTime={'1000'} endTime={'1100'} day={day} />
                )}
            </Table.Cell>
            <Table.Cell>
                {modules.map((module) =>
                    module.timing.filter(
                        (time) => time.startTime === '1100' && time.day === day
                    ).length !== 0 ||
                    module.timing.filter(
                        (time) => time.endTime === '1200' && time.day === day
                    ).length !== 0
                        ? (present4 = true && (
                              <RowItem
                                  module={module}
                                  day={day}
                                  key={module.classNo}
                              />
                          ))
                        : ''
                )}
                {present4 ? (
                    ''
                ) : (
                    <EmptySlot startTime={'1100'} endTime={'1200'} day={day} />
                )}
            </Table.Cell>
            <Table.Cell>
                {modules.map((module) =>
                    module.timing.filter(
                        (time) => time.startTime === '1200' && time.day === day
                    ).length !== 0 ||
                    module.timing.filter(
                        (time) => time.endTime === '1300' && time.day === day
                    ).length !== 0
                        ? (present5 = true && (
                              <RowItem
                                  module={module}
                                  day={day}
                                  key={module.classNo}
                              />
                          ))
                        : ''
                )}
                {present5 ? (
                    ''
                ) : (
                    <EmptySlot startTime={'1200'} endTime={'1300'} day={day} />
                )}
            </Table.Cell>
            <Table.Cell>
                {modules.map((module) =>
                    module.timing.filter(
                        (time) => time.startTime === '1300' && time.day === day
                    ).length !== 0 ||
                    module.timing.filter(
                        (time) => time.endTime === '1400' && time.day === day
                    ).length !== 0
                        ? (present6 = true && (
                              <RowItem
                                  module={module}
                                  day={day}
                                  key={module.classNo}
                              />
                          ))
                        : ''
                )}
                {present6 ? (
                    ''
                ) : (
                    <EmptySlot startTime={'1300'} endTime={'1400'} day={day} />
                )}
            </Table.Cell>
            <Table.Cell>
                {modules.map((module) =>
                    module.timing.filter(
                        (time) => time.startTime === '1400' && time.day === day
                    ).length !== 0 ||
                    module.timing.filter(
                        (time) => time.endTime === '1500' && time.day === day
                    ).length !== 0
                        ? (present7 = true && (
                              <RowItem
                                  module={module}
                                  day={day}
                                  key={module.classNo}
                              />
                          ))
                        : ''
                )}
                {present7 ? (
                    ''
                ) : (
                    <EmptySlot startTime={'1400'} endTime={'1500'} day={day} />
                )}
            </Table.Cell>
            <Table.Cell>
                {modules.map((module) =>
                    module.timing.filter(
                        (time) => time.startTime === '1500' && time.day === day
                    ).length !== 0 ||
                    module.timing.filter(
                        (time) => time.endTime === '1600' && time.day === day
                    ).length !== 0
                        ? (present8 = true && (
                              <RowItem
                                  module={module}
                                  day={day}
                                  key={module.classNo}
                              />
                          ))
                        : ''
                )}
                {present8 ? (
                    ''
                ) : (
                    <EmptySlot startTime={'1500'} endTime={'1600'} day={day} />
                )}
            </Table.Cell>
            <Table.Cell>
                {modules.map((module) =>
                    module.timing.filter(
                        (time) => time.startTime === '1600' && time.day === day
                    ).length !== 0 ||
                    module.timing.filter(
                        (time) => time.endTime === '1700' && time.day === day
                    ).length !== 0
                        ? (present9 = true && (
                              <RowItem
                                  module={module}
                                  day={day}
                                  key={module.classNo}
                              />
                          ))
                        : ''
                )}
                {present9 ? (
                    ''
                ) : (
                    <EmptySlot startTime={'1600'} endTime={'1700'} day={day} />
                )}
            </Table.Cell>
            <Table.Cell>
                {modules.map((module) =>
                    module.timing.filter(
                        (time) => time.startTime === '1700' && time.day === day
                    ).length !== 0 ||
                    module.timing.filter(
                        (time) => time.endTime === '1800' && time.day === day
                    ).length !== 0
                        ? (present10 = true && (
                              <RowItem
                                  module={module}
                                  day={day}
                                  key={module.classNo}
                              />
                          ))
                        : ''
                )}
                {present10 ? (
                    ''
                ) : (
                    <EmptySlot startTime={'1700'} endTime={'1800'} day={day} />
                )}
            </Table.Cell> */}
        </Table.Row>
    );
};

export default Rows;
