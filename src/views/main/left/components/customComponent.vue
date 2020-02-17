<template>
  <div class="comp_list">
    <a-list :dataSource="compList">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-popover placement="right">
          <template slot="title">
            <span>{{ item.compName }}</span>
          </template>
          <template slot="content">
            <component
              :key="item._id"
              :is="item.name"
              :id="item._id"
              :option="item.css"
              :text="item.text"
              :activeTemplate="[]"
              :absolute="false"
            ></component>
          </template>
          <div class="comp_item" @click="addUserComp(item)">
            <div class="item_name" v-if="isEditid != item._id">
              {{ item.compName }}
            </div>
            <a-input
              class="item_input"
              v-if="isEditid == item._id"
              placeholder="请输入组件名"
              ref="newName"
            />
            <div class="item_icon" v-if="isEditid != item._id">
              <a-icon
                type="form"
                class="icon"
                @click.stop="updateCompName(item._id)"
              />
              <a-icon
                type="close-circle"
                class="icon"
                @click.stop="deleteCompName(item._id)"
              />
            </div>
            <div v-if="isEditid == item._id" class="item_icon">
              <a-button-group>
              <a-button
                class="icon_btn"
                type="primary"
                @click.stop="updateNewName"
              >
                确认
              </a-button>
              <a-button class="icon_btn" type="danger" @click.stop="cancelEdit">
                取消
              </a-button>
              </a-button-group>
            </div>
          </div>
        </a-popover>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import baseButtom from "@/template/baseButtom.vue";
import baseImg from "@/template/baseImg.vue";
import baseText from "@/template/baseText.vue";
import baseInput from "@/template/baseInput.vue";
import baseDiv from "@/template/baseDiv.vue";
import { baseComplate } from "@/utils/baseReact";
import { cloneDeep } from "lodash";
export default {
  components: {
    baseButtom,
    baseImg,
    baseText,
    baseInput,
    baseDiv
  },
  mounted() {
    this.$store.dispatch("complate/getSingList");
  },
  data() {
    return {
      currrentPage: 1, // 当前页码
      isEditid: 0 // 改名的组件的id
    };
  },
  computed: {
    compList() {
      return this.$store.state.complate.compList;
    }
  },
  methods: {
    addUserComp(data) {
      if (this.isEditid == 0) {
        this.$store.commit(
          "core/set_tempLate",
          cloneDeep(baseComplate(this.$store.state.core, data))
        );
      }
    },
    updateCompName(id) {
      this.isEditid = id;
    },
    deleteCompName(id) {
      this.$store.dispatch("complate/deleteCompName", id);
    },
    cancelEdit() {
      this.isEditid = 0;
    },
    updateNewName() {
      this.$store.dispatch("complate/updateCompName", {
        id: this.isEditid,
        newName: this.$refs["newName"].stateValue
      }).then(() => {
        this.isEditid = 0
      })
    }
  }
}
</script>

<style lang="less" scoped>
.comp_list {
  .comp_item {
    width: 320px;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .item_name {
      font-size: 16px;
    }
    .item_input {
      width: 150px;
    }
    .item_icon {
      display: flex;
      .icon_btn {
      }
    }
    .icon {
      padding: 10px;
    }
  }
}
</style>