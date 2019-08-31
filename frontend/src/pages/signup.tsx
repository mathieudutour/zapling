import React from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/layout'
import SignupForm from '../components/signup-form'
import SEO from '../components/seo'
import { useGlobalState } from '../store'
import { withAuth } from '../utils/auth'

const SignupPage = () => {
  const [user] = useGlobalState('user')

  // If the user is logged in, navigate to the dashboard
  if (user) {
    navigate('/dashboard')
    return null
  }

  return (
    <Layout>
      <SEO title="Sign up" />
      <SignupForm />
    </Layout>
  )
}

export default withAuth(SignupPage)
