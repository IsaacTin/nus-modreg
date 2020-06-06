import React, { Fragment, useContext, useRef, useState } from 'react';
import { Draggable} from 'react-beautiful-dnd';


const RankingItem = ({module, rank , index}) => {

    return (
        <Draggable 
            key={index}
            draggableId={index+''}
            index={index}>
            {(provided)=> (<div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            >
            <div className="RankingItem">             
                Module name: {module._id}
                <br/>
                ModuleRank: {rank}
            </div>
            </div>)}
            
        </Draggable>
    )
};

export default RankingItem;
