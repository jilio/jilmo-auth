import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import User from './user'
import generateTokens from './token'

const router = new Router()

router.post('/', bodyParser(), async ctx => {
  const isAuthorized = await User.isAuthorized(ctx.request.body)

  if (isAuthorized) {
    const tokens = await generateTokens()

    ctx.status = 200
    ctx.body = tokens
  } else {
    ctx.status = 401
  }
})

export default router
