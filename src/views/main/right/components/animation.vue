<!--
 * @Author: vkcyan
 * @Date: 2020-03-08 18:32:38
 * @LastEditTime: 2020-03-10 11:40:47
 * @LastEditors: Please set LastEditors
 * @Description: 组件动画配置
 * @FilePath: /activity_generate/src/views/main/right/components/animation.vue
 -->
 <template>
  <div>
    <div class="active_list" v-if="coreType == 1">
      <div class="active_item">
        <div class="active_list_left">选择动画:</div>
        <div class="active_list_right">
          <!-- <a-input v-model="core.animation.animationName"></a-input> -->
          <a-button @click="openSelect">{{animationName}}</a-button>
        </div>
      </div>
      <div class="active_item">
        <div class="active_list_left">动画时间:</div>
        <div class="active_list_right">
          <a-input class="active_mintextarea" v-model="core.animation.animationDuration"></a-input>
          <span class="active_unit">ms</span>
        </div>
      </div>
      <div class="active_item">
        <div class="active_list_left">延迟时间:</div>
        <div class="active_list_right">
          <a-input class="active_mintextarea" v-model="core.animation.animationDelay"></a-input>
          <span class="active_unit">ms</span>
        </div>
      </div>
      <div class="active_item">
        <div class="active_list_left">无限循环:</div>
        <div class="active_list_right">
          <a-switch
            :defaultChecked="core.animation.animationIterationCount == 'infinite'"
            @change="changecycle"
          />
        </div>
      </div>
      <div class="active_item" v-if="core.animation.animationIterationCount != 'infinite'">
        <div class="active_list_left">执行次数:</div>
        <div class="active_list_right">
          <a-input class="active_mintextarea" v-model="core.animation.animationIterationCount"></a-input>
        </div>
      </div>
    </div>
    <!-- 无组件 -->
    <div v-if="coreType == 3" class="active_showtext">当前无可操作组件</div>
    <animation ref="animation" @saveAnimation="saveAnimation"></animation>
  </div>
</template>
 
 <script>
import animation from "../../components/animation";
import animationAPI from "@/utils/animation";
export default {
  components: {
    animation
  },
  data() {
    return {};
  },
  computed: {
    // 可能是单组件 可能是多组件 可能无组件
    core() {
      let activeCore = this.$store.state.core.activeTemplate;
      if (activeCore.length == 1) {
        let form = this.$store.state.core.template.filter(e =>
          activeCore.includes(e._id)
        )[0];
        return form;
      } else if (activeCore.length > 1) {
        return this.$store.state.core.template.filter(e =>
          activeCore.includes(e._id)
        );
      }
      return {};
    },
    // 1 单组件 2 是多组件 3 无组件
    coreType() {
      let activeCore = this.$store.state.core.activeTemplate;
      if (activeCore.length == 1) {
        return 1;
      } else if (activeCore.length == 2) {
        return 2;
      } else if (activeCore.length == 0) {
        return 3;
      }
      return 3;
    },
    // 监听动画变化基于获取动画文字
    animationName() {
      let animationValue = this.core.animation.animationName;
      let animationLable = "";
      animationAPI.map(par => {
        par.children.map(e => {
          if (e.value == animationValue) {
            animationLable = e.label;
          }
        });
      });
      if (animationLable == "") {
        return "选择动画";
      } else {
        return animationLable;
      }
    }
  },
  methods: {
    openSelect() {
      this.$refs.animation.open();
    },
    saveAnimation(name) {
      // TODO 写法不规范
      this.core.animation.animationName = name;
    },
    changecycle(status) {
      this.core.animation.animationIterationCount = status ? "infinite" : 1;
    }
  }
};
</script>
 
<style lang="less" scoped>
.active_list {
  .active_item {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    .active_list_left {
      text-align: right;
      width: 75px;
      margin-left: 5px;
    }
    .active_list_right {
      width: 260px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      .active_mintextarea {
        width: 70px;
      }
      .active_unit {
        margin-left: 5px;
      }
    }
  }
}
.active_showtext {
  text-align: center;
}
</style>
