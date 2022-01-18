import { Act_proService } from './act_pro.service';
import { Controller, Post, Get, Body } from '@nestjs/common';

@Controller()
export class Act_proController {
  constructor(private readonly actProSer: Act_proService) {

  }
  @Post('try1')
  try1(@Body() body) {
    console.log(body);
  }
  @Post('getMobileTemp')
  async getMobileData(@Body() body) {
    let result = {};
    await this.actProSer.getMobileData(body.name).then(
      e => {
        result = {
          data: e,
          code: 200
        }
      }
    ).catch(err => {
      result = {
        data: err,
        code: 500
      }
    });
    return result;
  }

  @Post('addPage')
  async addPage(@Body() body) {
    let result = {};
    await this.actProSer.addProPage(body).then((e) => {
      result = {
        data: e,
        code: 200
      };
    }
    ).catch((err) => {
      result = result = {
        data: err,
        code: 500
      };
    });
    return result;
  }
  @Post('setObject')//新建项目
  async addActObject(@Body() body) {
    let result = {};
    await this.actProSer.addPro(body).then((e) => {
      result = {
        data: e.identifiers[0]['_id'],
        code: 200
      };
    }
    ).catch((err) => {
      result = result = {
        data: err,
        code: 500
      };
    });
    return result;
  }
  @Get('getObject')//所有项目
  async allObject() {
    let result = {}
    await this.actProSer.AllPro().then(e => {
      result = {
        data: e,
        code: 200
      }
    }
    ).catch(err => {
      result = {
        data: err,
        code: 500
      }
    })
    return result;
  }
  @Post('saveAllPage')
  async saveAllPage(@Body() data) {
    let result = {}
    await this.actProSer.saveAllPage(data).then(e => {
      result = {
        data: e,
        code: 200
      }
    }).catch(err => {
      result = {
        data: err,
        code: 500
      }
    });
    return result
  }
  @Post('deleteObj')//删除项目
  async deleteObj(@Body() data) {
    let result = {}
    await this.actProSer.delPro(data).then(e => {
      result = {
        data: e,
        code: 200
      }
    }).catch(err => {
      result = {
        data: err,
        code: 500
      }
    });
    return result
  }
  @Post('objectAuth')//密码验证
  async objectAuth(@Body() data) {
    let result = {}
    await this.actProSer.objectAuth(data).then(e => {
      result = {
        data: e,
        code: 200
      }
    }).catch(err => {
      result = {
        data: err,
        code: 500
      }
    });
    return result;
  }
  @Post('getActivity')
  async getActivity(@Body() body) {
    let result = {}
    await this.actProSer.findSById(body.id).then(e => {
      result = {
        data: e,
        code: 200
      }
    }).catch(err => {
      result = {
        data: String(err),
        code: 500
      }
    }
    );
    return result;
  }

  @Post('saveActivity')
  async saveActivity(@Body() body) {
    let result = {}
    await this.actProSer.setActivityData(body).then(e => {
      result = {
        data: e,
        code: 200
      }
    }).catch(err => {
      result = {
        data: String(err),
        code: 500
      }
    }
    );
    return result;
  }
  @Post('saveSingleComplate')
  async saveSingleComplate(@Body() body) {
    let result = {}
    await this.actProSer.saveSingleComplate(body.complate).then(e => {
      result = {
        data: '保存成功',
        code: 200
      }
    }).catch(err => {
      result = {
        data: err,
        code: 500
      }
    });
    return result;
  }
  @Get('getSingleComplate')
  async getSingleComplate() {
    let result = {}
    await this.actProSer.getComplate().then(e => {
      result = {
        data: e,
        code: 200
      }
    }).catch(err => {
      result = {
        data: err,
        code: 500
      }
    });
    return result;
  }
  @Post('updateSingComp')
  async updateSingComp(@Body() body) {
    let result = {}
    await this.actProSer.updateSingComp(body).then(e => {
      result = {
        data: '修改成功',
        code: 200
      }
    }).catch(err => {
      result = {
        data: err,
        code: 500
      }
    });
    return result;
  }
  @Post('deleteSingComp')
  async deleteSingComp(@Body() body) {
    let result = {}
    await this.actProSer.deletesingComp(body).then(e => {
      result = {
        data: '修改成功',
        code: 200
      }
    }).catch(err => {
      result = {
        data: err,
        code: 500
      }
    });
    return result;
  }
  @Get('getTemplate')
  async getTemplate() {
    let result = {};
    await this.actProSer.allTemplate().then(e => {
      result = {
        data: e,
        code: 200
      }
    });
    return result;
  }
  @Post('setTemplate')
  async setTemplate(@Body() body) {
    let result = {}
    await this.actProSer.addTemplate(body).then(e => {
      result = {
        data: e,
        code: 200
      }
    }).catch(err => {
      result = {
        data: err,
        code: 500
      }
    })
    return result;
  }
  @Post('deleteTemplate')
  async deleteTemplate(@Body() body) {
    let result = {}
    await this.actProSer.delTemplate(body).then(e => {
      result = {
        data: e,
        code: 200
      }
    }).catch(err => {
      result = {
        data: err,
        code: 500
      }
    })
    return result;
  }
  @Post('getTemplateDataById')
  async getTemplateDataById(@Body() body) {
    let result = {}
    await this.actProSer.findSById(body.id).then(e => {
      result = {
        data: e,
        code: 200
      }
    }).catch(err => {
      result = {
        data: err,
        code: 500
      }
    })
    return result;
  }
}
