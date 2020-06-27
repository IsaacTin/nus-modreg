import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Cart from './cart/Cart';
import Ranking from './ranking/Ranking';
import Modal from 'react-modal';
import Drawer from '@material-ui/core/Drawer';
import ModuleContext from '../../context/module/moduleContext';
import LayoutContext from '../../context/layout/layoutContext';


const Sidebar = () => {
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const moduleContext = useContext(ModuleContext);
    const layoutContext = useContext(LayoutContext);
    const [displayed, setDisplayed] = useState(true)

    const {
        currentModules,
        getModules,
        confirmedModules,
        setCurrentModules,
    } = moduleContext;

    const { isSidebarOpen, closeSidebar } = layoutContext;

    useEffect(() => {
        getModules();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (confirmedModules !== null && currentModules === null) {
            setCurrentModules(confirmedModules);
        }
         // eslint-disable-next-line
    }, [confirmedModules, currentModules]);

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
            <button
                className='btn btn-dark'
                onClick={() => setModalIsOpen(true)}
            >
                Rank Modules
            </button>

            <Cart />

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
            {/* might want to change this to a link that goes to a different page */}
            <Link
                to='/confirmation'
                className='btn btn-primary'
                id='checkout-btn'
                onClick={() => closeSidebar()}
            >
                Checkout
            </Link>
        </Drawer>
    );
};

Modal.setAppElement('body');

export default Sidebar;
