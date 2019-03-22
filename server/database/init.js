const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
// const { connect, init } = 
const db = 'mongodb://localhost/douban-trailer'

mongoose.Promise = global.Promise

exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.connect = () => {
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db)
    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了')
      }
    })
    mongoose.connection.on('error', err => {
      maxConnectTimes++
      console.log(err)
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了')
      }
    })
    mongoose.connection.once('open', () => {
      // const Dog = mongoose.model('Dog', { name: String})
      // const dogge = new Dog({name: '狗头'})
      // dogge.save().then(() => {
      //   console.log('wang')
      // })
      resolve()
      console.log('MongoDB is connected')
    })
  })
}
