import React from 'react'
import { navigate } from 'gatsby'

import User from '../models/user'
import { setGlobalState, useGlobalState } from '../store'
import { useEffect } from 'react'

const storageKey = '__authState'

const login = async (user: User, redirect: boolean = true) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, JSON.stringify(user))
  }
  setGlobalState('user', user)
  if (redirect) {
    await navigate('/dashboard')
  }
}

const checkSession = async () => {
  if (typeof window === 'undefined') {
    setGlobalState('isLoadingUser', false)
    return
  }
  const _user = window.localStorage.getItem(storageKey)
  if (!_user) {
    setGlobalState('isLoadingUser', false)
    return
  }

  const user = new User(JSON.parse(_user))

  try {
    const response = await fetch(
      `${process.env.GATSBY_API_URL}/me?apiKey=${user.apiKey}`,
      {
        method: 'GET',
        mode: 'cors',
      }
    )

    if (response.ok) {
      const { data } = await response.json()
      setGlobalState('user', new User(data))
      setGlobalState('isLoadingUser', false)
    } else {
      setGlobalState('user', user)
      setGlobalState('isLoadingUser', false)
    }
  } catch {
    setGlobalState('user', user)
    setGlobalState('isLoadingUser', false)
  }
}

const logout = async () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(storageKey)
  }
  await navigate('/')
  setGlobalState('user', null)
}

// HOC for pages which need to use auth
const withAuth = WrappedElement => {
  return () => {
    const [user] = useGlobalState('user')
    const [isLoadingUser] = useGlobalState('isLoadingUser')

    // Check the session on page load
    useEffect(() => {
      if (!user) {
        checkSession()
      }
    }, [user])

    if (isLoadingUser) {
      return 'Loading...'
    }

    return <WrappedElement />
  }
}

export { checkSession, login, logout, withAuth }
