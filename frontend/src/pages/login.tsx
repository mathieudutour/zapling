import React from 'react'
import { navigate } from 'gatsby'

import { withAuth } from '../components/with-auth'
import Layout from '../components/layout'
import LoginForm from '../components/login-form'
import SEO from '../components/seo'

import './index.css'

const LoginPage = ({ status, user, login }) => {
  // If the user is logged in, navigate to the dashboard
  if (status == 'in' && !!user) {
    navigate('/')
  }

  return (
    <Layout>
      <SEO title="Login" />
      <LoginForm onLogin={login} />
    </Layout>
  )
}

export default withAuth(LoginPage)
