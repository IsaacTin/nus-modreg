import React, { useContext } from 'react';
import classNameConverter from '../../../utils/classNameConverter';
import ModuleContext from '../../../context/module/moduleContext';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

const CartItem = ({ module, rank }) => {
    const moduleContext = useContext(ModuleContext);
    const { deleteModule } = moduleContext;

    const { title, moduleCode, lessonType, classNo, timing } = module;

    const onDelete = () => {
        deleteModule(module);
    };

    return (
        <div className='cart-item'>
            Rank: {rank}
            <br />
            {`${title} (${moduleCode})`}
            <br />
            {`Slot: ${classNameConverter(lessonType)} [${classNo}]`}
            <div style={{ fontSize: '0.85rem', marginTop: 5, marginBottom: 8 }}>
                <Accordion component={Paper} style={{ background: '#d9d9d9' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        View class details
                    </AccordionSummary>
                    <AccordionDetails
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        {timing.map((timeslot, index) => (
                            <div key={index}>
                                {`${timeslot.venue}, ${timeslot.day} ${timeslot.startTime} - ${timeslot.endTime}`}
                                <br />
                            </div>
                        ))}
                    </AccordionDetails>
                </Accordion>
            </div>
            <button className='btn btn-sm btn-light' onClick={onDelete}>
                <i className='far fa-trash-alt'></i>{' '}
            </button>
        </div>
    );
};

export default CartItem;
