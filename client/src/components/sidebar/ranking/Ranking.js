import React, { useContext , useState, useRef, useEffect} from 'react';
import RankingItem from './RankingItem';
import ModuleContext from '../../../context/module/moduleContext';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

const Ranking = () => {
    const moduleContext = useContext(ModuleContext);
    const { currentModules, updateModuleRankings } = moduleContext;

    const onDragEnd=(result) => {
        const {destination, source, reason}=result;

        if(!destination || reason === 'CANCEL') {
            return;
        }

        if(destination.dropppableID === source.droppableID && destination.index === source.index) {
            return;
        }
        const modules = Object.assign([], currentModules)
        const droppedModule = modules[source.index];

        modules.splice(source.index, 1);
        modules.splice(destination.index, 0, droppedModule);

        updateModuleRankings(modules)
    }

    if(currentModules === null || currentModules.length === 0) {
        return (
            <h3>No modules selected</h3>
        )
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='dp1'>
                {(provided) => (<div ref={provided.innerRef}{...provided.droppableProps}>
                    {currentModules.map(module => 
                        <RankingItem 
                            key={module._id}
                            module={module} 
                            index={currentModules.indexOf(module)}
                            rank={currentModules.indexOf(module) + 1} />
                    )}
                    {provided.placeholder}
                    </div>)}
            </Droppable>

            <button>
                Confirm
            </button>
        </DragDropContext>
    )
}

   /* const [list, setList] = useState(currentModules);
    const [dragging, setDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();

    

    const handleDragStart = (e, params) => {
        console.log('drag starting', params)
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true)
        }, 0)
    }

    const handleDragEnter = (e, params) => {
        console.log('Entering drag..', params)
        const currentItem = dragItem.current;
        if(e.target != dragNode.current) {
            console.log("TARGET IS NOT THE SAME")
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList.splice(list.indexOf(params), 0, newList.splice(list.indexOf(currentItem), 1)[0])
                dragItem.current = params
                localStorage.setItem('List', JSON.stringify(newList))
                return newList
            })
        }
    }

    const handleDragEnd = () => {
        setDragging(false)
        console.log('Ending drag...')
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;
    }

    const getStyles = (params) => {
        const currentItem = dragItem.current;
        if(currentItem._id === params._id) {
            return 'current RankingItem'
        }
        return 'RankingItem'
    }



    return (
        <div className="ranking">
            {list.map((module) => (
                <div key={module._id} 
                    draggable 
                    onDragStart={(e) => handleDragStart(e, {module})} 
                    className={dragging?getStyles(module):"RankingItem"}
                    onDragEnter={dragging?(e) => {handleDragEnter(e, {module})}:null}
                >
                    <RankingItem key={module._id} module={module} rank={list.indexOf(module) + 1}/>
                </div>
            ))}
        </div>
    )
}
  /*  return (
       <div className="rank">
           <header className="rankheader">
               <div className="ranking">
                   {currentModules.map((module, moduleI) => (
                       <RankingItem draggable module={module} moduleI={currentModules.indexOf(module) + 1} key={module._id} />
                   ))}
               </div>
           </header>
       </div>
    )
}
       */
export default Ranking;
