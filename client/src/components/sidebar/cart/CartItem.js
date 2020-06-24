import React, { useContext } from 'react';
import ModuleContext from '../../../context/module/moduleContext';
import PropTypes from 'prop-types';

const CartItem = ({ module }) => {
    const moduleContext = useContext(ModuleContext);
    const { deleteModule } = moduleContext;

    const { title, moduleCode } = module;

    const onDelete = () => {
        deleteModule(module);
    };

    return (
        <div className='cart-item'>
            Module Name: {title}
            <br />
            Module Code: {moduleCode} <br />
            <button className='btn btn-sm btn-light' onClick={onDelete}>
                <i className='far fa-trash-alt'></i>{' '}
            </button>
        </div>
    );
};

export default CartItem;
