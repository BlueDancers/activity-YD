<!--
import templateVue from '@/views/main/left/components/template.vue';
 * @Author: your name
 * @Date: 2020-05-08 14:12:40
 * @LastEditTime: 2020-05-10 17:48:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \activity_generate\src\views\main\right\components\coverage.vue
 -->
<template>
<div class='coverage'>
  <div class='title'>图层</div>
  <div  class="list">
    
        <cell v-for="(item,index) in templateLists" :key="'cell'+index"  @click.native="addItem(item.activityId)"
        :title="item.name" :class="{'cells':1==1 ,'activeCells':isActive(item.activityId)  }" draggable="true" 
        @dragstart.native='dragStart($event, item)'
           @dragenter.native="dragEnter($event, item)"
        @dragend.native="dragEnd($event, item)"
        @dragover.native="dragover"
        ></cell>
       
    </div>
</div>
</template>
<script>
import cell from '@/views/coverage/components/cell'
export default {
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
    }

  },
  components:{
  cell
  },
  methods: {
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
        /**
     * 推拽开始，解决火狐无法拖拽情况
    */
    dragStart (e, item) {
       this.startTemplate=item;
      //  e.preventDefault();
    },
    dragover(e){

      e.preventDefault();
    },
    /**
     * 拖拽元素至目标元素内时触发
     * @item 目标元素
     * @info 可在此处获取，拖拽元素的一系列属性
    */
    dragEnter (e, item) {
      e.preventDefault();
      this.changeTemplate=item;

      // e.preventDefault();
    },
    /**
     * 拖拽完成之后触发
     * @item 目标元素
     * @info 可在此处获取，拖拽元素的目标元素一系列属性
    */
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
  computed:{
    
    templateLists(){
        
       let tmp=JSON.parse(JSON.stringify(this.$store.state.core.template));
       
      tmp.map(
        (item)=>{
         
          
          if(!this.cache.keyValue.namekey.includes(item.activityId)){//没存储的对象
          
          if(!this.cache.nameCache.namekey.includes(item.name)){//新的类型
              this.cache.nameCache.namekey.push(item.name);
              this.cache.nameCache.value.push(1);
              
            }
            this.cache.keyValue.namekey.push(item.activityId);
            this.cache.keyValue.value[this.cache.keyValue.namekey.indexOf(item.activityId)]=this.cache.nameCache.value[
              this.cache.nameCache.namekey.indexOf(item.name)
            ]++;
          }else{

          }
          item.name+=this.cache.keyValue.value[this.cache.keyValue.namekey.indexOf(item.activityId)]
        }
       
      );
      tmp.reverse().sort(
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
  mounted(){
    
    
    
    //this.templateList=this.$store.state.core.template.reverse();
    
    this.$nextTick(
      ()=>{
        // let coverage=document.getElementsByClassName('coverage')[0];
        // coverage.onmousedown=()=>{
        //     console.log('down');
        //     coverage.onmousemove=()=>{
        //       console.log('move');
        //   }
        // }
        // coverage.onmouseup=(e)=>{
        //   console.log(coverage.style.x='100');
        //   console.log(coverage.style.x);
        //  // e.style.height='500px';
        //   console.log('up');
        //   coverage.onmousemove=undefined;
        // }
        let coverage=document.getElementsByClassName('coverage')[0];
       let title=document.getElementsByClassName('title')[0];
       coverage.style.right=370+'px';
       coverage.style.top=200+'px';
        title.onmousedown=()=>{
            console.log(this.templateList);
            console.log(this.activeTemplates);
            coverage.onmousemove=(e)=>{
              coverage.style.left=e.pageX-50+'px';
          coverage.style.top=e.pageY-20+'px';
           e.preventDefault();
          }
        }
        title.onmouseout=title.onmouseup=(e)=>{
          coverage.onmousemove=undefined;
        }
      

        }


    );
  },
  watch:{
  }
}
</script>
<style lang="less" scoped>
.coverage{
  outline: #aaa 2px solid;
  .title{
    outline: #aaa 1px solid;
    line-height: 2em;
    cursor: move;
    height: 2em;
    font-size: 1.5em;
    border-bottom: 1px solid #aaa;
    padding-left: 8px;
  }
  .list{
    overflow-y: auto;
    overflow-x: hidden;
    height: 258px;
    .cells{
      height: 2em;
      line-height: 2em;
      font-size: 1.5em;
      
    }
    
  }
}

.activeCells{
      background-color: skyblue;
      
    }
</style>
