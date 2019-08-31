import React from 'react'
import Button from './button'
import User from '../models/user'
import { login } from '../utils/auth'

import './form.css'

const LoginForm = () => {
  const [loading, setLoading] = React.useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    setLoading(true)

    fetch(`${process.env.GATSBY_API_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(async response => {
        const data = await response.json()
        if (response.ok) {
          return data
        }
        throw new Error(data.message)
      })
      .then(async ({ data }) => {
        await login(new User(data))
        setLoading(false)
      })
      .catch(async message => {
        setLoading(false)
        alert(message)
        console.error(message)
      })
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="wrapper" style={{ marginTop: '30px' }}>
        <h2 style={{ position: 'relative', top: '14px' }}>Login</h2>
        <br />
        <label>
          Email address
          <br />
          <input name="email" type="email" style={{ marginTop: '10px' }} />
        </label>
        <br />
        <label style={{ marginBottom: '20px' }}>
          Password
          <br />
          <input
            name="password"
            type="password"
            style={{ marginTop: '10px' }}
          />
        </label>
        <br />
        <Button submit>{loading ? 'Logging in...' : 'Log in'}</Button>
      </div>
    </form>
  )
}

export default LoginForm
