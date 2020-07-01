import React, { useContext, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import ModuleContext from '../../context/module/moduleContext';
import LayoutContext from '../../context/layout/layoutContext';
import Rows from './Rows';

const Nusmods = () => {
    const moduleContext = useContext(ModuleContext);
    const layoutContext = useContext(LayoutContext);

    const {
        displayedModules,
        currentModules,
        setDisplayedModules
    } = moduleContext;
    const { isSidebarOpen } = layoutContext;

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

    useEffect(() => {
        if (currentModules !== null) {
            let temp = [];
            currentModules.forEach((module1) =>
                temp.filter(
                    (module2) =>
                        module1.moduleCode === module2.moduleCode &&
                        module1.lessonType === module2.lessonType
                ).length !== 0
                    ? module1
                    : temp.push(module1)
            );
            setDisplayedModules(temp);
        }
        // eslint-disable-next-line
    }, []);

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

    return (
        <div className='timetable'>
            <Table
                celled
                definition
                collapsing
                striped
                compact
                size='small'
                textAlign='center'
                verticalAlign='middle'
            >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>{'0800 - 0900'}</Table.HeaderCell>
                        <Table.HeaderCell>{'0900 - 1000'}</Table.HeaderCell>
                        <Table.HeaderCell>{'1000 - 1100'}</Table.HeaderCell>
                        <Table.HeaderCell>{'1100 - 1200'}</Table.HeaderCell>
                        <Table.HeaderCell>{'1200 - 1300'}</Table.HeaderCell>
                        <Table.HeaderCell>{'1300 - 1400'}</Table.HeaderCell>
                        <Table.HeaderCell>{'1400 - 1500'}</Table.HeaderCell>
                        <Table.HeaderCell>{'1500 - 1600'}</Table.HeaderCell>
                        <Table.HeaderCell>{'1600 - 1700'}</Table.HeaderCell>
                        <Table.HeaderCell>{'1700 - 1800'}</Table.HeaderCell>
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
        </div>
    );
};

export default Nusmods;
