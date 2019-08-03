import Joi from '@hapi/joi'

const schema = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(24)
    .alphanum()
    .required(),

  password: Joi.string()
    .min(8)
    .max(64)
    .required(),
})

export default schema
