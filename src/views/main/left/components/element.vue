<template>
  <div class="component">
    <div
      class="item"
      v-for="(item, index) in reactList"
      :key="item.name"
      @click="setComponent(index)"
    >
      <div v-if="index == 1">
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
          <!-- <a-button> <a-icon type="upload" /> Click to Upload </a-button> -->
          <img class="item_img" :src="item.img" alt />
          <p class="item_name">{{ item.name }}</p>
        </a-upload>
      </div>
      <div v-else>
        <img class="item_img" :src="item.img" alt />
        <p class="item_name">{{ item.name }}</p>
      </div>
    </div>
    <img-upload ref="imgUpload"></img-upload>
  </div>
</template>

<script lang="ts">
import {
  baseButtom,
  baseImg,
  baseText,
  baseInput,
  baseDiv
} from "@/utils/baseReact";
import { imageUpUrl } from "@/config/index";
import imgUpload from "@/components/imgUpload/index.vue";
import Vue from "vue";
export default Vue.extend({
  components: {
    imgUpload
  },
  data() {
    return {
      headers: {
        authorization: "authorization-text"
      },
      imageUpUrl: imageUpUrl,
      reactList: [
        {
          name: "块级元素",
          img: require("@/assets/div.png")
        },
        {
          name: "图片",
          img: require("@/assets/img.png")
        },
        {
          name: "文本",
          img: require("@/assets/showtext.png")
        },
        {
          name: "按钮",
          img: require("@/assets/buttom.png")
        },
        {
          name: "输入框",
          img: require("@/assets/text.png")
        },
        {
          name: "图库",
          img: require("@/assets/text.png")
        }
      ]
    };
  },
  methods: {
    setComponent(index) {
      if (index == 0) {
        this.$store.commit(
          "core/set_tempLate",
          baseDiv(this.$store.state.core)
        );
      } else if (index == 1) {
        console.log("添加图片");
      } else if (index == 2) {
        this.$store.commit(
          "core/set_tempLate",
          baseText(this.$store.state.core)
        );
      } else if (index == 3) {
        this.$store.commit(
          "core/set_tempLate",
          baseButtom(this.$store.state.core)
        );
      } else if (index == 4) {
        this.$store.commit(
          "core/set_tempLate",
          baseInput(this.$store.state.core)
        );
      } else if (index == 5) {
        (this.$refs.imgUpload as any).open();
      }
    },
    beforeAvatarUpload(file) {
      // console.log(file);
    },
    handleChange(info) {
      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      if (info.file.status === "done") {
        this.$store.commit(
          "core/set_tempLate",
          baseImg(this.$store.state.core, info.file.response.data.data)
        );
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} 上传失败.`);
      }
    }
  }
});
</script>

<style lang="less" scoped>
.component {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  .item {
    user-select: none;
    cursor: pointer;
    padding: 10px 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 20px;
    border-radius: 5px;
    background-color: rgb(247, 247, 247);
    width: 110px;
    text-align: center;
    .item_img {
      width: 20px;
      height: 20px;
    }
    .item_name {
      margin: 0;
      margin-top: 10px;
    }
  }
}
</style>
<style lang="less">
.item_file {
  .ant-upload {
    width: 90px;
    height: 52px;
  }
}
</style>