import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/layout'
import LoginForm from '../components/login-form'
import SEO from '../components/seo'
import { useGlobalState } from '../store'
import { withAuth } from '../utils/auth'

const LoginPage = () => {
  const [user] = useGlobalState('user')

  console.log('user on login page', user)

  // If the user is logged in, navigate to the dashboard
  if (user) {
    navigate('/dashboard')
    return null
  }

  return (
    <Layout>
      <SEO title="Login" />
      <LoginForm />
    </Layout>
  )
}

export default withAuth(LoginPage)
