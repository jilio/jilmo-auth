import Joi from 'joi'
import schema from './schema'
import redis from '../redis'

async function isAuthorized(request) {
  const { error, value } = Joi.validate(request, schema)

  if (error) return false

  const providedPassword = value.password
  const correctPassword = await redis.getAsync(value.username)

  return providedPassword == correctPassword
}

export default { isAuthorized }
