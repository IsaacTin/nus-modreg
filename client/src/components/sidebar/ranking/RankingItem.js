import React, { Fragment, useContext, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import LayoutContext from '../../../context/layout/layoutContext';

const RankingItem = ({ module, index }) => {
    const layoutContext = useContext(LayoutContext);

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
                        Module name: {module.title}
                        <br />
                        Module Code: {module.moduleCode}
                        <br />
                        Module Rank: {index + 1}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default RankingItem;
