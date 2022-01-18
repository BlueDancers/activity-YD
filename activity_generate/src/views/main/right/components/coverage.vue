<template>
  <div class="coverage"
       @click="editCancel">
    <draggable v-model="templateLists"
               @start="onStart"
               @end="onEnd"
               animation="300"
               :move="onMove">
      <transition-group>
        <div class="item"
             v-for="element in templateLists"
             :class="{'cells':1==1 ,'activeCells':isActive(element.activityId)  }"
             :key="element.activityId"
             @click="chooseItem(element.activityId)">
          <div class="switchShow">
            <a-icon :type="element.isShow?'eye':'eye-invisible'"
                    @click.stop="switchShow(element.activityId)" />
          </div>
          <div v-show="editNameDomId!=element.activityId"
               class="coverName"
               @dblclick="editCoverName(element.activityId)">
            {{element.covName}}
          </div>
          <input @click.stop=""
                 @input="changeCoverName($event,element.activityId)"
                 class="coverName"
                 v-model="element.covName"
                 v-show="editNameDomId==element.activityId" />
          <div class="delElement"
               @click.stop="delTemplate(element.activityId)">
            <a-icon type="close-circle" />
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  computed: {
    templateLists: {
      get () {
        let tmp = JSON.parse(JSON.stringify(this.$store.state.core.template));
        tmp.sort((a, b) => {
          return b.css.zIndex - a.css.zIndex;
        });
        return tmp;
      },
      set (e) {
      }

    },
    activeTemplates () {
      return this.$store.state.core.activeTemplate;
    }
  },
  mounted () {
  },
  data () {
    return {
      editNameDomId: '',
      drageCache: {
        startTemplate: {
          id: '',
          zIndex: 0,
        },
        endTemplate: {
          id: '',
          zIndex: 0,
        }
      }
    }
  },
  methods: {
    //开始拖拽事件
    onStart (e) {
      this.drageCache.startTemplate.id = e.item._underlying_vm_.activityId;
      this.drageCache.startTemplate.zIndex = e.item._underlying_vm_.css.zIndex;
    },
    onMove (e, originalEvent) {
      this.drageCache.endTemplate.id = e.relatedContext.element.activityId;
      this.drageCache.endTemplate.zIndex = e.relatedContext.element.css.zIndex;
      return true;
    },
    //拖拽结束事件
    onEnd (e) {
      let startDom = this.drageCache.startTemplate;
      let endDom = this.drageCache.endTemplate;
      if (startDom.zIndex > endDom.zIndex) {
        this.$store.commit("core/set_CompZindex", { actId: startDom.id, num: endDom.zIndex });
      } else {
        this.$store.commit("core/set_CompZindex", { actId: startDom.id, num: endDom.zIndex + 1 });
      }
    },
    isActive (id) {
      return this.activeTemplates.includes(id);
    },
    chooseItem (id) {
      this.$store.commit("core/toggle_temp_status", id);
      this.editNameDomId = '';
    },
    switchShow (activityId) {
      this.$store.commit("core/switchTemplateShow", activityId);
    },
    editCoverName (id) {
      this.editNameDomId = id;
    },
    editCancel () {
      this.editNameDomId = '';
    },
    changeCoverName (event, id) {
      this.$store.commit("core/changeCoverName", { covName: event.target.value, id });
    },
    delTemplate (id) {
      this.$store.commit("core/deleteCompLate", id);
      this.$store.commit("setting/closeRightMenu");
    }
  },
}
</script>

<style scoped>
.coverage{
  width: 100%;
  height: calc(100vh - 120px);
}
.item{
  padding: 10px 10px;
  position: relative;
  margin: 0px 5px 0px 5px;
  border:  solid 1px #eee;
  display: flex;
  align-items: center;
}
.item:hover{
  background-color: #f1f1f1;
  cursor: pointer;
}
.item+.item{
  border-top:none ;
}
.activeCells{
  background-color: #ccc;
}
.switchShow{
  display: inline-block;
  font-size: 0.8em;
}
.switchShow:hover{
  transform: scale(1.1);
}
.coverName{
  display: inline-block;
  width: 50%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  margin-left: 0.5em;
}
.delElement{
  display: inline-block;
  color: #000;
  position: absolute;
  right: 0.5em;
  top: 50%;
  transform: translateY(-50%);
}
</style>
