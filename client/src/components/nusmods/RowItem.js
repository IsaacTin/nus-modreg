import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import ModuleContext from '../../context/module/moduleContext';


const RowItem = ({module, day}) => {
    const [ModalIsOpen, setModalIsOpen] = useState(false);

    const moduleContext = useContext(ModuleContext);

    const {
        displayedModules,
        setDisplayedModules,
        currentModules
    } = moduleContext;

    let moduleColor = [];

   
    const onChange = (module) => {
        /* eslint-disable */
        let temp = [];
        displayedModules.map((module1) => {
            module1.lessonType === module.lessonType && module1.moduleCode === module.moduleCode
                ? temp.push(module) : temp.push(module1)
        })
        setDisplayedModules(temp)
        setModalIsOpen(false);
    }

    const setColor = (module) => {
        let temp = [];
        displayedModules.map((module1) => {
            moduleColor.filter(
                (module2) => module1.moduleCode === module2.moduleCode
            ).length === 0
                ? temp.push(module1)
                : null;
        });
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].moduleCode === module.moduleCode) {
                return 'btn btn-module' + (i + 1).toString();
            }
        }
    };

    const selected = (module) => {
        const color = displayedModules.filter((module1) => {
            return (
                module.moduleCode === module1.moduleCode &&
                module.lessonType === module1.lessonType &&
                module.classNo === module1.classNo
            )
        }).length > 0 
        ? 'selected' : 'unselected'
        return color
    }

    return (
        <div>
            <button
                className={setColor(module)}
                onClick={() => setModalIsOpen(true)}
            >
            {module.moduleCode}
            <br />
            {module.lessonType === "Tutorial" ? 'TUT' : 
                module.lessonType === "Laboratory" ? 'LAB':
                    module.lessonType === "Lecture" ? 'LEC' :
                        module.lessonType === "Recitation" ? 'REC' : ""}[{module.classNo}]
            <br /> 
            {module.timing[0].venue}
            </button>
            <Modal
                isOpen={ModalIsOpen}
                className='main ranking'
            >
            <div>
            {currentModules.map((module1, index) => {
                if(module1.lessonType === module.lessonType 
                    && module1.moduleCode === module.moduleCode) 
                return (
                    <div key={index} >
                        <button onClick={() => onChange(module1)} className={selected(module1)}>
                            {module1.moduleCode}
                            <br />
                            {module1.lessonType === "Tutorial" ? 'TUT' : 
                                module1.lessonType === "Laboratory" ? 'LAB':
                                    module1.lessonType === "Lecture" ? 'LEC' :
                                        module1.lessonType === "Recitation" ? 'REC' : ""}[{module1.classNo}]
                            <br/>
                            {module1.timing.map((timeslot, index) => (
                                <div key={index}>
                                    {`${timeslot.day}, ${timeslot.startTime} - ${timeslot.endTime}`}
                                </div>
                            ))}
                            {`Module rank: ${index + 1}`}
                        </button>
                    </div>
                )
            })}
            </div>
            <div>
            </div>
            </Modal>
        </div>
    );
};

Modal.setAppElement('body');

export default RowItem;
