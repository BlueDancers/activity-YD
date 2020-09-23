import { CacheService } from './cache.service';

import { Injectable } from '@nestjs/common';
import { Act_Data } from './activityData.entity';
import { actPro } from './act_pro.entity';
import { comData } from './comData.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { modJson } from './util';


@Injectable()
export class Act_proService {
  constructor(@InjectRepository(Act_Data)
  private readonly act_DataDao: Repository<Act_Data>,
    @InjectRepository(actPro)
    private readonly act_ProDao: Repository<actPro>,
    @InjectRepository(comData)
    private readonly com_DataDao: Repository<comData>,
    private readonly cacheService: CacheService,
  ) {
  }
  /**
  * 移动端获取数据 包括组件数据 以及页面高度
  * @param {string} name 项目路由名称
  */
  async getMobileData(name) {
    let redisResult = await this.cacheService.get("getMobileData" + name);
    if (!!redisResult) {
      return redisResult;
    }
    let proList = await this.act_ProDao.find({ where: { proType: "1", name: name }, relations: ['doms'] });
    proList = modJson(proList);
    if (proList.length > 0) {
      let result: any = proList[0];
      result.doms.map((temp) => {
        temp.css = JSON.parse(temp.css);
        temp.option = JSON.parse(temp.option);
        temp.animation = JSON.parse(temp.animation);
      });
      return Promise.resolve({
        objHeight: result.height,
        background: result.background,
        textName: result.textName,
        datas: result.doms,
        initSet: result.initSet
      });
    }
    proList = await this.act_ProDao.find({ where: { proType: "3", name: name }, relations: ['doms'] });
    proList = modJson(proList);
    if (proList.length > 0) {
      let result: any = proList[0];
      result.doms.map((temp) => {
        temp.css = JSON.parse(temp.css);
        temp.option = JSON.parse(temp.option);
        temp.animation = JSON.parse(temp.animation);
      });
      let redisResult = {
        objHeight: result.height,
        background: result.background,
        textName: result.textName,
        datas: result.doms,
        initSet: result.initSet
      };
      await this.cacheService.set("getMobileData" + name, redisResult);
      return Promise.resolve(redisResult);
    }
    return Promise.reject('无此项目，请检查项目名');
  }


  async allTemplate() {//所有模板
    let redisResult = await this.cacheService.get("allTemplate");
    if (!!redisResult) {
      return redisResult;
    }
    let proList = await this.act_ProDao.find({ where: { proType: "2" } });
    proList = modJson(proList);
    this.cacheService.set("allTemplate", proList)
    return Promise.resolve(proList);
  }
  async addTemplate(data) {
    const ActivityList = await this.act_ProDao.find({
      name: data.name,
      proType: "2",
    })

    if (ActivityList.length > 0) {
      return Promise.reject('当前模板已经存在')
    }
    let template = data.template, newData = [];
    let tmp: any = await this.act_ProDao.insert({
      ...data,
      proType: "2",
      time: new Date().getTime(),
    })
    tmp = await this.act_ProDao.find({ where: { proType: "2", name: data.name, } })
    await template.map(async (temp) => {
      temp.css = JSON.stringify(temp.css);
      temp.option = JSON.stringify(temp.option);
      temp.animation = JSON.stringify(temp.animation);
      temp.pro = tmp[0];
      newData.push({
        ...temp,
      })
      return true
    })
    // console.log(newData);
    // 更新项目组件数据
    tmp = modJson(tmp);
    tmp[0].doms = template;
    this.act_DataDao.save(newData);
    let redisResult = await this.cacheService.get("allTemplate");
    redisResult.push(tmp[0]);
    await this.cacheService.set("allTemplate", redisResult);
    console.log(tmp)
    return Promise.resolve('模板创建完成')
  }

  async AllPro() {//所有项目
    let redisResult = await this.cacheService.get("AllPro");
    if (!!redisResult) {
      return redisResult;
    }

    let proList = await this.act_ProDao.find({ where: { proType: "1" } });
    proList = modJson(proList);
    proList.map((res, index) => {
      if (res.password.trim() != "") {
        res.password = "1"
      } else {
        res.password = "0"
      }
    })
    this.cacheService.set("AllPro", proList)
    return proList
  }

