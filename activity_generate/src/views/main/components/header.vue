<!--
 * @Author: your name
 * @Date: 2020-02-22 12:51:09
 * @LastEditTime: 2020-05-03 09:46:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/components/header/index.vue
 -->
<template>
  <div class="header_con">
    <div class="header_back"></div>
    <div class="header">
      <div @click="gotoHome"
           class="left_header">
        <img class="left_logo"
             src="@/assets/logo.png"
             alt />
        <span>易动</span>
      </div>
      <div class="right_setting">
        <div class="setting_item"
             v-for="(item, index) in coreInfo"
             :key="index"
             @click="userSetting(index)">
          <div v-if="item.text != '背景线'"
               :class="item.click ? 'item' : 'test item'">
            <img class="settion_item_icon"
                 :src="item.icon"
                 alt />
            <span class="settion_item_text">{{ item.text }}</span>
          </div>

          <div v-if="item.text == '背景线'"
               :class="item.click ? 'item' : 'test item'">
            <img v-if="backgroundLine"
                 class="settion_item_icon"
                 :src="item.openIcon"
                 alt />
            <img v-if="!backgroundLine"
                 class="settion_item_icon"
                 :src="item.icon"
                 alt />
            <span class="settion_item_text">{{ item.text }}</span>
          </div>
        </div>
        <p class="scale">{{ coreScale }}</p>
      </div>

      <!-- 左侧为操作栏 -->
      <div class="right_header">
        <a-select default-value="dev"
                  style="width: 120px"
                  @change="coreModeChange"
                  class="right_header_item">
          <a-select-option value="dev">
            开发模式
          </a-select-option>
          <a-select-option value="prod">
            预览模式
          </a-select-option>
        </a-select>
        <a-button @click="saveObject(3)"
                  type="primary"
                  icon="book"
                  class="right_header_item">保存为模板</a-button>
        <!-- <a-button @click="saveObject(2)" type="primary" icon="cloud" class="right_header_item">发布</a-button> -->
        <a-button @click="saveObject(1)"
                  type="primary"
                  icon="qrcode"
                  class="right_header_item">保存并预览</a-button>
      </div>
    </div>
    <!-- 发布预览框 -->
    <upload-modal ref="uploadModal"
                  :objUrl="objUrl" />
    <!-- 发布模板 -->
    <set-template ref="setTemplate"></set-template>
    <!-- 权限校验 -->
    <auth-modal ref="authModal"
                @authSuccess="authSuccess"></auth-modal>
  </div>
</template>

<script>
// 主页面头部组件
import uploadModal from "./uploadModal";
import setTemplate from "./setTemplate";
import authModal from "@/components/authModal/index";
import { mobileUrl } from "@/config/index";
import html2canvas from "html2canvas";
import { base64ToBlob, BlobToImgFile } from "@/utils/index";
import { upTitleImg } from "@/api/index";
import { cloneDeep } from "lodash";
import { baseComplate } from "@/utils/baseReact";

