import React, { Fragment, useContext, useEffect, useState } from 'react';
import CartItem from './CartItem';
import ModuleContext from '../../../context/module/moduleContext';

const Cart = () => {
    const moduleContext = useContext(ModuleContext);

    const { currentModules } = moduleContext;

    if (currentModules === null || !currentModules.length) {
        return <h3>No Modules selected</h3>;
    }

    return (
        <div className='cart'>
            {currentModules.length !== 0 &&
                currentModules.map((module, index) => (
                    <CartItem module={module} key={index} rank={index + 1} />
                ))}
        </div>
    );
};

export default Cart;
