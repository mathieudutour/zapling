import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Dashboard from '../components/dashboard'
import { useGlobalState } from '../store'
import { withAuth } from '../utils/auth'

const DashboardPage = ({ location }) => {
  const [user] = useGlobalState('user')

  // If the user isn't logged in, move them to the login
  if (!user) {
    navigate('/login')
    return null
  }

  // in case we are redirected from the Stripe checkout,
  // there will be ?session_id in the URL.
  // given there might not be a `subscriptionId` on the User yet (because of
  // race conditions, the subscription being creating in a webhook), we are
  // going to hide the notice if we have the session_id
  const hideStripNotice =
    ((location || { search: '' }).search || '').indexOf('?session_id') !== -1

  return (
    <Layout>
      <SEO title="Dashboard" />
      <Dashboard hideStripNotice={hideStripNotice} />
    </Layout>
  )
}

export default withAuth(DashboardPage)
