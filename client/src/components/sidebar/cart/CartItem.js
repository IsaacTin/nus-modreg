import React, { useContext } from 'react';
import ModuleContext from '../../../context/module/moduleContext';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
            Class Number: {classNo}
            <div style={{ fontSize: '0.85rem', marginTop: 8, marginLeft: 10 }}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        Click to view class details
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {timing.map((timeslot) => (
                            <div>
                                <br />
                                {`${timeslot.venue}, ${timeslot.day} ${timeslot.startTime} - ${timeslot.endTime}`}
                            </div>
                        ))}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
            <br />
            <button className='btn btn-sm btn-light' onClick={onDelete}>
                <i className='far fa-trash-alt'></i>{' '}
            </button>
        </div>
    );
};

export default CartItem;