  async addPro(data) {
    const ActivityList = await this.act_ProDao.find({
      name: data.name,
      proType: "1",
    })

    if (ActivityList.length > 0) {
      return Promise.reject('当前路由已经存在')
    }
    const ActivityList3 = await this.act_ProDao.find({
      name: data.name,
      proType: "3",
    })

    if (ActivityList3.length > 0) {
      return Promise.reject('当前路由已经存在')
    }
    let time = this.dateFormat();
    let tmp = await this.act_ProDao.insert({
      ...data,
      proType: "1",
      height: 667,
      background: 'rgba(255, 255, 255, 1)',
      time,
    })
    const ActivityList4 = await this.act_ProDao.find({
      name: data.name,
      proType: "1",
    })
    let redisResult = await this.cacheService.get("AllPro");
    redisResult.push(ActivityList4[0]);
    await this.cacheService.set("AllPro", redisResult)
    return tmp;
  }
  async addProPage(data) {
    const ActivityList = await this.act_ProDao.find({
      name: data.name,
      proType: "1",
    })

    if (ActivityList.length > 0) {
      return Promise.reject('当前项目已经存在')
    }
    const ActivityList3 = await this.act_ProDao.find({
      name: data.name,
      proType: "3",
    })

    if (ActivityList3.length > 0) {
      return Promise.reject('该路由已经存在')
    }
    const belongPro = await this.act_ProDao.find({
      _id: data.belongId,
      proType: "1",
    })
    let time = this.dateFormat();
    await this.act_ProDao.insert({
      ...data,
      proType: "3",
      height: 667,
      background: 'rgba(255, 255, 255, 1)',
      time,
      password: belongPro[0].password
    })
    return (await this.act_ProDao.find({
      where: {
        name: data.name,
        proType: "3",
      }, relations: ['doms']
    }))[0];
  }
  public dateFormat(date?: any, format?: string): string {
    //无参数
    if (date == undefined && format == undefined) {
      date = new Date();
      format = "yyyy-MM-dd HH:mm:ss";
    }
    //无日期
    else if (typeof (date) == "string") {
      format = date;
      date = new Date();
    }
    //无格式化参数
    else if (format === undefined) {
      format = "yyyy-MM-dd HH:mm:ss";
    }
    else { }
    //没有分隔符的特殊处理

    var map = {
      "y": date.getFullYear() + "",//年份
      "M": date.getMonth() + 1 + "", //月份 
      "d": date.getDate() + "", //日 
      "H": date.getHours(), //小时 24
      "m": date.getMinutes() + "", //分 
      "s": date.getSeconds() + "", //秒 
      "q": Math.floor((date.getMonth() + 3) / 3) + "", //季度 
      "f": date.getMilliseconds() + "" //毫秒 
    };
    //小时 12
    if (map["H"] > 12) { map["h"] = map["H"] - 12 + ""; }
    else { map["h"] = map["H"] + ""; }
    map["H"] += "";

    var reg = "yMdHhmsqf";
    var all = "", str = "";
    for (var i = 0, n = 0; i < reg.length; i++) {
      n = format.indexOf(reg[i]);
      if (n < 0) { continue; }
      all = "";
      for (; n < format.length; n++) {
        if (format[n] != reg[i]) {
          break;
        }
        all += reg[i];
      }
      if (all.length > 0) {
        if (all.length == map[reg[i]].length) {
          str = map[reg[i]];
        }
        else if (all.length > map[reg[i]].length) {
          if (reg[i] == "f") {
            str = map[reg[i]] + this.charString("0", all.length - map[reg[i]].length);
          }
          else {
            str = this.charString("0", all.length - map[reg[i]].length) + map[reg[i]];
          }
        }
        else {
          switch (reg[i]) {
            case "y": str = map[reg[i]].substr(map[reg[i]].length - all.length); break;
            case "f": str = map[reg[i]].substr(0, all.length); break;
            default: str = map[reg[i]]; break;
          }
        }
        format = format.replace(all, str);
      }
    }
    return format;
  }

