import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import LayoutContext from '../../context/layout/layoutContext';
import ModuleContext from '../../context/module/moduleContext';

const NavMenu = () => {
    const authContext = useContext(AuthContext);
    const layoutContext = useContext(LayoutContext);
    const moduleContext = useContext(ModuleContext);

    const { logout } = authContext;
    const { closeSidebar } = layoutContext;
    const { clearModules } = moduleContext;

    const onLogout = () => {
        logout();
        closeSidebar();
        clearModules();
    };

    return (
        <div className='dropdown'>
            <li className='menu-item'>
                <Link to='/guide'>
                    <i className='fas fa-info-circle'></i>
                    About
                </Link>
            </li>
            <li className='menu-item'>
                <Link to='/location'>
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
    );
};

export default NavMenu;
