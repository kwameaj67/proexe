import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="header_container">
            <Link to='/' style={{"textDecoration": 'none'}}>
                <p>Dashboard</p>
            </Link>
        </div>
    )
}

export default Header;