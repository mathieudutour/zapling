import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Dashboard from '../components/dashboard'
import { useGlobalState } from '../store'
import { withAuth } from '../utils/auth'

const DashboardPage = () => {
  const [user] = useGlobalState('user')

  // If the user isn't logged in, move them to the login
  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <Layout>
      <SEO title="Dashboard" />
      <Dashboard />
    </Layout>
  )
}

export default withAuth(DashboardPage)
