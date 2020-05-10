<template>
  <div class="main">
    <div class="main_header">
      <div class="header_left">
        <img class="left_logo" src="@/assets/logo.png" alt />
        <span class="item_text">易动</span>
      </div>
      <div class="header_right">
        <div class="right_item">
          <a-popover placement="bottom">
            <template slot="title">
              <span>更新公告</span>
            </template>
            <template slot="content">
              <p>v 0.5.3 增加点击标题组件快速修改文字,增加图片快捷更换操作</p>
              <p>v 0.5.2 增加组件拖拽到页面位置</p>
              <p>v 0.5.3 增加属性颜色自定义支持,现可支持渐变色</p>
            </template>
            <span class="item_text">更新日志</span>
          </a-popover>
        </div>
        <div class="right_item" @click="gotoUrl('user')">
          <a-icon type="cloud" />
          <span class="item_text">作者主页</span>
        </div>
        <div class="right_item" @click="gotoUrl">
          <a-icon type="github" />
          <span class="item_text">github</span>
        </div>
      </div>
    </div>
    <div class="main_list">
      <div class="item pointer" @click="createObject">
        <div class="base_img">
          <div class="base_img add"></div>
        </div>
        <div class="item_add">新建项目</div>
      </div>
      <div class="item" v-for="item in mainList" :key="item.id">
        <!--初始化项目 -->
        <div class="item_img">
          <img class="img" v-if="!item.titlePage" src="@/assets/logo.png" alt />
          <img class="img" v-if="item.titlePage" :src="item.titlePage" alt />
        </div>
        <div class="item_disp">
          <p class="name_con">
            项目名：
            <span class="name">{{ item.name }}</span>
          </p>
          <p class="disp_con">
            描述&nbsp;&nbsp; ：
            <span class="disp">{{ item.disp }}</span>
          </p>
          <p class="time_con">
            时间&nbsp;&nbsp; ：
            <span class="time">{{ item.time }}</span>
          </p>
        </div>
        <div class="active">
          <a-popover title="页面链接" trigger="click">
            <template slot="content">
              <qriously :value="onShowUrlCode" :size="140" />
            </template>
            <span @click="showObject(item.name)">查看项目</span>
          </a-popover>
          <span @click="gotoObject(item._id)">编辑项目</span>
          <a-popconfirm title="确定删除项目吗" @confirm="deleteObj(item)" okText="确定" cancelText="取消">
            <span>删除项目</span>
          </a-popconfirm>
        </div>
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
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
          :validate-status="textNameStatus ? '' : 'error'"
          help="必填 浏览器头部显示的名字"
        >
          <a-input placeholder="请填写网页名称" v-model="objform.textName" />
        </a-form-item>
        <a-form-item
          label="路由名称"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
          :validate-status="nameStatus ? '' : 'error'"
          help="路由为数字和字母组成"
        >
          <a-input placeholder="请填写路由" v-model="objform.name" />
        </a-form-item>
        <a-form-item
          label="项目描述"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
          help="非必填"
        >
          <a-input placeholder="项目的一些描述信息" type="textarea" v-model="objform.disp" />
        </a-form-item>
        <a-form-item
          label="编辑密码"
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
          help="非必填 填写密码则需要密码才可编辑"
        >
          <a-input placeholder="请输入密码" v-model="objform.password" />
        </a-form-item>
      </a-form>
    </a-modal>
    <auth-modal ref="authModal" @authSuccess="authSuccess"></auth-modal>
  </div>
</template>

<script lang="ts">
import { getObject, setObject, deleteObj } from "@/api/index";
import { commHeight, mobileUrl } from "@/config/index";
import { parseTime } from "@/utils/index";
import authModal from "@/components/authModal/index.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    authModal
  },
  mounted() {
    this.getObject();
  },
  data() {
    return {
      formTailLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 12 }
      },
      textNameStatus: true,
      nameStatus: true,
      mainList: [],
      Objectvisible: false,
      confirmLoading: false,
      objform: {
        textName: "", // 中文名称
        name: "", // 路由名称
        disp: "", // 描述
        password: "" // 密码
      },
      onShowUrlCode: ""
    };
  },
  methods: {
    gotoUrl(type) {
      if (type == "user") {
        window.open("https://github.com/vkcyan", "_blank");
      } else if (type == "generate") {
        window.open("https://github.com/vkcyan/activity_generate", "_blank");
      }
    },
    getObject() {
      getObject()
        .then(e => {
          e.data.data.map((e: any) => {
            e.time = parseTime(e.time);
          });
          this.mainList = e.data.data;
        })
        .catch(err => {
          console.log("错误", err);
        });
    },
    createObject() {
      this.Objectvisible = true;
    },
    objSuccess() {
      // 创建项目基类
      let { textName, name } = this.objform;
      if (textName == "") {
        this.textNameStatus = false;
      } else {
        this.textNameStatus = true;
      }
      if (!/^[A-Za-z0-9]+$/.test(name)) {
        this.nameStatus = false;
      } else {
        this.nameStatus = true;
      }
      if (this.textNameStatus && this.nameStatus) {
        let data = {
          ...this.objform,
          height: this.$store.state.core.commHeight, // 页面高度默认667
          background: "rgba(255, 255, 255, 1)", // 页面背景色默认白色
          defaultLeft: `created(){
    // 页面开始生命周期
}
mounted(){
    // 页面挂载生命周期
}
destroyed(){
    // 页面卸载生命周期
}` // 注入生命周期
        };
        setObject(data).then(res => {
          this.$router.push({
            name: "main",
            params: { objectId: res.data.data }
          });
        });
      }
    },
    obFall() {
      this.Objectvisible = false;
      this.textNameStatus = true;
      this.nameStatus = true;
    },
    gotoObject(id) {
      this.$router.push({ name: "main", params: { objectId: id } });
    },
    showObject(name) {
      this.onShowUrlCode = mobileUrl + name;
    },
    deleteObj(data) {
      if (data.isAuth) {
        (this.$refs.authModal as any).open(data);
      } else {
        deleteObj(data._id, "").then(result => {
          this.$message.success(result.data.data);
          this.getObject();
        });
      }
    },
    authSuccess(data) {
      deleteObj(data._id, data.password).then(result => {
        this.$message.success(result.data.data);
        this.getObject();
      });
    }
  }
});
</script>

