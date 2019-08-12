import * as bcrypt from 'bcryptjs'
import * as Stripe from 'stripe'
import {
  findUserByApiKey,
  findUserByEmail,
  createUser,
  updateUser,
} from './storage'
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

export const subscribe = _handler(async event => {
  let { apiKey, token } = JSON.parse(event.body)
  if (!apiKey || !token) {
    throw new BadRequest('Missing parameter')
  }

  const existingUser = await findUserByApiKey(apiKey)

  if (!existingUser) {
    throw new NotFound('Could not find the user')
  }

  if (!existingUser.stripeId) {
    const customer = await stripe.customers.create({
      email: existingUser.email,
      source: token,
      metadata: {},
    })

    await updateUser(existingUser, {
      stripeId: customer.id,
    })

    existingUser.stripeId = customer.id
  } else {
    await stripe.customers.update(existingUser.stripeId, {
      email: existingUser.email,
      source: token,
      metadata: {},
    })
  }

  if (existingUser.subscriptionId) {
    // there is already a subscription so we just needed to update the source
    return { message: 'already have a subscription, all good' }
  }

  const subscription = await stripe.subscriptions.create({
    customer: existingUser.stripeId,
    items: [
      {
        plan: 'meteredtreeplanted',
      },
    ],
  })

  await updateUser(existingUser, {
    subscriptionId: subscription.id,
  })

  return {
    message: 'subscribed!',
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
