import React, {useState, useEffect, useContext} from 'react';
import Cart from './cart/Cart';
import Ranking from './ranking/Ranking';
import Modal from 'react-modal';
import ModuleContext from '../../context/module/moduleContext';
import moduleArrayConverter from '../../utils/moduleArrayConverter';


import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Sidebar = () => {
    const [ModalIsOpen, setModalIsOpen] = useState(false)
    const moduleContext = useContext(ModuleContext);

    const {
        currentModules,
        getModules,
        confirmedModules,
        setCurrentModules,
        setDisplayedModules,
        displayedModules
    } = moduleContext;


    useEffect(() => {
        getModules();
        if(confirmedModules !== null && currentModules === null) {
            setCurrentModules(confirmedModules);             
        }
        if(currentModules !== null && displayedModules === null) {
                const fetchModules = async () => {
                    setDisplayedModules(await moduleArrayConverter(currentModules))
        }
        fetchModules();
        }
        }, [confirmedModules, currentModules, displayedModules])

    return ( 
            <div className="Sidebar">
                <h2>Modules</h2>
                <Cart />
                <button onClick={() => setModalIsOpen(true)}>Rank Modules</button>
                <Modal isOpen={ModalIsOpen}>
                    <Ranking />
                    <div>
                        <button onClick={() => setModalIsOpen(false)}>Close</button>
                    </div>
                </Modal>
                
            </div>
     );
}

Modal.setAppElement('body');

export default Sidebar;