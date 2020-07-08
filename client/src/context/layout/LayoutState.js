import React, { useReducer } from 'react';
import LayoutContext from './layoutContext';
import layoutReducer from './layoutReducer';
import {
    TOGGLE_SIDEBAR,
    CLOSE_SIDEBAR,
    TOGGLE_MENU,
    CLOSE_MENU
} from '../types';

const LayoutState = (props) => {
    const initialState = {
        isSidebarOpen: false,
        isMeunOpen: false
    };

    const [state, dispatch] = useReducer(layoutReducer, initialState);

    const toggleSidebar = () => {
        dispatch({
            type: TOGGLE_SIDEBAR
        });
    };

    const closeSidebar = () => {
        dispatch({
            type: CLOSE_SIDEBAR
        });
    };

    const toggleMenu = () => {
        dispatch({
            type: TOGGLE_MENU
        });
    };

    const closeMenu = () => {
        dispatch({
            type: CLOSE_MENU
        });
    };

    return (
        <LayoutContext.Provider
            value={{
                isSidebarOpen: state.isSidebarOpen,
                isMenuOpen: state.isMenuOpen,
                toggleSidebar,
                closeSidebar,
                toggleMenu,
                closeMenu
            }}
        >
            {props.children}
        </LayoutContext.Provider>
    );
};

export default LayoutState;
