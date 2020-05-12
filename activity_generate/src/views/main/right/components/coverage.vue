<!--
import templateVue from '@/views/main/left/components/template.vue';
 * @Author: your name
 * @Date: 2020-05-08 14:12:40
 * @LastEditTime: 2020-05-12 15:55:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \activity_generate\src\views\main\right\components\coverage.vue
 -->
<template>
<div class='coverage'>
  
  <div  class="list">
      <draggable
      class="syllable_ul"
            element="ul"
            :list="templateLists"
            :options="{group:'title', animation:150}"
            :no-transition-on-drag="true"
            @change="change"
            @start="start"
            @end="end"
            :move="move"
      >
      <transition-group type="transition" :name="!drag? 'fade' : null" :css="true">
        <li v-for="(item,index) in templateLists" :key="'cell'+index"  @click="addItem(item.activityId)"
        :class="{'cells':true ,'activeCells':isActive(item.activityId)  }" 

        >
        {{item.name}}
        </li>
      </transition-group>
       </draggable>
    </div>
</div>
</template>
<script>
import draggable from "vuedraggable"
export default {
    components:{
      draggable,
      
  },
  props:[],
  mounted(){
    
  },
    data() {
    return {
      cache:{
          keyValue:{
            namekey:[],
            value:[]
          },
          nameCache:{
            namekey:[],
            value:[]
          },
      },
      startTemplate:{},
      changeTemplate:{},
      drag:false,
    }

  },

  computed:{
    
    templateLists(){
        
       let tmp=JSON.parse(JSON.stringify(this.$store.state.core.template));
         tmp.sort(
           (a,b)=>{
                  return a.css.zIndex-b.css.zIndex;
                   }
               );
      tmp.map(
        (item)=>{
         

          if(!this.cache.keyValue.namekey.includes(item.activityId)){//没存储的对象
          
          if(!this.cache.nameCache.namekey.includes(item.name)){//新的类型
              this.cache.nameCache.namekey.push(item.name);
              this.cache.nameCache.value.push(1);
              
            }
            this.cache.keyValue.namekey.push(item.activityId);
            this.cache.keyValue.value[this.cache.keyValue.namekey.indexOf(item.activityId)]=this.getTemplateName(item.name)
            +this.cache.nameCache.value[
              this.cache.nameCache.namekey.indexOf(item.name)
            ]++;
          }else{

          }
          item.name=this.cache.keyValue.value[this.cache.keyValue.namekey.indexOf(item.activityId)]
        }
       
      );
      tmp.sort(
        (a,b)=>{
            return b.css.zIndex-a.css.zIndex;
        }
      );
      return tmp;
    },
    activeTemplates(){
      return this.$store.state.core.activeTemplate;
    }

  },
  
  watch:{
  },
  
  methods: {
    getTemplateName(name){
      switch(name){
        case 'base-div':
          return '块级元素';
        case 'base-img':
          return '图片';
        case 'base-text':
          return '文本';
        case 'base-buttom':
          return '按钮';
        case 'base-input':
          return '输入框';
        case 'base-swiper':
          return '轮播图';
        
      }

    },

     //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
    change(e) {
      
      //console.log(e , 'change...')
    },
    //start ,end ,add,update, sort, remove 得到的都差不多
    start(e) {
      this.drag = true;
      this.startTemplate=e.item._underlying_vm_;
     // console.log(this.startTemplate);
     // console.log(e , 'start...')
    },
    end(e) {
      //console.log(e , 'end....')
      this.drag = true;
      //this.changeTemplate=this.getItem(e);
            let change=this.changeTemplate.css.zIndex,
          start=this.startTemplate.css.zIndex;
      if(change>start){
      this.setZIndex(this.changeTemplate.activityId,--change);
      this.setZIndex(this.startTemplate.activityId,change+1);
      }else{
        this.setZIndex(this.changeTemplate.activityId,++change);
        this.setZIndex(this.startTemplate.activityId,change-1);
      }
      console.log(this.startTemplate.css.zIndex,this.changeTemplate.css.zIndex);

      // evt.item //可以知道拖动的本身
      // evt.to    // 可以知道拖动的目标列表
      // evt.from  // 可以知道之前的列表
      // evt.oldIndex  // 可以知道拖动前的位置
      // evt.newIndex  // 可以知道拖动后的位置
    },

    move(e, originalEvent) {
      this.changeTemplate=e.relatedContext.element;
      console.log(this.changeTemplate);
      //console.log(e , 'move')
      //console.log(originalEvent,"鼠标位置") //鼠标位置
    },
    isActive(id){
    return this.activeTemplates.includes(id);
    },
    setZIndex(id,index){
    for(let i=0,len= this.$store.state.core.template.length;i<len;i++){
       if(this.$store.state.core.template[i].activityId==id){
          this.$store.state.core.template[i].css.zIndex=index;
           break;
        }
                    
       }
    },
    addItem(itemId){
           
          this.$store.commit("core/toggle_temp_status",itemId);
    },
    dragEnd (e, item) {

      let change=this.changeTemplate.css.zIndex,
          start=this.startTemplate.css.zIndex;
      if(change>start){
      this.setZIndex(this.changeTemplate.activityId,--change);
      this.setZIndex(this.startTemplate.activityId,change+1);
      }else{
        this.setZIndex(this.changeTemplate.activityId,++change);
        this.setZIndex(this.startTemplate.activityId,change-1);
      }
    
      // e.preventDefault();
      /**
       * 进行拖拽完成的操作
       */
    },
  },
}
</script>



<style lang="less" scoped>
.coverage{
  padding:0;
  margin: 0;
  overflow-y:auto;
  height: 84vh;
  border-top: 1px #eee solid;
  .list{
      
      
    .cells{
      height: 2em;
      line-height: 2em;
      font-size: 1.5em;
      position: relative;
      padding-left: 1em;
      outline: 1px #eee solid;
    }
    
  }
}

.activeCells{
      
      &::before{
        content: '';
        background-color: skyblue;
        opacity: 0.2;
        position:absolute;
            top: 0;
        right: 0;
        bottom: 0;
       left: 0;
       
      }
    }
    .fade-enter-active, .fade-leave-active {
  transition: opacity .4s
}
.fade-enter,.fade-leave-to {
  opacity: 0
}
</style>
