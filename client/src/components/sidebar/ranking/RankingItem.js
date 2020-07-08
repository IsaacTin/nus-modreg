import React from 'react';
import classNameConverter from '../../../utils/classNameConverter';
import { Draggable } from 'react-beautiful-dnd';
import { SortableElement } from 'react-sortable-hoc';

const RankingItem = SortableElement(({ module, rank }) => {
    return (
        // <Draggable key={index} draggableId={index + ''} index={index}>
        //     {(provided) => (
        //         <div
        //             ref={provided.innerRef}
        //             {...provided.draggableProps}
        //             {...provided.dragHandleProps}
        //         >
        //             <div className='ranking-item'>
        //                 {/* {`${module.title} (${module.moduleCode})`}
        //                 {`${classNameConverter(module.lessonType)} [${
        //                     module.classNo
        //                 }]`} */}
        //                 {`${module.moduleCode}: ${classNameConverter(
        //                     module.lessonType
        //                 )} [${module.classNo}]`}
        //                 <br />
        //                 Rank: {index + 1}
        //             </div>
        //         </div>
        //     )}
        // </Draggable>
        <div className='ranking-item'>
            {`${module.moduleCode}: ${classNameConverter(module.lessonType)} [${
                module.classNo
            }]`}
            <h4>#{rank}</h4>
        </div>
    );
});

export default RankingItem;
