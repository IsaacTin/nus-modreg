import React, { useContext } from 'react';
import classNameConverter from '../../utils/classNameConverter';
import ModalertContext from '../../context/modalert/modalertContext';

const ModAlert = () => {
    const modalertContext = useContext(ModalertContext);
    const { conflicts } = modalertContext;
    return (
        conflicts.length > 0 && (
            <div className='container grid-5'>
                {conflicts.map((conflict, index) => (
                    <div key={index} className='module-alert-card'>
                        {`${conflict.first.day}:`}
                        <br />
                        {`${conflict.first.moduleCode} ${classNameConverter(
                            conflict.first.lessonType
                        )} [${conflict.first.classNo}], ${
                            conflict.first.startTime
                        } - ${conflict.first.endTime} & ${
                            conflict.second.moduleCode
                        } ${classNameConverter(conflict.second.lessonType)} [${
                            conflict.second.classNo
                        }], ${conflict.second.startTime} - ${
                            conflict.second.endTime
                        }`}
                    </div>
                ))}
            </div>
        )
    );
};

export default ModAlert;
