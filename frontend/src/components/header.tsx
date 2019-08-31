import React from 'react'
import { Link, navigate } from 'gatsby'

import Logo from './logo'
import Button from './button'
import { useGlobalState } from '../store'
import { logout } from '../utils/auth'

import './header.css'

const Header = () => {
  const [user] = useGlobalState('user')

  return (
    <header className="header">
      <Link to="/">
        <Logo />
      </Link>
      <nav className="nav">
        {user ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <Link to="/">Home</Link>
        )}
        {!user && <Link to="#pricing">Pricing</Link>}
        {!user && <Link to="/login">Login</Link>}
        {user ? (
          <Button
            full
            onClick={async e => {
              e.preventDefault()
              await logout()
            }}
          >
            Log out
          </Button>
        ) : (
          <Link to="/signup" className="full">
            Signup
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
