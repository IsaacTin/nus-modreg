import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Guide from './components/pages/Guide';
import Confirmation from './components/pages/Confirmation';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import ModuleState from './context/module/ModuleState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import SearchState from './context/search/SearchState';
import LayoutState from './context/layout/LayoutState';

import './App.css';
import Nusmods from './components/nusmods/Nusmods';

const App = () => {
    return (
        <AuthState>
            <ModuleState>
                <AlertState>
                    <SearchState>
                        <LayoutState>
                            <DndProvider backend={HTML5Backend}>
                                <Router>
                                    <Fragment>
                                        <Nusmods />
                                        {/*<Navbar />
                                        <div className='container'>
                                            <Alerts />
                                            <Switch>
                                                <PrivateRoute
                                                    exact
                                                    path='/'
                                                    component={Home}
                                                />
                                                <Route
                                                    exact
                                                    path='/guide'
                                                    component={Guide}
                                                />
                                                <Route
                                                    exact
                                                    path='/confirmation'
                                                    component={Confirmation}
                                                />
                                                <Route
                                                    exact
                                                    path='/login'
                                                    component={Login}
                                                />
                                            </Switch>
                                        </div>*/}
                                    </Fragment>
                                </Router>
                            </DndProvider>
                        </LayoutState>
                    </SearchState>
                </AlertState>
            </ModuleState>
        </AuthState>
    );
};

export default App;
