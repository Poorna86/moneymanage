import React from 'react'
import {NavLink} from 'react-router-dom';
import '../styles/components/header.scss';

const Header = () => (
    <header className='header'>
        <NavLink to="/dashboard" className='header-is-active'>Dashboard</NavLink>
        <NavLink to="/create" className='header-is-active' >Create Expenses</NavLink>
    </header>
)

export default Header;