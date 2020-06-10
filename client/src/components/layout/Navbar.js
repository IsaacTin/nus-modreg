import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import LayoutContext from '../../context/layout/layoutContext';
import Sidebar from '../sidebar/Sidebar';
import nus_logo from './nus_logo.png';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const layoutContext = useContext(LayoutContext);

    const { isAuthenticated, user, logout } = authContext;
    const { isSidebarOpen, toggleSidebar } = layoutContext;

    const onLogout = () => {
        logout();
    };

    const authLinks = (
        <Fragment>
            <li className='nav-text'>
                <h4>{user && user.name}</h4>
            </li>
            <li className='nav-item'>
                <a
                    className={
                        isSidebarOpen ? 'icon-button-selected' : 'icon-button'
                    }
                    href='#!'
                    onClick={toggleSidebar}
                >
                    <i className='fas fa-shopping-cart'></i>
                </a>
            </li>
            <li className='nav-item'>
                <a onClick={onLogout} className='icon-button' href='#!'>
                    <i className='fas fa-sign-out-alt'></i>
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
                        <img src={nus_logo} alt='nus_logo' id='nus-logo' />
                    </li>
                </ul>
                <ul className='navbar-nav'>{isAuthenticated && authLinks}</ul>
            </div>
        </Fragment>
    );
};

export default Navbar;
