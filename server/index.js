const Koa = require('koa')
const views = require('koa-views')
const mongoose = require('mongoose')
const { resolve } = require('path')
const { connect, initSchema } = require('./database/init')
const router = require('./routes/movie')
;(async () => {
  await connect()
  initSchema()
  // require('./tasks/movie')
  // require('./tasks/api')
})()

const app = new Koa()

app.use(router.routes()).use(router.allowedMethods())
app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
})) 
// const { normal } = require('./tpl')
app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'Luke',
    me: 'SomerQ'
  })
})
app.listen(3000)