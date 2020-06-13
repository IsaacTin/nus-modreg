import React, { Fragment, useContext, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import LayoutContext from '../../../context/layout/layoutContext';

const RankingItem = ({ module, rank, index, convertedModule }) => {
    const layoutContext = useContext(LayoutContext);

    const { moduleName, moduleCode } = convertedModule;
    const { isSidebarOpen } = layoutContext;

    return (
        <Draggable key={index} draggableId={index + ''} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className='ranking-item'>
                        Module name: {moduleName}
                        <br />
                        Module Code: {moduleCode}
                        <br />
                        Module Rank: {rank}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default RankingItem;