  /**
      * 返回字符串 为n个char构成
      * @param char 重复的字符
      * @param count 次数
      * @return String
      * @author adswads@gmail.com
      */
  public charString(char: string, count: number): string {
    var str: string = "";
    while (count--) {
      str += char;
    }
    return str;
  }
  async delTemplate(data) {//删除模板
    let { id } = data;
    console.log(id)
    let objectData = await this.act_ProDao.findOne({ _id: id });
    let redisResult = await this.cacheService.get("allTemplate");
    console.log(redisResult)
    redisResult = redisResult.filter(e => e._id != id);
    await this.cacheService.set("allTemplate", redisResult);
    if (objectData != null) {
      let tmp = await this.act_ProDao.find({ where: { _id: id }, relations: ['doms'] });
      tmp = modJson(tmp);
      await this.act_DataDao.remove(tmp[0].doms);
      await this.act_ProDao.delete({ _id: id });
      return Promise.resolve("删除成功");
    } else {
      return Promise.reject('此模板也被删除')
    }
  }
  async delPro(data) {//删除项目
    console.log(data)
    let { id, password } = data;
    let objectData = await this.act_ProDao.findOne({ _id: id });
    if (objectData.password.trim() == '' || objectData.password == password) {
      let tmp = await this.act_ProDao.find({ where: { _id: id }, relations: ['doms'] });
      tmp = modJson(tmp);
      await this.act_DataDao.remove(tmp[0].doms);
      await this.act_ProDao.delete({ _id: id });
      let redisResult = await this.cacheService.get("AllPro");
      redisResult = redisResult.filter(e => e._id != id);
      await this.cacheService.set("AllPro", redisResult);
      return Promise.resolve("删除成功");
    } else {
      return Promise.reject('密码错误')
    }
  }
  /**
   * 项目效验
   * @param {String}} pass
   */
  async objectAuth(data) {
    let objectData = await this.act_ProDao.findOne({
      _id: data.id,
    })
    if (objectData.password == data.password) {
      return Promise.resolve(true);
    } else {
      return Promise.reject('密码错误');
    }
  }
  async getAct_Data() {
    let tmp = await this.act_DataDao.find();
    return tmp;
  }


  async findSById(proId) {//根据ID获取项目或模板
    let result = await this.act_ProDao.find({ where: { _id: proId }, relations: ['doms'] });
    let resultBelong = await this.act_ProDao.find({ where: { belongId: proId }, relations: ['doms'] });
    result = modJson(result);
    resultBelong = modJson(resultBelong);
    if (result.length < 0) {
      return Promise.reject('无此项目');
    }
    result[0].doms.map((temp) => {
      temp.css = JSON.parse(temp.css);
      temp.option = JSON.parse(temp.option);
      temp.animation = JSON.parse(temp.animation);
    });
    if (result[0].password.trim() != "") {
      result[0].password = "1"
    } else {
      result[0].password = "0"
    }
    let resultList = [result[0]];
    resultBelong.map((item) => {
      item.doms.map((temp) => {
        temp.css = JSON.parse(temp.css);
        temp.option = JSON.parse(temp.option);
        temp.animation = JSON.parse(temp.animation);
      });
      if (item.password.trim() != "") {
        item.password = "1"
      } else {
        item.password = "0"
      }
      resultList.push(item);
    })
    return Promise.resolve(resultList);
  }
  async setActivityData(data) {
    const {
      titlePage,
      password,
      parentId,
      parentName,
      parentRouterName,
      commHeight,
      template,
      background,
      parentDisp,
      initSet,
    } = data
    let objectData = await this.act_ProDao.findOne({
      _id: parentId,
    })
    // 效验密码
    if (objectData.password.trim() == '' || objectData.password == password) {
      let proList = await this.act_ProDao.find({ where: { proType: "1", name: parentRouterName }, relations: ['doms'] });
      proList = modJson(proList);
      if (proList.length > 1) {
        return Promise.reject('更改的项目路由已存在');
      }
      // 更新项目数据
      await this.act_ProDao.update(
        { _id: parentId },
        {
          height: commHeight,
          background,
          titlePage,
          textName: parentName,
          name: parentRouterName,
          disp: parentDisp,
          initSet,
        }
      )
      //遍历数据将对象转为文本
      const newData = []
      let tmp = await this.act_ProDao.find({ where: { _id: parentId }, relations: ['doms'] });
      tmp = modJson(tmp);
      await this.act_DataDao.remove(tmp[0].doms);
      await template.map(async (temp) => {
        temp.css = JSON.stringify(temp.css);
        temp.option = JSON.stringify(temp.option);
        temp.animation = JSON.stringify(temp.animation);
        temp.pro = tmp[0];
        newData.push({
          ...temp,
        })
        return true
      })
      // console.log(newData);
      // 更新项目组件数据
      this.act_DataDao.save(newData);
      let redisResult = await this.cacheService.get("AllPro");
      for (let i = 0, leng = redisResult.length; i < leng; i++) {
        if (redisResult[i]._id == tmp[0]._id) {
          redisResult[i] = tmp[0]
          break;
        }
      }
      await this.cacheService.set("AllPro", redisResult)
      return Promise.resolve(parentRouterName);
    } else {
      return Promise.reject('密码错误不允许修改')
    }
  }

