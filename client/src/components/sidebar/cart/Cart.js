import React, { Fragment, useContext, useEffect, useState } from 'react';
import CartItem from './CartItem';
import ModuleContext from '../../../context/module/moduleContext';
import moduleArrayConverter from '../../../utils/moduleArrayConverter';
import moduleConverter from '../../../utils/moduleConverter'

const Cart = () => {
    const moduleContext = useContext(ModuleContext);

    const {
        currentModules,
        getModules,
        confirmedModules,
        setCurrentModules
    } = moduleContext;

    const [modules, setmodules] = useState()

    useEffect(() => {
        getModules();
        if(confirmedModules !== null && currentModules === null) {
            setCurrentModules(confirmedModules);             
            }
        if(currentModules !== null) {
            const fetchModules = async () => {
                setmodules(await moduleArrayConverter(currentModules))
            }
        fetchModules();
        }
    },  modules);

    if (currentModules === null || modules === undefined) {
        return <h3>No Modules selected</h3>;
    } 
    

    return (
        <Fragment>
            {modules.map((module) => (
                <CartItem module={module} key={module._id} 
             />
            ))}
        </Fragment>
    );
};

export default Cart;
