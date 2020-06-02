import React , { useContext }from 'react';
import RankingItem from './RankingItem';
import ModuleContext from '../../context/module/ModuleContext';

const Ranking = () => {
    moduleContext = useContext(ModuleContext);
    const { updateModule, currentModules } = moduleContext;
    return ( 
        <div>
            This is ranking
            <RankingItem />
        </div>
     );
}
 
export default Ranking
