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
    const [displayed, setDisplayed] = useState(true)

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
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (confirmedModules !== null && currentModules === null) {
            setCurrentModules(confirmedModules);
        }
    }, [confirmedModules, currentModules]);

    // console.log(currentModules);
    // useEffect(() => {
    //     if (currentModules !== null && currentModules.length > 0) {
    //         const fetchModules = async () => {
    //             setDisplayedModules(await moduleArrayConverter(currentModules));
    //         };
    //         fetchModules();
    //     }
    // }, [currentModules]);

    return (
        <Drawer
            className='sidebar'
            anchor={'right'}
            open={isSidebarOpen}
            variant={'persistent'}
        >
            <div className='text-center'>
                <h3>Your modules:</h3>
            </div>
            {displayed ? <Cart /> : null}
            <button
                className='btn btn-light'
                onClick={() => setModalIsOpen(true)}
            >
                Rank Modules
            </button>
            <div className='main-shift container-center'>
                <Modal
                    isOpen={ModalIsOpen}
                    className={
                        isSidebarOpen ? 'main-shift ranking' : 'main ranking'
                    }
                    overlayClassName='ranking-overlay'
                >
                    <Ranking />
                    <div>
                        <button
                            className='btn btn-dark'
                            onClick={() => setModalIsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            </div>
        </Drawer>
    );
};

Modal.setAppElement('body');

export default Sidebar;
