import * as React from 'react'

import Button from './button'
import User from '../models/user'
import { login } from '../utils/auth'

import './form.css'

const Signup = () => {
  const [loading, setLoading] = React.useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value
    const password2 = e.currentTarget.password2.value

    if (password !== password2) {
      alert('Your passwords do not match!')
      return
    }

    setLoading(true)

    fetch(`${process.env.GATSBY_API_URL}/signup`, {
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
        <h2 style={{ position: 'relative', top: '14px' }}>Sign up</h2>
        <br />
        <label>
          Email address
          <br />
          <input
            id="email"
            name="email"
            type="email"
            style={{ marginTop: '10px' }}
          />
        </label>
        <br />
        <label>
          Password
          <br />
          <input
            name="password"
            id="password"
            type="password"
            style={{ marginTop: '10px' }}
          />
        </label>
        <br />
        <label style={{ marginBottom: '20px' }}>
          Password again
          <br />
          <input
            name="password2"
            id="password2"
            type="password"
            style={{ marginTop: '10px' }}
          />
        </label>
        <br />
        <Button submit>{loading ? 'Signing up...' : 'Sign up'}</Button>
      </div>
    </form>
  )
}

export default Signup
