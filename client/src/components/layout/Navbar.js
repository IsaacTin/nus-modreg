import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';
import AuthContext from '../../context/auth/authContext';
import LayoutContext from '../../context/layout/layoutContext';
import ModuleContext from '../../context/module/moduleContext';
import nus_logo from './nus_logo.png';
import { Menu } from 'react-feather';

import { CSSTransition } from 'react-transition-group';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const layoutContext = useContext(LayoutContext);
    const moduleContext = useContext(ModuleContext);

    const { isAuthenticated, user, logout } = authContext;
    const { isSidebarOpen, toggleSidebar, closeSidebar } = layoutContext;
    const { clearModules } = moduleContext;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onLogout = () => {
        logout();
        closeSidebar();
        clearModules();
    };

    const authLinks = (
        <Fragment>
            <li className='nav-text'>
                <div>{user && user.name}</div>
            </li>
            <li className='nav-item'>
                <Link to='/' className='icon-button'>
                    <i className='fas fa-home'></i>
                </Link>
            </li>
            {/* <li className='nav-item'>
                <Link to='/guide' className='icon-button'>
                    <i className='fas fa-info-circle'></i>
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/location' className='icon-button'>
                    <i className='fas fa-map-marked-alt'></i>
                </Link>
            </li> */}
            <li className='nav-item'>
                <a
                    className={`icon-button${
                        isSidebarOpen ? ' button-selected' : ''
                    }`}
                    href='#!'
                    onClick={toggleSidebar}
                >
                    <i className='fas fa-shopping-cart'></i>
                </a>
            </li>
            {/* <li className='nav-item'>
                <a onClick={onLogout} className='icon-button' href='#!'>
                    <i className='fas fa-sign-out-alt'></i>
                </a>
            </li> */}
            <li>
                <a
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    href='#!'
                    className={`nav-menu-icon${
                        isMenuOpen ? ' menu-selected' : ''
                    }`}
                >
                    {/* <i className='fas fa-bars'></i> */} <Menu />
                    {
                        <CSSTransition
                            in={isMenuOpen}
                            unmountOnExit
                            timeout={400}
                            appear
                            classNames='menu-primary'
                        >
                            <NavMenu />
                        </CSSTransition>
                    }
                </a>
            </li>
        </Fragment>
    );

    return (
        <Fragment>
            <div
                className={
                    isSidebarOpen
                        ? 'navbar-shift bg-primary'
                        : 'navbar bg-primary'
                }
            >
                <ul>
                    <li>
                        <Link to='/'>
                            <img src={nus_logo} alt='nus_logo' id='nus-logo' />
                        </Link>
                    </li>
                </ul>
                <ul className='navbar-nav'>{isAuthenticated && authLinks}</ul>
            </div>
        </Fragment>
    );
};

export default Navbar;
