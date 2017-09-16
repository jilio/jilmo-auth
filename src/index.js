import Koa from 'koa'
import logger from 'koa-morgan'
import env from 'dotenv'
import router from './router'

env.config()

const port = process.env.PORT
const server = new Koa()

server
  .use(logger('tiny'))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log('Jilmo Auth')
  })
