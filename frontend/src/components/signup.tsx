import * as React from 'react'

const Signup = ({
  onSignup,
}: {
  onSignup: (email: String, apiKey: String, trees: Number) => void
}) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

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
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(({ data }) => {
        onSignup(data.email, data.apiKey, data.trees)
      })
      .catch(response => console.error(response))
  }
  return (
    <form onSubmit={onSubmit}>
      Signup
      <input name="email" type="email" placeholder="email" />
      <input name="password" type="password" placeholder="password" />
      <input type="submit" />
    </form>
  )
}

export default Signup
