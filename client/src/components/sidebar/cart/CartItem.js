import React, { useContext } from 'react';
import ModuleContext from '../../../context/module/moduleContext';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

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
            {module.lessonType === 'Tutorial'
                ? 'TUT'
                : module.lessonType === 'Laboratory'
                ? 'LAB'
                : module.lessonType === 'Lecture'
                ? 'LEC'
                : module.lessonType === 'Recitation'
                ? 'REC'
                : ''}
            {` [${classNo}]`}
            <div style={{ fontSize: '0.85rem', marginTop: 5, marginBottom: 8 }}>
                <ExpansionPanel component={Paper}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        View class details
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {timing.map((timeslot, index) => (
                            <div key={index}>
                                {`${timeslot.venue}, ${timeslot.day} ${timeslot.startTime} - ${timeslot.endTime}`}
                                <br />
                            </div>
                        ))}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
            <button className='btn btn-sm btn-light' onClick={onDelete}>
                <i className='far fa-trash-alt'></i>{' '}
            </button>
        </div>
    );
};

export default CartItem;
