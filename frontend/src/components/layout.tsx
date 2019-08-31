import React, { Fragment } from 'react'
// import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'
import './layout.css'

type Props = {
  isLoggedIn?: boolean
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="site">
      <Header />
      <main className="site-content">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
