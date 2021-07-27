import React from 'react'
import {NavLink} from 'react-router-dom';
import { history } from '../routers/AppRouter';
import '../styles/components/header.scss';

const Header = () => (
    <header className='header'>
        {history.location.pathname==='/dashboard' ? <a href='#' className='activePage'>Dashboard</a> : <NavLink to="/dashboard" className='header-is-active'>Dashboard</NavLink>}
        {history.location.pathname==='/dashboard' ? <NavLink  to="/create" className='header-is-active'>Add Expenses</NavLink> : <a href='#' className='activePage'>{window.location.pathname.search("edit") === 1 ? 'Edit Expenses' : 'Add Expenses'}</a>}
    </header>
)

export default Header;