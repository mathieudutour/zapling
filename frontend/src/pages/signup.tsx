import React from 'react'
import { navigate } from 'gatsby'

import { withAuth } from '../components/with-auth'
import Layout from '../components/layout'
import SignupForm from '../components/signup-form'
import SEO from '../components/seo'

import './index.css'

const SignupPage = ({ status, user, signup }) => {
  // If the user is logged in, navigate to the dashboard
  if (status == 'in' && !!user) {
    navigate('/')
  }

  return (
    <Layout>
      <SEO title="Sign up" />
      <SignupForm onSignup={signup} />
    </Layout>
  )
}

export default withAuth(SignupPage)