export default {
  components: {
    uploadModal,
    setTemplate,
    authModal
  },
  data () {
    return {
      objUrl: "" // 当前项目的url: value
    };
  },
  computed: {
    objectAuth () {
      return this.$store.state.core.objectAuth;
    },
    parentId () {
      return this.$store.state.core.parentId;
    },
    coreScale () {
      return Number((this.$store.state.setting.scale * 100).toFixed(1)) + "%";
    },
    backgroundLine () {
      return this.$store.state.setting.backgroundLine;
    },
    coreInfo () {
      return this.$store.state.setting.coreinfo;
    },
    activeTemplate () {
      return this.$store.state.core.activeTemplate;
    },
    template () {
      return this.$store.state.core.template;
    },
    copyTemplate () {
      return this.$store.state.setting.copyTemplate;
    },

  },
  watch: {
    activeTemplate () {
      if (this.activeTemplate.length > 0) {
        this.$store.commit("setting/set_coreinfoItem", {
          index: 2,
          status: true
        });
        this.$store.commit("setting/set_coreinfoItem", {
          index: 4,
          status: true
        });
      } else {
        this.$store.commit("setting/set_coreinfoItem", {
          index: 2,
          status: false
        });
        this.$store.commit("setting/set_coreinfoItem", {
          index: 4,
          status: false
        });
      }
    },
    copyTemplate () {
      if (this.copyTemplate.length) {
        this.$store.commit("setting/set_coreinfoItem", {
          index: 3,
          status: true
        });
      }
    }
  },
  methods: {
    gotoHome () {
      this.$router.push({ name: "home" });
    },
    coreModeChange (value) {
      this.$store.commit("setting/changeCoreMode", value);
    },
    userSetting (index) {
      if (index == 0) {
        // 撤销
        this.$emit("coreSetting", "cancel");
      } else if (index == 1) {
        let copyList = [];
        this.activeTemplate.map(activityId => {
          copyList.push(
            cloneDeep(this.template.filter(e => e.activityId == activityId))[0]
          );
        });
        this.$store.commit("setting/set_copy", copyList);
        this.$message.success("已复制到粘贴板");
      } else if (index == 2) {
        this.copyTemplate.map(data => {
          this.$store.commit(
            "core/addMaxZindex");
          this.$store.commit(
            "core/set_tempLate",
            cloneDeep(baseComplate(this.$store.state.core, data))
          );
        });
      } else if (index == 3) {
        this.$store.commit("core/deleteActiveComplate");
      } else if (index == 4) {
        this.$store.commit("setting/toggle_backgroundLine");
      } else if (index == 5) {
        this.$store.commit("setting/set_scale", 0.1);
      } else if (index == 6) {
        this.$store.commit("setting/set_scale", -0.1);
      }
    },
    // 获取缩略图
    getThumbnail () {
      this.$showLoading();
      // 保存之前取消选中 取消背景线的显示
      this.$store.commit("setting/toggle_backgroundLine");
      this.$store.commit("core/clear_template");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let core = document.querySelector(".core");
          html2canvas(core, {
            async: true,
            useCORS: true,
            scale: 1,
            wdith: core.clientWidth,
            height: core.clientWidth,
          })
            .then(canvas => {
              let dataURL = canvas.toDataURL("image/jpeg");
              const data = new FormData();
              data.append(
                "image",
                BlobToImgFile(base64ToBlob(dataURL), "image/jpeg")
              );
              resolve(upTitleImg(data));
            })
            .catch(err => {
              reject(err);
            })
            .finally(() => {
              this.$hideLoading();
              this.$store.commit("setting/toggle_backgroundLine");
            });
        }, 1);
      });
    },
    // 通过效验
    authSuccess (data) {
      this.uploadObject(data.type, data.password);
    },
    // 保存项目
    saveObject (type) {
      if (type == 3) {
        // 保存模板
        this.getThumbnail().then(res => {
          this.$refs.setTemplate.openModal(res.data.data);
        });
      } else {
        this.$store.commit('core/saveNowPage');
        if (this.objectAuth) {
          this.$refs.authModal.open({
            _id: this.parentId,
            type
          });
          return false;
        } else {
          this.uploadObject(type);
        }
      }
    },
    uploadObject (type, pass = "") {
      this.getThumbnail().then(res => {
        // 保存当前页面的配置
        return this.$store
          .dispatch("core/saveObject", {
            titlePage: res.data.data,
            pass
          })
          .then(data => {
            console.log(data);
            this.$hideLoading();
            if (data.data.code == 200) {
              if (type == 1) {
                this.objUrl = mobileUrl + this.$store.state.core.nowPageName;
                this.$refs["uploadModal"].openModal();
              } else {
                this.$message.success("保存成功");
              }
            } else {
              this.$message.error(data.data.data);
            }
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.header_con {
  z-index: 2;
  min-height: 50px;
  height: 6%;
  background-color: #fafafa;
  .header_back {
    height: 100%;
    width: 100%;
  }
  .header {
    z-index: 1;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6%;
    min-height: 50px;
    background-color: rgb(251, 251, 251);
    // background-color: #001529;
    // color: white;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .left_header {
      cursor: pointer;
      margin-left: 20px;
      display: flex;
      align-items: center;
      .left_logo {
        width: 30px;
      }
    }
    .right_setting {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-right: 1px solid #f6f6f6;
      display: flex;
      align-items: center;

      .setting_item {
        width: 100%;
        height: 50px;
        width: 50px;
        user-select: none;
        cursor: pointer;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: rgb(223, 223, 223);
        }
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .settion_item_icon {
            width: 15px;
          }
          .settion_item_text {
            font-size: 10px;
            line-height: 18px;
          }
        }
        .test {
          opacity: 0.2;
          cursor: not-allowed;
        }
      }
      .scale {
        text-align: center;
        line-height: 50px;
      }
    }
    .right_header {
      margin-right: 20px;
      .right_header_item {
        margin-right: 20px;
      }
    }
  }
}
</style>

<style lang="less">
</style>