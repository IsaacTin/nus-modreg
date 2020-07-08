import React, { useContext } from 'react';
import RankingItem from './RankingItem';
import ModuleContext from '../../../context/module/moduleContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const Ranking = SortableContainer(({ modules }) => {
    const moduleContext = useContext(ModuleContext);
    // const { currentModules, updateModuleRankings } = moduleContext;

    // const onDragEnd = (result) => {
    //     const { destination, source, reason } = result;

    //     if (!destination || reason === 'CANCEL') {
    //         return;
    //     }

    //     if (
    //         destination.dropppableID === source.droppableID &&
    //         destination.index === source.index
    //     ) {
    //         return;
    //     }
    //     const modules = Object.assign([], currentModules);
    //     const droppedModule = modules[source.index];

    //     modules.splice(source.index, 1);
    //     modules.splice(destination.index, 0, droppedModule);

    //     updateModuleRankings(modules);
    // };

    if (modules === null || modules.length === 0) {
        return <h3>No modules selected</h3>;
    }

    console.log(modules);

    return (
        // <DragDropContext onDragEnd={onDragEnd}>
        //     <Droppable droppableId='dp1'>
        //         {(provided) => (
        //             <div
        //                 ref={provided.innerRef}
        //                 {...provided.droppableProps}
        //                 className='ranking-container'
        //             >
        //                 {currentModules.map((module, index) => (
        //                     <RankingItem
        //                         key={index}
        //                         module={module}
        //                         index={index}
        //                     />
        //                 ))}
        //                 {provided.placeholder}
        //             </div>
        //         )}
        //     </Droppable>
        // </DragDropContext>
        <div className='ranking-grid'>
            {modules.length > 0 &&
                modules.map((module, index) => (
                    <RankingItem
                        key={index}
                        module={module}
                        index={index}
                        rank={index + 1}
                    />
                ))}
        </div>
    );
});

export default Ranking;