<style lang="less" scoped>
.main {
  .main_header {
    z-index: 2;
    box-sizing: border-box;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #001529;
    color: white;
    padding: 0 20px;
    .header_left {
      display: flex;
      align-items: center;
      .left_logo {
        width: 30px;
      }
    }
    .header_right {
      display: flex;
      .right_item {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-left: 20px;
        .item_text {
          margin-left: 5px;
          white-space: pre;
        }
      }
    }
  }
  .main_list {
    display: flex;
    flex-wrap: wrap;
    margin: 0px 4%;
    margin-top: 8px;
    margin-bottom: 230px;
    .item {
      overflow: hidden;
      .base_item();
      .item_img {
        width: 100%;
        text-align: center;
        // height: 200px;

        // line-height: 200px;
        // .img {
        //   height: 180px;
        // }
      }
      .base_img {
        // height: 300px;
        height: 100%;
        margin-top: -10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .item_disp {
        padding-left: 22px;
        padding-right: 1em;
        // padding-right: 28px;
        border-top: 1px solid #e8e8ea;
        // padding-top: 10px;
        color: black;
        white-space: pre-wrap;
        vertical-align: middle;
        .name_con {
          font-size: 16px;
          margin-bottom: 5px;
          .name {
            font-size: 17px;
            font-weight: bold;
          }
        }
        .disp_con {
          // color: #8d8d8d;
          display: -webkit-box;
          word-break: break-all;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-height: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 5px;
        }
        .time_con {
          // color: #8d8d8d;
          // margin-bottom: 5px;
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
  }
  .add {
    color: currentColor;
    // margin-top: -10px;
    position: relative;
    writing-mode: vertical-lr;
    margin: auto;
    &::after {
      content: "";
      position: absolute;
      border-radius: 10px;
      left: 50%;
      top: 50%;
      height: 80px;
      margin-left: -5px;
      margin-top: -40px;
      border-left: 10px solid;
    }
    &::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 80px;
      margin-left: -40px;
      margin-top: -5px;
      border-radius: 10px;
      border-top: 10px solid;
    }
  }
  .pointer {
    cursor: pointer;
  }
  .base_item {
    position: relative;
    border: 1px solid #e8e8ea;
    box-sizing: border-box;
    margin: 0 1%;
    margin-top: 20px;

    background-color: white;

    border-radius: 5px;
    transition: all 0.3s;
    &:hover {
      transition: all 0.3s;
      box-shadow: 2px 3px 8px rgb(219, 219, 219);
      transform: scale(1.05, 1.08);
    }
  }
  @media screen and (min-width: 1680px) {
    .item {
      width: 18%;
      min-width: 250px;
      height: 350px;
      .item_disp {
        padding-top: 10px;
        .name_con {
          font-size: 16px;
        }
        .disp_con {
        }
        .time_con {
        }
      }
    }
    .item_img {
      width: 100%;
      height: 200px;
      text-align: center;
      line-height: 200px;
      .img {
        height: 180px;
      }
    }
  }
  @media screen and (min-width: 1280px) and (max-width: 1680px) {
    .item {
      width: 18%;
      min-width: 200px;
      height: 322px;
      .item_disp {
        padding-top: 10px;
        .name_con {
          font-size: 16px;
        }
        .disp_con {
        }
        .time_con {
        }
      }
    }
    .item_img {
      height: 180px;
      line-height: 180px;
      overflow: hidden;
      .img {
        height: 165px;
      }
    }
  }
  @media screen and (min-width: 600px) and( max-width: 1280px) {
    .item {
      width: 31%;
      min-width: 160px;
      height: 350px;
      .item_disp {
        padding-top: 10px;
        .name_con {
          font-size: 16px;
          margin-bottom: 5px;
        }
        .disp_con {
          margin-bottom: 5px;
        }
        .time_con {
          margin-bottom: 5px;
        }
      }
    }
    .item_img {
      height: 200px;
      line-height: 200px;
      .img {
        height: 180px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .item {
      width: 95%;
      // min-width: 400px;
      height: 350px;
      .item_disp {
        padding-top: 0px;
        line-height: 2em;
        .name_con {
          font-size: 16px;
        }
        .disp_con {
        }
        .time_con {
        }
      }
    }
    .item_img {
      height: 180px;
      line-height: 180px;
      overflow: hidden;
      .img {
        height: 165px;
      }
    }
  }
}
</style>
<style>
.ant-form-item-label {
  margin-left: 3em;
}
</style>
