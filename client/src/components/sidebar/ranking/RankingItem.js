import React, { Fragment, useContext, useRef, useState } from 'react';
import { Draggable} from 'react-beautiful-dnd';


const RankingItem = ({module, rank , index, convertedModule}) => {

    const {moduleName, moduleCode} = convertedModule;

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
                Module name: {moduleName}
                <br/>
                Module Code: {moduleCode}
                <br/>
                Module Rank: {rank}
            </div>
            </div>)}
            
        </Draggable>
    )
};

export default RankingItem;
