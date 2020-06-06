import React, { useContext } from 'react';
import ModuleContext from '../../../context/module/moduleContext';
import PropTypes from 'prop-types';
import Trash from "./trash.png";


const CartItem = ({module}) => {
    const moduleContext = useContext(ModuleContext);
    const { deleteModule,  } = moduleContext;
    

    const { _id, /*moduleName, moduleCode*/ } = module;

    const onDelete = () => {
        console.log('delete')
        deleteModule(_id)
        //Can't delete
    };

    return (
        <div className="CartItem">
            Module name: {_id}
            <br/>
            Module Code: {_id}{' '}
            <br/>
            <button className="Delete" onClick={onDelete}>
                <img className="Trash" src={Trash} />
            </button>
        </div>
    )};

export default CartItem;
