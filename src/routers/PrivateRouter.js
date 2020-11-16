import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import NavBarPage from '../components/Navbar/NavBarBootstrap';

export const PrivateRoute = ( { 
    isAuthenticated, 
    component: Component,
    ...rest}) => (
    <Route {...rest}  component={(props) => (
        isAuthenticated ? (
            <div>
                <NavBarPage />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to='/' />
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute);