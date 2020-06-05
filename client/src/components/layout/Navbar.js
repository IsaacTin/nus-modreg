import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

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

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    );
    return (
        <div className='navbar bg-primary'>
            <h1></h1>
            <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
        </div>
    );
};

export default Navbar;
