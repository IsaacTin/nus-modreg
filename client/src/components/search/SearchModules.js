import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ModuleItem from './ModuleItem';
import SearchContext from '../../context/search/searchContext';
import ModuleContext from '../../context/module/moduleContext';

const SearchModules = () => {
    const searchContext = useContext(SearchContext);
    const moduleContext = useContext(ModuleContext);

    const { filtered } = searchContext;
    const { addModule } = moduleContext;

    if (filtered !== null && filtered.length === 0) {
        return <h4>No module found.</h4>;
    }

    return (
        <Fragment>
            {filtered !== null &&
                filtered.map((module, i) => (
                    <ModuleItem key={i} module={module} />
                ))}
        </Fragment>
    );
};

export default SearchModules;
