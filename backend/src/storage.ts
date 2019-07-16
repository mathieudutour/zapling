import * as AWS from 'aws-sdk'
import UIDGenerator from 'uid-generator'

export type User = {
  email: string // index
  password: string

  /* used to verify the email */
  verified: boolean
  emailToken: string

  apiKey: string // used by zappier
  trees: number
  credit: number
  stripeId?: string

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
    .scan({
      TableName: process.env.USERS_TABLE_NAME,
      ProjectionExpression: 'email, apiKey, trees, credit',
      FilterExpression: 'apiKey = :apiKey',
      ExpressionAttributeValues: {
        ':apiKey': String(apiKey),
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

export const createUser = async (data: Pick<User, 'email' | 'password'>) => {
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
  return data
}
