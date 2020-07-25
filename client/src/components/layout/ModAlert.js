import React, { useContext, Fragment } from 'react';
import classNameConverter from '../../utils/classNameConverter';
import ModalertContext from '../../context/modalert/modalertContext';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const ModAlert = () => {
    const modalertContext = useContext(ModalertContext);
    const { conflicts } = modalertContext;
    return (
        conflicts.filter((day) => day.length > 0).length > 0 && (
            <Accordion className='my-1'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <ErrorOutlineIcon color='error' className='mx' />
                    Conflict timings:
                </AccordionSummary>
                <AccordionDetails className='conflict-container grid-5'>
                    {conflicts.map((dayConflict) =>
                        dayConflict.map((conflict, index) => (
                            <div key={index} className='module-alert-card'>
                                <h5>{`${conflict.first.day}:`}</h5>
                                {`Slot 1: ${
                                    conflict.first.moduleCode
                                } ${classNameConverter(
                                    conflict.first.lessonType
                                )} [${conflict.first.classNo}], ${
                                    conflict.first.startTime
                                } - ${conflict.first.endTime}`}
                                <br />
                                {`Slot 2: ${
                                    conflict.second.moduleCode
                                } ${classNameConverter(
                                    conflict.second.lessonType
                                )} [${conflict.second.classNo}], ${
                                    conflict.second.startTime
                                } - ${conflict.second.endTime}`}
                            </div>
                        ))
                    )}
                </AccordionDetails>
            </Accordion>
        )
    );
};

export default ModAlert;
