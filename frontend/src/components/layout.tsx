import React, { Fragment } from 'react'
// import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'
import './layout.css'

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>

      <Footer />
    </Fragment>
  )
}

export default Layout
