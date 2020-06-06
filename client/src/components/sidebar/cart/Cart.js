import React, { Fragment, useContext, useEffect } from 'react';
import CartItem from './CartItem';
import ModuleContext from '../../../context/module/moduleContext';

const Cart = () => {
    const moduleContext = useContext(ModuleContext);

    const {
        currentModules,
        getModules,
        confirmedModules,
        setCurrentModules
    } = moduleContext;

    useEffect(() => {
        getModules();
        // to debug
        if (confirmedModules !== null) {
            console.log('i <3 programming');
            setCurrentModules([...confirmedModules]);
        }
        // es-lint-disable-next-line
    }, []);

    if (currentModules === null) {
        return <h3>No Modules selected</h3>;
    }

    return (
        <Fragment>
            {currentModules.map((module) => (
                <CartItem module={module} key={module._id} />
            ))}
        </Fragment>
    );
};

export default Cart;
