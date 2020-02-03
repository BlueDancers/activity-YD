<template>
  <div class="main">
    <div class="item pointer" @click="createObject">
      <div class="base_img">
        <img src="../../assets/add.png" alt="" />
      </div>
      <div class="item_add">
        新建项目
      </div>
    </div>
    <div class="item" v-for="item in mainList" :key="item.id">
      <!--初始化项目 -->
      <div class="item_img">
        <img
          class="img"
          v-if="!item.titlePage"
          src="../../assets/logo.png"
          alt=""
        />
        <img class="img" v-if="item.titlePage" :src="item.titlePage" alt="" />
      </div>
      <div class="item_disp">
        <p class="name_con">
          项目名: <span class="name">{{ item.name }}</span>
        </p>
        <p class="disp_con">
          描述: <span class="disp">{{ item.disp }}</span>
        </p>
        <p class="time_con">
          时间: <span class="time">{{ item.time }}</span>
        </p>
      </div>
      <div class="active">
        <a-popover title="页面链接" trigger="click">
          <template slot="content">
            <qriously :value="onShowUrlCode" :size="140" />
          </template>
          <span @click="showObject(item.name)">查看项目</span>
        </a-popover>
        <span @click="gotoObject(item.name)">编辑项目</span>
        <a-popconfirm
          title="确定删除项目吗"
          @confirm="deleteObj(item.name)"
          okText="确定"
          cancelText="取消"
        >
          <span>删除项目</span>
        </a-popconfirm>
      </div>
    </div>
    <!-- 增加弹窗 -->
    <a-modal
      title="增加项目"
      :visible="Objectvisible"
      okText="确认"
      cancelText="取消"
      @ok="objSuccess"
      :confirmLoading="confirmLoading"
      @cancel="obFall"
    >
      <a-form :form="objform">
        <a-form-item
          label="网页名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input placeholder="请填写网页名" v-model="objform.textName" />
        </a-form-item>
        <a-form-item
          label="路由名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input placeholder="路由只能是数字与英文" v-model="objform.name" />
        </a-form-item>
        <a-form-item
          label="项目描述"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            placeholder="项目的一些描述信息"
            type="textarea"
            v-model="objform.disp"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getObject, setObject, deleteObj } from '../../api/index';
import { commHeight, mobileUrl } from '../../config/index';
import { parseTime } from '@/utils/index';
export default {
  mounted() {
    this.getObject()
  },
  data() {
    return {
      mainList: [],
      Objectvisible: false,
      confirmLoading: false,
      objform: {
        textName: '',  // 中文名称
        name: '', // 路由名称
        disp: ''
      },
      onShowUrlCode: ''
    }
  },
  methods: {
    getObject() {
      getObject().then(e => {
        console.log(e.data.data);
        e.data.data.map(e => {
          e.time = parseTime(e.time)
        })
        this.mainList = e.data.data
      })
        .catch(err => {
          console.log('错误', err);
        })
    },
    createObject() {
      this.Objectvisible = true
    },
    objSuccess() {
      // 创建项目基类
      let data = {
        ...this.objform,
        height: this.$store.state.core.commHeight, // 页面高度默认667
        background: 'white' // 页面背景色默认白色
      }
      setObject(data).then(res => {
        this.$router.push({ name: 'main', params: { objectName: res.data.data } })
      })
    },
    obFall() {
      this.Objectvisible = false
    },
    gotoObject(name) {
      this.$router.push({ name: 'main', params: { objectName: name } })
    },
    showObject(name) {
      this.onShowUrlCode = mobileUrl + name
    },
    deleteObj(name) {
      deleteObj(name).then((result) => {
        this.$message.success(result.data.data)
        this.getObject()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  .item {
    .base_item();
    .item_img {
      width: 100%;
      height: 200px;
      text-align: center;
      line-height: 200px;
      .img {
        height: 180px;
      }
    }
    .base_img {
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
      }
    }
    .item_disp {
      margin-left: 10px;
      border-top: 1px solid #e8e8ea;
      padding-top: 10px;
      .name_con {
        font-size: 16px;
        margin-bottom: 5px;
        .name {
          font-size: 16px;
          font-weight: bold;
        }
      }
      .disp_con {
        color: #8d8d8d;
        margin-bottom: 5px;
      }
      .time_con {
        color: #8d8d8d;
        margin-bottom: 5px;
      }
    }
    .item_add {
      border-top: 1px solid #e8e8ea;
      line-height: 40px;
      font-size: 15px;
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
      text-align: center;
      background-color: #fafafa;
    }
    .active {
      display: flex;
      cursor: pointer;
      justify-content: space-around;
      border-top: 1px solid #e8e8ea;
      line-height: 40px;
      font-size: 13px;
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
      text-align: center;
      background-color: #fafafa;
    }
  }
  .pointer {
    cursor: pointer;
  }
  .base_item {
    position: relative;
    border: 1px solid #e8e8ea;
    box-sizing: border-box;
    width: 18%;
    min-width: 300px;
    height: 350px;
    margin: 0 1%;
    margin-top: 20px;
    background-color: white;

    border-radius: 5px;
    transition: all 0.3s;
    &:hover {
      transition: all 0.3s;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      margin-top: 17px;
    }
  }
}
</style>