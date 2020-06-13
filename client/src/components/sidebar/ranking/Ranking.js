import React, { useContext, useState, useRef, useEffect } from 'react';
import RankingItem from './RankingItem';
import ModuleContext from '../../../context/module/moduleContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import moduleArrayConverter from '../../../utils/moduleArrayConverter';
import Cart from '../cart/Cart';

const Ranking = () => {
    const moduleContext = useContext(ModuleContext);
    const {
        currentModules,
        updateModuleRankings,
        setDisplayedModules,
        displayedModules
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
        const convert = Object.assign([], displayedModules);
        const droppedModule = modules[source.index];

        modules.splice(source.index, 1);
        modules.splice(destination.index, 0, droppedModule);
        convert.splice(source.index, 1);
        convert.splice(destination.index, 0, displayedModules[source.index]);

        updateModuleRankings(modules);
        setDisplayedModules(convert);
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
                                index={currentModules.indexOf(module)}
                                convertedModule={
                                    displayedModules[
                                        currentModules.indexOf(module)
                                    ]
                                }
                                rank={currentModules.indexOf(module) + 1}
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
