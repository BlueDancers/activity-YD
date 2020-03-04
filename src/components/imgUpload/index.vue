<template>
  <a-modal title="图库" :visible="visible" @ok="handleOk" @cancel="handleCancel" :width="1000">
    <div class="img_upload">
      <div class="img_menu">
        <a-menu
          :defaultSelectedKeys="Menukey"
          mode="inline"
          :inlineCollapsed="false"
          @click="toggleMenu"
        >
          <a-menu-item key="1">
            <a-icon type="pie-chart" />
            <span>用户上传</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="desktop" />
            <span>基础图库</span>
          </a-menu-item>
        </a-menu>
        <a-upload
          class="item_file"
          name="image"
          :multiple="true"
          :showUploadList="false"
          :action="imageUpUrl"
          :headers="headers"
          @change="handleChange"
          :before-upload="beforeAvatarUpload"
        >
          <a-button type="primary">
            <a-icon type="upload" />上传图片
          </a-button>
        </a-upload>
      </div>
      <div class="img_con">
        <div class="img_list" v-if="Menukey.includes('1')">
          <img
            @click="addBaseImg(item)"
            class
            v-for="item in userImage"
            :key="item"
            :src="item"
            alt
          />
        </div>
        <div class="img_list" v-if="Menukey.includes('2')">基础处图库</div>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { getUPloadImage } from "@/api/index";
import { baseImg } from "@/utils/baseReact";
import { imageUpUrl } from "@/config/index";
export default Vue.extend({
  data() {
    return {
      visible: false,
      Menukey: ["1"],
      userImage: [],
      baseImage: [],
      imageUpUrl: imageUpUrl,
      headers: {
        authorization: "authorization-text"
      },
      type: "default", // swiper 为轮播图选择
      swiperItem: 0 // 轮播图下标
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getUPloadImage().then(res => {
        console.log(res);
        this.userImage = res.data.data;
      });
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    open({ type, index }) {
      this.visible = true;
      this.type = type || "default";
      this.swiperItem = index || 0;
    },
    toggleMenu(value) {
      this.Menukey = value.keyPath;
    },
    addBaseImg(item) {
      if (this.type == "default") {
        this.$store.commit(
          "core/set_tempLate",
          baseImg(this.$store.state.core, item)
        );
      } else {
        this.$store.commit("core/update_swiperimg", {
          index: this.swiperItem,
          imgurl: item
        });
        console.log("更新图片");
      }
      this.visible = false;
    },
    beforeAvatarUpload(file) {
      // console.log(file);
    },
    handleChange(info) {
      if (info.file.status === "done") {
        this.init();
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} 上传失败.`);
      }
    }
  }
});
</script>

<style lang="less" scoped>
.img_upload {
  display: flex;
  .img_menu {
    position: relative;
    height: 400px;
    border-right: 1px solid #e8e8e8;
    .item_file {
      position: absolute;
      bottom: 10px;
    }
  }
  .img_con {
    overflow-y: scroll;
    height: 400px;
    margin-left: 20px;
    .img_list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      img {
        margin-left: 20px;
        margin-bottom: 30px;
        width: 90px;
        padding: 5px;
        &:hover {
          cursor: pointer;
          outline: 1px solid #1890ff;
        }
      }
    }
  }
}
</style>