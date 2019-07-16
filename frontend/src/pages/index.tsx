import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Login from '../components/login'
import Signup from '../components/signup'
import { AuthContextConsumer } from '../components/auth-context'

const DashboardLinkOrLogin = () => {
  return (
    <AuthContextConsumer>
      {({ status, login }) => {
        switch (status) {
          case 'in':
            return 'Dashboard'
          case 'out':
            return (
              <>
                <Login onLogin={login} />
                <Signup onSignup={login} />
              </>
            )
          default:
            return null
        }
      }}
    </AuthContextConsumer>
  )
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <DashboardLinkOrLogin />
  </Layout>
)

export default IndexPage
