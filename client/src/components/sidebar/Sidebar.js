import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Cart from './cart/Cart';
import Ranking from './ranking/Ranking';
import Modal from 'react-modal';
import Drawer from '@material-ui/core/Drawer';
import ModuleContext from '../../context/module/moduleContext';
import LayoutContext from '../../context/layout/layoutContext';
import arrayMove from 'array-move';

const Sidebar = () => {
    const [ModalIsOpen, setModalIsOpen] = useState(false);
    const moduleContext = useContext(ModuleContext);
    const layoutContext = useContext(LayoutContext);

    const {
        currentModules,
        getModules,
        confirmedModules,
        setCurrentModules,
        updateModuleRankings
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

    const onSortEnd = ({ oldIndex, newIndex }) => {
        console.log(`oldIndex: ${oldIndex}`);
        console.log(`newIndex: ${newIndex}`);
        updateModuleRankings(arrayMove(currentModules, oldIndex, newIndex));
    };

    return (
        <Drawer
            className='sidebar'
            anchor={'right'}
            open={isSidebarOpen}
            transitionDuration={300}
            variant={'persistent'}
        >
            <div className='text-center p m'>
                <h2>Your Modules:</h2>
            </div>
            <button
                className='btn btn-dark my'
                onClick={() => setModalIsOpen(true)}
            >
                Rank Modules
            </button>

            <Cart />

            <div className='main-shift container-center'>
                <Modal
                    isOpen={ModalIsOpen}
                    className='ranking'
                    overlayClassName='ranking-overlay'
                >
                    <div className='ranking-container'>
                        <h2>Module Rankings</h2>
                        <div style={{ textAlign: 'center' }}>
                            Drag and drop to rearrange and rank modules
                        </div>
                        <br />
                        <Ranking
                            axis='xy'
                            onSortEnd={onSortEnd}
                            modules={currentModules}
                        />
                        <br />
                        <button
                            className='btn btn-dark'
                            onClick={() => setModalIsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            </div>
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
