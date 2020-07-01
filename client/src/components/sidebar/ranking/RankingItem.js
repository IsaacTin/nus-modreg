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
                        Module Code: {module.moduleCode}
                        <br />
                        Lesson: {`${module.lessonType === "Tutorial" ? 'TUT' : 
                                    module.lessonType === "Laboratory" ? 'LAB':
                                        module.lessonType === "Lecture" ? 'LEC' :
                                            module.lessonType === "Recitation" ? 'REC' : ""} [${module.classNo}]`}
                        <br />
                        Module Rank: {index + 1}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default RankingItem;
