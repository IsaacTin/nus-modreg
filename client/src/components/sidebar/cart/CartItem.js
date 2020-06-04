import React, { useContext } from 'react';
import ModuleContext from '../../../context/module/moduleContext';
import PropTypes from 'prop-types';

const CartItem = () => {
    const moduleContext = useContext(ModuleContext);
    const { deleteModule } = moduleContext;

    const { _id, moduleName, moduleCode } = moduleContext;

    const onDelete = () => {
        deleteModule(_id);
    };

    return <div>This is CartItem</div>;
};

export default CartItem;
