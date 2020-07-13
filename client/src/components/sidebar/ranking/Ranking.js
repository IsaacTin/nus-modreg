import React, { useContext } from 'react';
import RankingItem from './RankingItem';
import ModuleContext from '../../../context/module/moduleContext';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const Ranking = SortableContainer(({ modules }) => {
    const moduleContext = useContext(ModuleContext);

    if (modules === null || modules.length === 0) {
        return <h3>No modules selected</h3>;
    }

    console.log(modules);

    return (
        <div className='ranking-grid'>
            {modules.length > 0 &&
                modules.map((module, index) => (
                    <RankingItem
                        key={index}
                        module={module}
                        index={index}
                        rank={index + 1}
                    />
                ))}
        </div>
    );
});

export default Ranking;
