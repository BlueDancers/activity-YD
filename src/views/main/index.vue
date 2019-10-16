<template>
  <div class="index">
    <div class="index_left">
      <!-- <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="组件列表" key="1">
          
        </a-tab-pane>
        <a-tab-pane tab="页面管理" key="2">
          
        </a-tab-pane>
        <a-tab-pane tab="使用模板" key="3">
          使用模板-暂时未在开发计划内
        </a-tab-pane>
      </a-tabs> -->
      <div class="left_menu_active">
        <div
          class="left_menu_item"
          :class="{ item_active: item.key == activeLeftMenu }"
          v-for="item in leftMenu"
          :key="item.title"
          @click="toggleLeftMenu(item.key)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="left_menu_board">
        <component-page v-show="activeLeftMenu == 1"></component-page>
        <page v-show="activeLeftMenu == 2"></page>
      </div>
    </div>
    <div class="index_center">
      <core></core>
    </div>
    <div class="index_right">
      <div class="right_setting">
        <div class="setting_item" v-for="item in setting" :key="item.text">
          {{ item.text }}
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xxx"></use>
          </svg>
        </div>
      </div>
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="属性" key="1">
          <attributesPage></attributesPage>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import componentPage from './components/component';
import attributesPage from './components/attributes';
import page from './components/page';
import templatePage from './components/template';
import core from './components/core';
export default {
  components: {
    componentPage,
    attributesPage,
    page,
    templatePage,
    core
  },
  mounted() {
    let objName = this.$route.params.objectName
    this.$store.commit('core/set_objectName', objName)
    this.$store.dispatch('core/getActivity', { name: objName }).then((result) => {
      // this.$message.success(result)
    }).catch((err) => {
      this.$message.error(err)
    });
  },
  data() {
    return {
      leftMenu: [
        {
          title: '组件列表',
          key: 1
        },
        {
          title: '页面设置',
          key: 2
        },
      ],
      setting: [
        {
          icon: '',
          text: '放大'
        },
        {
          icon: '',
          text: '缩小'
        },
        {
          icon: '',
          text: '撤销'
        },
      ],
      activeLeftMenu: 1
    }
  },
  methods: {
    callback() { },
    toggleLeftMenu(index) {
      this.activeLeftMenu = index
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  height: 94%;
  display: flex;
  justify-content: space-between;
  .index_left {
    position: relative;
    background-color: #ffffff;
    width: 420px;
    height: 100%;
    display: flex;
    .left_menu_active {
      width: 100px;
      border-right: 1px solid rgb(216, 216, 216);
      .left_menu_item {
        cursor: pointer;
        height: 50px;
        line-height: 50px;
        text-align: center;
        transition: all 0.2s;
        &:hover {
          background: #1890ff;
          color: white;
        }
      }
      .item_active {
        background: #1890ff;
        color: white;
      }
    }
    .left_menu_board {
      width: 320px;
    }
  }
  .index_center {
    padding: 20px 0;
    position: relative;
    display: flex;
    justify-content: center;
    flex: 1;
    overflow-x: hidden;
  }
  .index_right {
    position: relative;
    background-color: white;
    width: 440px;
    height: 100%;
    display: flex;
    .right_setting {
      width: 40px;
      border-right: 1px solid #f6f6f6;
      .setting_item {
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        text-align: center;
        &:hover {
          background: #1890ff;
          color: white;
        }
      }
    }
  }
}
</style>