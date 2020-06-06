import React, {useState} from 'react';
import Cart from './cart/Cart';
import Ranking from './ranking/Ranking';
import Modal from 'react-modal';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Sidebar = () => {
    const [ModalIsOpen, setModalIsOpen] = useState(false)
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