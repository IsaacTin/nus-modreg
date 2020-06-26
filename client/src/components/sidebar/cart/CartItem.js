import React, { useContext } from 'react';
import ModuleContext from '../../../context/module/moduleContext';
import PropTypes from 'prop-types';

const CartItem = ({ module, rank }) => {
    const moduleContext = useContext(ModuleContext);
    const { deleteModule } = moduleContext;

    const { title, moduleCode, classNo, timing } = module;

    const onDelete = () => {
        deleteModule(module);
    };

    return (
        <div className='cart-item'>
            Rank: {rank}
            <br />
            Module Name: {title}
            <br />
            Module Code: {moduleCode}
            <br />
            <div style={{ fontSize: '0.85rem', marginTop: 8, marginLeft: 10 }}>
                Class Number: {classNo}
                <br />
                {timing.map((timeslot) => (
                    <div>
                        {`${timeslot.venue}, ${timeslot.day} ${timeslot.startTime} - ${timeslot.endTime}`}
                    </div>
                ))}
            </div>
            <button className='btn btn-sm btn-light' onClick={onDelete}>
                <i className='far fa-trash-alt'></i>{' '}
            </button>
        </div>
    );
};

export default CartItem;
