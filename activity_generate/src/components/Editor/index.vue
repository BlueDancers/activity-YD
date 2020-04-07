<!--
 * @Author: your name
 * @Date: 2020-04-06 18:00:29
 * @LastEditTime: 2020-04-07 21:50:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /activity_generate/src/components/Editor/index.vue
 -->
<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="action"
      name="image"
      :show-file-list="false"
      :with-credentials="true"
      :http-request="uploadother"
      :on-error="uploadError"
    />
    <quill-editor
      ref="myTextEditor"
      v-model="content"
      class="texteditor"
      :options="editorOption"
      @input="onEditInput($event)"
    />
  </div>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { uploadImg } from "@/api";
import { url } from "@/config/index";
export default {
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      action: url + "/upimage",
      content: "",
      editorOption: {
        placeholder: "请输入文字",
        modules: {
          toolbar: {
            container: [
              [
                "bold",
                "italic",
                "underline",
                "strike",
                "clean",
                "link",
                // "image",
                { align: [] },
                { color: [] }
              ],
              [{ color: [] }, { background: [] }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }]
              // +源码编辑器
              // ["sourceEditor"]
            ],
            handlers: {
              image(value) {
                if (value) {
                  document.querySelector(".avatar-uploader input").click();
                }
              }
            }
          }
        }
      },
      textarea: "",
      source: false, // 默认不显示
      atxtx: ""
    };
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor;
    }
  },
  watch: {
    value: {
      handler() {
        this.content = this.value;
      },
      immediate: true
    }
  },
  methods: {
    onEditInput(quill) {
      this.$emit("changeHtml", quill);
    },
    uploadother(param) {
      console.log(param);
      const formData = new FormData();
      formData.append("image", param.file);
      uploadImg(formData).then(e => {
        console.log(e);
        const quill = this.editor.quill;
        const length = quill.getSelection().index;
        quill.insertEmbed(length, "image", e.data.data.data);
        // 调整光标到最后
        quill.setSelection(length + 1);
      });
    },
    uploadError(e) {
      this.$message.error(e);
    }
  }
};
</script>

<style lang="less">
.texteditor {
  width: 300px;
  .ql-container {
    min-height: 296px;
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6";
  }
}
.source {
  width: 350px;
  // height: 300px;
  position: absolute;
  // left: 365px;
  left: 0;
  top: 145px;
}
</style>
