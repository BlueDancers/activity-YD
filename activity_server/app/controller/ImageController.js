'use strict'
const path = require('path')
const fs = require('fs')
const sendToWormhole = require('stream-wormhole')
const Controller = require('egg').Controller

class ImageController extends Controller {
  async upload() {
    const { ctx } = this
    const stream = await ctx.getFileStream()
    const fileName = stream.filename.split('.')[0] // 用户名
    const fileType = stream.filename.split('.')[1] // 用户名
    const photoName = `${fileName + new Date().getTime() + '.' + fileType}`
    const target = path.join(
      this.config.baseDir,
      `app/static/upload/${photoName}`
    )
    const result = await new Promise((resolve, reject) => {
      // 创建可写流
      const remoteFileStream = fs.createWriteStream(target)
      // 写入流
      stream.pipe(remoteFileStream)
      let errFlag
      // 监听失败
      remoteFileStream.on('error', err => {
        errFlag = true
        sendToWormhole(stream)
        remoteFileStream.destroy()
        reject(err)
      })
      // 监听完成
      remoteFileStream.on('finish', async () => {
        if (errFlag) return
        resolve({
          data: `http://${ctx.header.host}/static/upload/${photoName}`
        })
      })
    })
    ctx.body = {
      data: result,
      code: 200
    }
  }
  async uptitleimage() {
    const { ctx } = this
    const stream = await ctx.getFileStream()
    const fileName = stream.filename.split('.')[0] // 用户名
    const fileType = stream.filename.split('.')[1] // 用户名
    const photoName = `${fileName + new Date().getTime() + '.' + fileType}`
    const target = path.join(
      this.config.baseDir,
      `app/static/title/${photoName}`
    )
    const result = await new Promise((resolve, reject) => {
      // 创建可写流
      const remoteFileStream = fs.createWriteStream(target)
      // 写入流
      stream.pipe(remoteFileStream)
      let errFlag
      // 监听失败
      remoteFileStream.on('error', err => {
        errFlag = true
        sendToWormhole(stream)
        remoteFileStream.destroy()
        reject(err)
      })
      // 监听完成
      remoteFileStream.on('finish', async () => {
        if (errFlag) return
        resolve({
          data: `http://${ctx.header.host}/static/title/${photoName}`
        })
      })
    })
    ctx.body = {
      data: result,
      code: 200
    }
  }
  async getImage() {
    const { ctx } = this
    let data = await new Promise((resolve, reject) => {
      var filePath = path.join(this.config.baseDir, `app/static/upload/`)
      fs.readdir(filePath, function(err, path) {
        let paths = []
        if (!err) {
          path.map((e, i) => {
            if (e != '.DS_Store') {
              paths.push(`http://${ctx.header.host}/static/upload/${e}`)
            }
          })
          resolve(paths)
        } else {
          reject(err)
        }
      })
    })
    ctx.body = {
      data,
      code: 200
    }
  }
  async getDefaultImg() {
    const { ctx } = this
    let data = await new Promise((resolve, reject) => {
      var filePath = path.join(this.config.baseDir, `app/static/default/`)
      fs.readdir(filePath, function(err, path) {
        let paths = []
        if (!err) {
          path.map((e, i) => {
            if (e != '.DS_Store') {
              paths.push(`http://${ctx.header.host}/static/default/${e}`)
            }
          })
          resolve(paths)
        } else {
          reject(err)
        }
      })
    })
    ctx.body = {
      data,
      code: 200
    }
  }
}

module.exports = ImageController
