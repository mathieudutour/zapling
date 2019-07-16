import * as bcrypt from 'bcryptjs'
import { findUserByApiKey, findUserByEmail, createUser } from './storage'
import { _handler } from './_handler'

class BadRequest extends Error {
  status = 400
}

class NotFound extends Error {
  status = 404
}

// TODO: rate limiting
export const login = _handler(async event => {
  let { email, password } = JSON.parse(event.body)
  if (!email || !password) {
    throw new BadRequest('Missing parameter')
  }

  const data = await findUserByEmail(email)

  if (!data) {
    throw new BadRequest('Wrong email')
  }

  if (!(await bcrypt.compare(password, data.password))) {
    throw new BadRequest('Wrong password')
  }

  return {
    data,
  }
})

export const signup = _handler(async event => {
  let { email, password } = JSON.parse(event.body)
  if (!email || !password) {
    throw new BadRequest('Missing parameter')
  }

  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    throw new BadRequest('Existing user with that email')
  }

  const data = await createUser({
    email,
    password: await bcrypt.hash(password, 10),
  })

  return {
    data,
  }
})

export const me = _handler(async event => {
  let { apiKey } = event.queryStringParameters
  if (!apiKey) {
    throw new BadRequest('Missing `apiKey` query parameter')
  }

  const data = await findUserByApiKey(apiKey)

  if (!data) {
    throw new NotFound('Could not find the user')
  }

  return {
    data,
  }
})
