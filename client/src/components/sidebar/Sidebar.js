import React, { useState, useEffect, useContext, Fragment } from 'react';
import Cart from './cart/Cart';
import Ranking from './ranking/Ranking';
import Modal from 'react-modal';
import Drawer from '@material-ui/core/Drawer';
import ModuleContext from '../../context/module/moduleContext';
import LayoutContext from '../../context/layout/layoutContext';
import moduleArrayConverter from '../../utils/moduleArrayConverter';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Sidebar = ({ pageWrapId }) => {
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const moduleContext = useContext(ModuleContext);
    const layoutContext = useContext(LayoutContext);

    const {
        currentModules,
        getModules,
        confirmedModules,
        setCurrentModules,
        setDisplayedModules,
        displayedModules
    } = moduleContext;

    const { isSidebarOpen } = layoutContext;

    useEffect(() => {
        getModules();
        // es-lint-disable-next-line
    }, []);

    useEffect(() => {
        if (confirmedModules !== null && currentModules.length === 0) {
            setCurrentModules(confirmedModules);
        }
        if (currentModules.length > 0) {
            const fetchModules = async () => {
                setDisplayedModules(await moduleArrayConverter(currentModules));
            };
            fetchModules();
        }
    }, [confirmedModules, currentModules]);

    return (
        <Drawer
            className='sidebar'
            anchor={'right'}
            open={isSidebarOpen}
            variant={'persistent'}
        >
            <h2>Modules</h2>
            <Cart />
            <button
                className='btn btn-light'
                onClick={() => setModalIsOpen(true)}
            >
                Rank Modules
            </button>
            <Modal isOpen={ModalIsOpen}>
                <Ranking />
                <div>
                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>
        </Drawer>
    );
};

Modal.setAppElement('body');

export default Sidebar;
