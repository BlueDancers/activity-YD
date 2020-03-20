'use strict';

const Controller = require('egg').Controller;

class testController extends Controller {
  async test() {
    const { ctx } = this;
    const { cardNo } = ctx.request.body;
    ctx.body = {
      data: cardNo,
      code: 200,
    };
  }
}

module.exports = testController;
