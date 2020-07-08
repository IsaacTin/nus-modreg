import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import LayoutContext from '../../context/layout/layoutContext';
import ModuleContext from '../../context/module/moduleContext';

import { CSSTransition } from 'react-transition-group';

const NavMenu = () => {
    const authContext = useContext(AuthContext);
    const layoutContext = useContext(LayoutContext);
    const moduleContext = useContext(ModuleContext);

    const { logout } = authContext;
    const { isMenuOpen, closeSidebar, closeMenu } = layoutContext;
    const { clearModules } = moduleContext;

    const onLogout = () => {
        logout();
        closeMenu();
        closeSidebar();
        clearModules();
    };

    return (
        <CSSTransition
            in={isMenuOpen}
            unmountOnExit
            timeout={300}
            appear
            classNames='menu-primary'
        >
            <div className='dropdown'>
                <li className='menu-item'>
                    <Link to='/guide' onClick={closeMenu}>
                        <i className='fas fa-info-circle'></i>
                        About
                    </Link>
                </li>
                <li className='menu-item'>
                    <Link to='/location' onClick={closeMenu}>
                        <i className='fas fa-map-marked-alt'></i>
                        Location Planning
                    </Link>
                </li>
                <li className='menu-item'>
                    <a onClick={onLogout} href='#!'>
                        <i className='fas fa-sign-out-alt'></i>
                        Logout
                    </a>
                </li>
            </div>
        </CSSTransition>
    );
};

export default NavMenu;
