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
      v-model="editorValue"
      class="texteditor"
      :options="editorOption"
    />
  </div>
</template>

<script>
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/ImageExtend", ImageExtend);
Quill.register("modules/imageResize", ImageResize);

//自定义字体大小
var sizes = [false, "16px", "18px", "20px", "22px"];
var Size = Quill.import("formats/size");
Size.whitelist = sizes;
Quill.register(Size, true);
var aligns = [false, "center", "none"];
var Align = Quill.import("formats/align");
Quill.register(Align, true);
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
    },
    action: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      content: "",
      editorOption: {
        placeholder: "请输入文字",
        modules: {
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          },
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction
              [{ size: sizes }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [
                { align: "left" },
                { align: "center" },
                { align: "right" },
                { align: "justify" }
              ],
              ["link", "image"]
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
    },
    editorValue: {
      get() {
        return this.value;
      },
      set(value) {
        console.log('通知父组件');
        this.$emit("changeHtml", value);
      }
    }
  },
  methods: {
    uploadother(param) {
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
