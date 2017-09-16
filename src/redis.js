import Redis from 'redis'
import bluebird from 'bluebird'
import env from 'dotenv'

env.config()

bluebird.promisifyAll(Redis.RedisClient.prototype)
bluebird.promisifyAll(Redis.Multi.prototype)

const redis = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
})

export default redis
