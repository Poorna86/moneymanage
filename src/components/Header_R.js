import React from 'react'
import {NavLink} from 'react-router-dom';
import { history } from '../routers/AppRouter';
import '../styles/components/header.scss';

const Header = () => (
    <header className='header'>
        <NavLink to="/dashboard" className='header-is-active'>Dashboard</NavLink>
        {history.location.pathname==='/dashboard' && <NavLink  to="/create" className='header-is-active'>Add Expenses</NavLink>}
    </header>
)

export default Header; 