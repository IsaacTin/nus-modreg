import React, { useContext } from 'react';
import RankingItem from './RankingItem';
import ModuleContext from '../../../context/module/moduleContext';

const Ranking = () => {
    const moduleContext = useContext(ModuleContext);

    return (
        <div>
            This is ranking
            <RankingItem />
        </div>
    );
};

export default Ranking;
