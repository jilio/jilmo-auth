import Joi from '@hapi/joi'
import schema from './schema'
import redis from '../redis'
import Token from '../token'

async function isAuthorized(request) {
  const { error, value } = Joi.validate(request, schema)

  if (error) return false

  const providedPassword = value.password
  const correctPassword = await redis.getAsync(value.username)

  return providedPassword == correctPassword
}

async function hasValidRefreshToken(token) {
  const { username } = await Token.getPayload(token)
  const correctRefreshToken = await redis.getAsync(`${username}_refresh_token`)

  return correctRefreshToken == token
}

export default { isAuthorized, hasValidRefreshToken }
