import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Guide from './components/pages/Guide';
import Confirmation from './components/pages/Confirmation';
import Confirmed from './components/pages/Confirmed';
import Login from './components/auth/Login';
import Location from './components/pages/Location';
import Alerts from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import ModuleState from './context/module/ModuleState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import SearchState from './context/search/SearchState';
import LayoutState from './context/layout/LayoutState';
import MapState from './context/map/MapState';

import './App.css';

const App = () => {
    return (
        <AuthState>
            <ModuleState>
                <AlertState>
                    <SearchState>
                        <LayoutState>
                            <MapState>
                                <DndProvider backend={HTML5Backend}>
                                    <Router>
                                        <Fragment>
                                            <Navbar />
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
                                                    <PrivateRoute
                                                        exact
                                                        path='/confirmation'
                                                        component={Confirmation}
                                                    />
                                                    <PrivateRoute
                                                        exact
                                                        path='/confirmed'
                                                        component={Confirmed}
                                                    />
                                                    <Route
                                                        exact
                                                        path='/login'
                                                        component={Login}
                                                    />
                                                    <PrivateRoute
                                                        exact
                                                        path='/location'
                                                        component={Location}
                                                    />
                                                </Switch>
                                            </div>
                                        </Fragment>
                                    </Router>
                                </DndProvider>
                            </MapState>
                        </LayoutState>
                    </SearchState>
                </AlertState>
            </ModuleState>
        </AuthState>
    );
};

export default App;
