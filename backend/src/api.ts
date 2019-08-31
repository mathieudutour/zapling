import * as bcrypt from 'bcryptjs'
import * as Stripe from 'stripe'
import { findUserByApiKey, findUserByEmail, createUser } from './storage'
import { _handler } from './_handler'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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

  delete data.password

  return {
    data,
  }
})

export const signup = _handler(async event => {
  let { email, password } = JSON.parse(event.body || '{}')
  if (!email || !password) {
    throw new BadRequest('Missing parameter')
  }

  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    throw new BadRequest('Existing user with that email')
  }

  const customer = await stripe.customers.create({
    email,
    metadata: {},
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: email,
    client_reference_id: customer.id,
    // @ts-ignore
    mode: 'setup',
    success_url: 'https://zapling.green/dashboard',
    cancel_url: 'https://zapling.green/dashboard',
  })

  const data = await createUser({
    email,
    password: await bcrypt.hash(password, 10),
    checkoutSessionId: session.id,
    stripeId: customer.id,
  })

  delete data.password

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
