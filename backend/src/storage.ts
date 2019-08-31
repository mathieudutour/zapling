import * as AWS from 'aws-sdk'
import UIDGenerator from 'uid-generator'

export type User = {
  email: string // index
  password: string

  /* used to verify the email */
  verified: boolean
  emailToken: string

  apiKey: string // used by zapier
  trees: number
  credit: number
  checkoutSessionId?: string
  stripeId?: string
  subscriptionId?: string

  lastSeenAt: number
  createdAt?: number
}

const db = new AWS.DynamoDB.DocumentClient()
const uidgen = new UIDGenerator()

export const findUserByApiKey = async (
  apiKey: String
): Promise<User | undefined> => {
  if (!apiKey) {
    return Promise.resolve(undefined)
  }
  const meta = await db
    .query({
      TableName: process.env.USERS_TABLE_NAME,
      IndexName: 'indexByApiKey',
      ProjectionExpression:
        'email, apiKey, trees, credit, subscriptionId, stripeId',
      KeyConditionExpression: 'apiKey = :apiKey',
      ExpressionAttributeValues: {
        ':apiKey': String(apiKey),
      },
    })
    .promise()
  return (meta || { Items: [] }).Items[0]
}

export const findUserByStripeId = async (
  stripeId: String
): Promise<User | undefined> => {
  if (!stripeId) {
    return Promise.resolve(undefined)
  }
  const meta = await db
    .query({
      TableName: process.env.USERS_TABLE_NAME,
      IndexName: 'indexByStripeId',
      KeyConditionExpression: 'stripeId = :stripeId',
      ExpressionAttributeValues: {
        ':stripeId': String(stripeId),
      },
    })
    .promise()
  return (meta || { Items: [] }).Items[0]
}

export const findUserByCheckoutSessionId = async (
  checkoutSessionId: String
): Promise<User | undefined> => {
  if (!checkoutSessionId) {
    return Promise.resolve(undefined)
  }
  const meta = await db
    .query({
      TableName: process.env.USERS_TABLE_NAME,
      IndexName: 'indexByCheckoutSessionId',
      KeyConditionExpression: 'checkoutSessionId = :checkoutSessionId',
      ExpressionAttributeValues: {
        ':checkoutSessionId': String(checkoutSessionId),
      },
    })
    .promise()
  return (meta || { Items: [] }).Items[0]
}

export const findUserByEmail = async (
  email: String
): Promise<User | undefined> => {
  if (!email) {
    return Promise.resolve(undefined)
  }
  const meta = await db
    .get({
      TableName: process.env.USERS_TABLE_NAME,
      Key: {
        email: String(email),
      },
    })
    .promise()
  return (meta || { Item: undefined }).Item
}

export const updateUser = async (
  existingUser: User,
  newData?: Partial<User>
) => {
  existingUser.lastSeenAt = Date.now()
  if (newData) {
    existingUser = Object.assign(existingUser, newData)
  }
  await db
    .put({
      TableName: process.env.USERS_TABLE_NAME,
      Item: existingUser,
    })
    .promise()
  return existingUser
}

export const createUser = async (
  data: Pick<User, 'email' | 'password' | 'checkoutSessionId' | 'stripeId'>
) => {
  const user = {
    ...data,
    verified: false,
    emailToken: await uidgen.generate(),

    trees: 0,
    credit: 0,

    // generate a random API key
    apiKey: await uidgen.generate(),

    createdAt: Date.now(),
    lastSeenAt: Date.now(),
  }

  await db
    .put({
      TableName: process.env.USERS_TABLE_NAME,
      Item: user,
    })
    .promise()
  return user
}
