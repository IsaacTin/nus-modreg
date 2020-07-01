import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import ModuleContext from '../../context/module/moduleContext';

<<<<<<< HEAD
const RowItem = ({ module, timing }) => {
=======
const RowItem = ({ module, day }) => {
>>>>>>> isaac
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
            module1.lessonType === module.lessonType &&
            module1.moduleCode === module.moduleCode
                ? temp.push(module)
                : temp.push(module1);
        });
        setDisplayedModules(temp);
<<<<<<< HEAD
=======
        setModalIsOpen(false);
>>>>>>> isaac
    };

    const setColor = (module) => {
        let temp = [];
        displayedModules.map((module1) => {
            moduleColor.filter(
                (module2) => module1.moduleCode === module2.moduleCode
            ).length === 0
                ? temp.push(module1)
                : null;
        });
<<<<<<< HEAD
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].moduleCode === module.moduleCode) {
                return 'btn btn-module' + (i + 1).toString();
            }
        }
    };
=======

        const chooseColor = (index) => {
            const colorSelector = index % 8;
            switch (colorSelector) {
                case 0:
                    return 'red';
                case 1:
                    return 'orange';
                case 2:
                    return 'yellow';
                case 3:
                    return 'green';
                case 4:
                    return 'cyan';
                case 5:
                    return 'darkblue';
                case 6:
                    return 'purple';
                case 7:
                    return 'brown';
            }
        };
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].moduleCode === module.moduleCode) {
                const color = chooseColor(i);
                return `btn btn-module module-${color}`;
            }
        }
    };

    const getLessonType = (lessonName) => {
        switch (lessonName) {
            case 'Tutorial':
                return 'TUT';
            case 'Laboratory':
                return 'LAB';
            case 'Lecture':
                return 'LEC';
            case 'Sectional Teaching':
                return 'SEC';
            case 'Recitation':
                return 'REC';
            case 'Seminar-Style Module Class':
                return 'SEM';
            default:
                return '';
        }
    };

    const selected = (module) => {
        const color =
            displayedModules.filter((module1) => {
                return (
                    module.moduleCode === module1.moduleCode &&
                    module.lessonType === module1.lessonType &&
                    module.classNo === module1.classNo
                );
            }).length > 0
                ? 'selected'
                : 'unselected';
        return color;
    };
>>>>>>> isaac

    return (
        <div>
            <button
                className={setColor(module)}
                onClick={() => setModalIsOpen(true)}
            >
                {module.moduleCode}
                <br />
<<<<<<< HEAD
                {module.lessonType === 'Tutorial'
                    ? 'TUT'
                    : module.lessonType === 'Laboratory'
                    ? 'LAB'
                    : module.lessonType === 'Lecture'
                    ? 'LEC'
                    : module.lessonType === 'Recitation'
                    ? 'REC'
                    : ''}
                [{module.classNo}]
=======
                {`${getLessonType(module.lessonType)} [${module.classNo}]`}
>>>>>>> isaac
                <br />
                {module.timing[0].venue}
            </button>
            <Modal isOpen={ModalIsOpen} className='main ranking'>
                <div>
                    {currentModules.map((module1, index) => {
                        if (
                            module1.lessonType === module.lessonType &&
                            module1.moduleCode === module.moduleCode
                        )
                            return (
                                <div key={index}>
<<<<<<< HEAD
                                    <button onClick={() => onChange(module1)}>
                                        {module1.moduleCode}
                                        <br />
                                        {module1.lessonType === 'Tutorial'
                                            ? 'TUT'
                                            : module1.lessonType ===
                                              'Laboratory'
                                            ? 'LAB'
                                            : module1.lessonType === 'Lecture'
                                            ? 'LEC'
                                            : module1.lessonType ===
                                              'Recitation'
                                            ? 'REC'
                                            : ''}
                                        [{module1.classNo}]
                                        <br />
=======
                                    <button
                                        onClick={() => onChange(module1)}
                                        className={selected(module1)}
                                    >
                                        {module1.moduleCode}
                                        <br />
                                        {getLessonType(module1.lessonType)}[
                                        {module1.classNo}]
                                        <br />
                                        {module1.timing.map(
                                            (timeslot, index) => (
                                                <div key={index}>
                                                    {`${timeslot.day}, ${timeslot.startTime} - ${timeslot.endTime}`}
                                                </div>
                                            )
                                        )}
                                        {`Module rank: ${index + 1}`}
>>>>>>> isaac
                                    </button>
                                </div>
                            );
                    })}
<<<<<<< HEAD
                </div>
                <div>
=======
>>>>>>> isaac
                    <button
                        className='btn btn-dark'
                        onClick={() => setModalIsOpen(false)}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

Modal.setAppElement('body');

export default RowItem;
