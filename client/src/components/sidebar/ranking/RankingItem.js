import React, { useContext } from 'react';
import ModuleContext from '../../../context/module/moduleContext';

const RankingItem = () => {
    const moduleContext = useContext(ModuleContext);
    const { _id, moduleName, moduleCode } = moduleContext;

    return <div>This is rankingitem</div>;
};

export default RankingItem;
