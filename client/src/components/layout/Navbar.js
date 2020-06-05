import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import nus_logo from './nus_logo.png';

const Navbar = () => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, user, logout } = authContext;

    const onLogout = () => {
        logout();
    };

    const authLinks = (
        <Fragment>
            <li>Hello, {user && user.name}</li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className='fas fa-sign-out-alt'></i>{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    );

    return (
        <div className='navbar bg-primary'>
            <ul>
                <li>
                    <img src={nus_logo} alt='nus_logo' id='nus-logo' />
                </li>
                <li> {/* to include mod reg wording here*/}</li>
            </ul>
            <ul>{isAuthenticated && authLinks}</ul>
        </div>
    );
};

export default Navbar;
