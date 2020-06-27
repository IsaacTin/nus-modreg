import React, { useContext } from 'react';
import RankingItem from './RankingItem';
import ModuleContext from '../../../context/module/moduleContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


const Ranking = () => {
    const moduleContext = useContext(ModuleContext);
    const {
        currentModules,
        updateModuleRankings,
    } = moduleContext;

    const onDragEnd = (result) => {
        const { destination, source, reason } = result;

        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (
            destination.dropppableID === source.droppableID &&
            destination.index === source.index
        ) {
            return;
        }
        const modules = Object.assign([], currentModules);
        const droppedModule = modules[source.index];

        modules.splice(source.index, 1);
        modules.splice(destination.index, 0, droppedModule);
      

        updateModuleRankings(modules);
    };

    if (currentModules === null || currentModules.length === 0) {
        return <h3>No modules selected</h3>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='dp1'>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {currentModules.map((module, index) => (
                            <RankingItem
                                key={index}
                                module={module}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default Ranking;
