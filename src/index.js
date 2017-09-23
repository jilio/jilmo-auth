import Koa from 'koa'
import logger from 'koa-morgan'
import helmet from 'koa-helmet'
import env from 'dotenv'
import router from './router'

env.config()

const port = process.env.PORT
const server = new Koa()

server
  .use(helmet())
  .use(logger('tiny'))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log('Jilmo Auth')
  })
