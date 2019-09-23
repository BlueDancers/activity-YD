<template>
  <div class="main">
    <div class="item" @click="createObject">
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
        <img src="../../assets/logo.png" alt="" />
      </div>
      <div class="item_disp">
        <span class="title">
          {{ item.title }}
        </span>
        <span class="disp"></span>
        <span class="timer"></span>
      </div>
      <div class="active"></div>
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
          label="项目名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input v-model="objform.name" />
        </a-form-item>
        <a-form-item
          label="项目描述"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input type="textarea" v-model="objform.disp" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getActivity, setObject } from '../../api/index';
export default {
  mounted() {
    getActivity().then(e => {
      console.log(e);
    })
      .catch(err => {
        console.log('错误', err);
      })
  },
  data() {
    return {
      mainList: [],
      Objectvisible: false,
      confirmLoading: false,
      objform: {
        name: '',
        disp: ''
      }
    }
  },
  methods: {
    createObject() {
      this.Objectvisible = true
      // this.$router.push({ name: 'main' })
    },
    objSuccess() {
      setObject(this.objform).then(res => {
        if (res.data.code == 200) {
          this.$router.push({ name: 'main', params: { objectName: res.data.data } })
        } else {
          this.$message.error(res.data.data)
        }
      })
    },
    obFall() {
      this.Objectvisible = false
    },
    objSubmit() {
      console.log('提交表单');
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
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s;
    &:hover {
      transition: all 0.3s;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      margin-top: 10px;
    }
    .item_default {
    }
  }
}
</style>