import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import ModuleContext from '../../context/module/moduleContext';
import classNameConverter from '../../utils/classNameConverter';

const RowItem = ({ module, day }) => {
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    // const [selected, setSelected] = useState(false);

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
        setModalIsOpen(false);
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

    const selected = (module) => {
        const color = `select-slot-card ${
            displayedModules.filter((module1) => {
                return (
                    module.moduleCode === module1.moduleCode &&
                    module.lessonType === module1.lessonType &&
                    module.classNo === module1.classNo
                );
            }).length > 0
                ? 'selected'
                : ''
        }`;
        return color;
    };

    const moduleButton = (
        <button
            className={setColor(module)}
            onClick={() => setModalIsOpen(true)}
        >
            {module.moduleCode}
            <br />
            {`${classNameConverter(module.lessonType)} [${module.classNo}]`}
            <br />
            {module.timing[0].venue}
        </button>
    );

    return (
        <div>
            {moduleButton}
            <Modal isOpen={ModalIsOpen} className='select-slot-modal'>
                {currentModules !== null &&
                    currentModules.map((module1, index) => {
                        if (
                            module1.lessonType === module.lessonType &&
                            module1.moduleCode === module.moduleCode
                        )
                            return (
                                <div key={index}>
                                    <button
                                        onClick={() => onChange(module1)}
                                        className={selected(module1)}
                                    >
                                        {`${
                                            module1.moduleCode
                                        }: ${classNameConverter(
                                            module1.lessonType
                                        )} [${module1.classNo}]`}
                                        <br />
                                        {module1.timing.map(
                                            (timeslot, index) => (
                                                <div key={index}>
                                                    {`${timeslot.day}, ${timeslot.startTime} - ${timeslot.endTime}`}
                                                </div>
                                            )
                                        )}
                                        {`Module rank: ${index + 1}`}
                                    </button>
                                </div>
                            );
                    })}
                <button
                    className='btn btn-dark m-1'
                    onClick={() => setModalIsOpen(false)}
                >
                    Close
                </button>
            </Modal>
        </div>
    );
};

Modal.setAppElement('body');

export default RowItem;
