import { Link } from 'gatsby'
import React from 'react'

import Logo from './logo'

import './header.css'

const Header = () => (
  <header className="header">
    <Link to="/">
      <Logo />
    </Link>
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/pricing">Pricing</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup" className="full">
        Signup
      </Link>
    </nav>
  </header>
)

export default Header
