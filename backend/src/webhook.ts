import { findUserByApiKey, updateUser } from './storage'
import { _handler } from './_handler'

class BadRequest extends Error {
  status = 400
}

class NotFound extends Error {
  status = 404
}

export const zappierPlantTree = _handler(async event => {
  let { apiKey } = event.queryStringParameters
  if (!apiKey) {
    throw new BadRequest('Missing `apiKey` query parameter')
  }

  let data = await findUserByApiKey(apiKey)

  if (!data) {
    throw new NotFound('Could not find the user')
  }

  data = await updateUser(data, {
    trees: data.trees + 1,
    credit: data.credit - 1,
  })

  return {
    trees: data.trees,
  }
})
