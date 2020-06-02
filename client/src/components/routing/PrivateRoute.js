import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/auth/aauthContext'

const PrivateRoute = ({component: Component, ...rest}) => {
    const authContext = useContext(AuthContext);
    const{isAuthenticated, loading} = authContext;
    return ( 
        <Route 
            //What's rest here for?
            {...rest}
            render={(props) =>
                !isAuthenticated && !loading ? (
                    <Redirect to='/login/' />
                ) : (
                    //Indicating that this is a component(?)
                    <Component {...props} />
                )
            }
        />
     );
}
 
export default PrivateRoute;