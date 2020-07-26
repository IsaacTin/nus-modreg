import React, { useContext, useEffect } from 'react';
import { Table, Responsive } from 'semantic-ui-react';
import ModuleContext from '../../context/module/moduleContext';
import SearchContext from '../../context/search/searchContext';
import Rows from './Rows';

const Nusmods = () => {
    const moduleContext = useContext(ModuleContext);
    const searchContext = useContext(SearchContext);

    const {
        displayedModules,
        currentModules,
        setDisplayedModules
    } = moduleContext;
    const { clearAllTimeFilters } = searchContext;

    useEffect(() => {
        if (currentModules !== null) {
            if (currentModules.length === 0) {
                setDisplayedModules([]);
            } else {
                const result = [...displayedModules];
                currentModules.forEach((module) => {
                    const existing = result.filter((lesson) => {
                        return (
                            lesson.moduleCode === module.moduleCode &&
                            lesson.lessonType === module.lessonType
                        );
                    });
                    if (existing.length === 0) {
                        result.push(module);
                    }
                });
                setDisplayedModules(result);
            }
        }
        // eslint-disable-next-line
    }, [currentModules]);


    const onClick = () => {
        clearAllTimeFilters();
    };

    //const onChange = (module) => {
    /* eslint-disable */
    /*let temp = []
         console.log(temp)
        modules.map((module1) => {
            module1.semesterData.timetable[0].lessonType === module.semesterData.timetable[0].lessonType && module1.moduleCode === module.moduleCode 
                ? temp.push(module) : temp.push(module1)
        })
        setModules(temp)
	}*/

    const getTableHeaders = () => {
        const tableHeaders = [];
        const addTime = (startTime) => {
            let result = startTime + 100;
            result =
                result < 1000 ? `0${result.toString()}` : result.toString();
            return result;
        };
        let startTime = '0800';
        let endTime = '0900';
        for (let i = 0; i < 10; i++) {
            tableHeaders.push(
                <Table.HeaderCell style={{ fontSize: '0.9rem' }}>
                    {`${startTime}  -  ${endTime}`}
                </Table.HeaderCell>
            );
            startTime = endTime;
            endTime = addTime(+endTime);
        }
        return tableHeaders;
    };

    return (
        <div>
            <br />
            {/* <button className='btn btn-light' onClick={onClick}>
                Clear all time filters
            </button> */}
            <br />
            <br />
            <Responsive>
                <Table
                    celled
                    definition
                    collapsing
                    striped
                    compact
                    fixed
                    size='small'
                    textAlign='center'
                    verticalAlign='middle'
                    className='timetable'
                >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            {/* <Table.HeaderCell>{'0800 - 0900'}</Table.HeaderCell>
                            <Table.HeaderCell>{'0900 - 1000'}</Table.HeaderCell>
                            <Table.HeaderCell>{'1000 - 1100'}</Table.HeaderCell>
                            <Table.HeaderCell>{'1100 - 1200'}</Table.HeaderCell>
                            <Table.HeaderCell>{'1200 - 1300'}</Table.HeaderCell>
                            <Table.HeaderCell>{'1300 - 1400'}</Table.HeaderCell>
                            <Table.HeaderCell>{'1400 - 1500'}</Table.HeaderCell>
                            <Table.HeaderCell>{'1500 - 1600'}</Table.HeaderCell>
                            <Table.HeaderCell>{'1600 - 1700'}</Table.HeaderCell>
                            <Table.HeaderCell>{'1700 - 1800'}</Table.HeaderCell> */}
                            {getTableHeaders()}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Rows
                            modules={displayedModules.filter(
                                (module) =>
                                    module.timing.filter(
                                        (time) => time.day === 'Monday'
                                    ).length !== 0
                            )}
                            day='Monday'
                        />
                        <Rows
                            modules={displayedModules.filter(
                                (module) =>
                                    module.timing.filter(
                                        (time) => time.day === 'Tuesday'
                                    ).length !== 0
                            )}
                            day='Tuesday'
                        />
                        <Rows
                            modules={displayedModules.filter(
                                (module) =>
                                    module.timing.filter(
                                        (time) => time.day === 'Wednesday'
                                    ).length !== 0
                            )}
                            day='Wednesday'
                        />
                        <Rows
                            modules={displayedModules.filter(
                                (module) =>
                                    module.timing.filter(
                                        (time) => time.day === 'Thursday'
                                    ).length !== 0
                            )}
                            day='Thursday'
                        />
                        <Rows
                            modules={displayedModules.filter(
                                (module) =>
                                    module.timing.filter(
                                        (time) => time.day === 'Friday'
                                    ).length !== 0
                            )}
                            day='Friday'
                        />
                    </Table.Body>
                </Table>
            </Responsive>
        </div>
    );
};

export default Nusmods;