  //保存所有页面
  async saveAllPage(data) {
    let { allPgae, password, titlePage } = data
    let objectData = await this.act_ProDao.findOne({
      _id: allPgae[0]._id,
    })
    // 效验密码
    if (objectData.password.trim() == '' || objectData.password == password) {
      allPgae.map(async (item) => {
        //遍历数据将对象转为文本
        const newData = []
        let tmp = await this.act_ProDao.find({ where: { _id: item._id }, relations: ['doms'] });
        tmp = modJson(tmp);
        await this.act_DataDao.remove(tmp[0].doms);
        await item.doms.map(async (temp) => {
          temp.css = JSON.stringify(temp.css);
          temp.option = JSON.stringify(temp.option);
          temp.animation = JSON.stringify(temp.animation);
          temp.pro = tmp[0];
          newData.push({
            ...temp,
          })
          return true
        })
        // console.log(newData);
        // 更新项目组件数据
        this.act_DataDao.save(newData);
        await this.act_ProDao.update({ _id: item._id },
          {
            height: item.height,
            background: item.background,
            titlePage,
            textName: item.textName,
            name: item.name,
            disp: item.disp,
            initSet: item.initSet,
          }
        );
        let redisResult = await this.cacheService.get("AllPro");
        for (let i = 0, leng = redisResult.length; i < leng; i++) {
          if (redisResult[i]._id == allPgae[0]._id) {
            redisResult[i] = {
              _id: allPgae[0]._id,
              height: item.height,
              background: item.background,
              titlePage,
              textName: item.textName,
              name: item.name,
              disp: item.disp,
              initSet: item.initSet,
            }
            break;
          }
        }
        await this.cacheService.set("AllPro", redisResult)
      });
    } else {
      return Promise.reject('密码错误不允许修改')
    }
  }
  async saveSingleComplate(data) {
    if (data.compName == '') {
      return Promise.reject('请填写组件保存名')
    }
    let isexist = await this.com_DataDao.find({
      compName: data.compName
    })
    if (isexist.length > 0) {
      return Promise.reject('该组件名已经存在')
    }
    data.css = JSON.stringify(data.css);
    data.option = JSON.stringify(data.option);
    data.animation = JSON.stringify(data.animation);
    await this.com_DataDao.save(data)
    return Promise.resolve('组件保存成功');
  }

  async getComplate() {
    let result: any = await this.com_DataDao.find();
    result = modJson(result);
    await result.map((temp) => {
      temp.css = JSON.parse(temp.css);
      temp.option = JSON.parse(temp.option);
      temp.animation = JSON.parse(temp.animation);
    })
    return Promise.resolve(result);
  }
  async updateSingComp({ id, compName }) {
    return await this.com_DataDao.update(
      { _id: id },
      { compName: compName }
    )
  }
  async deletesingComp({ id }) {
    return await this.com_DataDao.delete({
      _id: id
    })
  }

}
