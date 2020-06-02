import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Guide from './components/pages/Guide';
import Confirmation from './components/pages/Confirmation';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';

import ModuleState from './context/module/ModuleState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import SearchState from './context/searc/SearchState';

import './App.css';

const App = () => {
    return ( 
        <AuthState>
            <ModuleState>
                <AlertState>
                    <SearchState>
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
                                        //why is path small letter
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
                                            path='login'
                                            component={Login}
                                        />
                                    </Switch>
                                </div>
                            </Fragment>
                        </Router>
                    </SearchState>
                </AlertState>
            </ModuleState>
        </AuthState>
     );
}
 
export default App;
