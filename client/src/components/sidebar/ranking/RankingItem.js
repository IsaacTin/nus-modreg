import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const RankingItem = ({ module, index }) => {
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
