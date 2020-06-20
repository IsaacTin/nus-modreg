import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';
import ModuleContext from '../../context/module/moduleContext';
import Rows from './Rows';

const Nusmods = () => {
    const moduleContext = useContext(ModuleContext);

    const { displayedModules } = moduleContext;

    if (displayedModules === null) {
        return 'No modules selected yet';
    }

    return (
        // <div>
        //     <Table celled definition>
        //         <Table.Header>
        //             <Table.Row>
        //                 <Table.HeaderCell />
        //                 <Table.HeaderCell>{'0800 - 0900'}</Table.HeaderCell>
        //                 <Table.HeaderCell>{'0900 - 1000'}</Table.HeaderCell>
        //                 <Table.HeaderCell>{'1000 - 1100'}</Table.HeaderCell>
        //                 <Table.HeaderCell>{'1100 - 1200'}</Table.HeaderCell>
        //                 <Table.HeaderCell>{'1200 - 1300'}</Table.HeaderCell>
        //                 <Table.HeaderCell>{'1300 - 1400'}</Table.HeaderCell>
        //                 <Table.HeaderCell>{'1400 - 1500'}</Table.HeaderCell>
        //                 <Table.HeaderCell>{'1500 - 1600'}</Table.HeaderCell>
        //                 <Table.HeaderCell>{'1600 - 1700'}</Table.HeaderCell>
        //                 <Table.HeaderCell>{'1700 - 1800'}</Table.HeaderCell>
        //             </Table.Row>
        //         </Table.Header>

        //         <Table.Body>
        //             <Rows
        //                 modules={displayedModules.filter(
        //                     (module) => module.day === 'Monday'
        //                 )}
        //                 day='Monday'
        //             />
        //             <Rows
        //                 modules={displayedModules.filter(
        //                     (module) => module.day === 'Tuesday'
        //                 )}
        //                 day='Tuesday'
        //             />
        //             <Rows
        //                 modules={displayedModules.filter(
        //                     (module) => module.day === 'Wednesday'
        //                 )}
        //                 day='Wednesday'
        //             />
        //             <Rows
        //                 modules={displayedModules.filter(
        //                     (module) => module.day === 'Thursday'
        //                 )}
        //                 day='Thursday'
        //             />
        //             <Rows
        //                 modules={displayedModules.filter(
        //                     (module) => module.day === 'Friday'
        //                 )}
        //                 day='Friday'
        //             />
        //         </Table.Body>
        //     </Table>
        // </div>

        <div className='nusmods'>NUSmods placeholder</div>
    );
};

export default Nusmods;
