type UserType = {
  _id: string
  apiKey: string
  createdAt: number
  credit: number
  email: string
  emailToken: string
  lastSeenAt: number
  stripeId?: string
  trees: number
  verified: boolean
}

class User {
  _id: string
  apiKey: string
  createdAt: number
  credit: number
  email: string
  emailToken: string
  lastSeenAt: number
  stripeId?: string
  trees: number
  verified: boolean

  constructor(user: UserType) {
    this._id = user._id
    this.apiKey = user.apiKey
    this.createdAt = user.createdAt
    this.credit = user.credit
    this.email = user.email
    this.emailToken = user.emailToken
    this.lastSeenAt = user.lastSeenAt
    this.stripeId = user.stripeId
    this.trees = user.trees
    this.verified = user.verified
  }
}

export default User
