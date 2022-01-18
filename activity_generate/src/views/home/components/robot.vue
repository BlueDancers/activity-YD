<template>
  <div>
    <div class="showRobot" @click="switchRobot()">
      <div class="for-hide">
      <svg t="1595400757270" class="roboticon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2102" data-spm-anchor-id="a313x.7781069.0.i0" width="200" height="200"><path d="M554.667 362.667h-320V832h554.666V362.667H554.667z m-85.334-85.334V192H448a21.333 21.333 0 0 1-21.333-21.333V85.333A21.333 21.333 0 0 1 448 64h128a21.333 21.333 0 0 1 21.333 21.333v85.334A21.333 21.333 0 0 1 576 192h-21.333v85.333H832A42.667 42.667 0 0 1 874.667 320v554.667A42.667 42.667 0 0 1 832 917.333H192a42.667 42.667 0 0 1-42.667-42.666V320A42.667 42.667 0 0 1 192 277.333h277.333zM21.333 512H64a21.333 21.333 0 0 1 21.333 21.333v128A21.333 21.333 0 0 1 64 682.667H21.333A21.333 21.333 0 0 1 0 661.333v-128A21.333 21.333 0 0 1 21.333 512zM320 533.333h128v128H320v-128z m256 0h128v128H576v-128zM960 512h42.667A21.333 21.333 0 0 1 1024 533.333v128a21.333 21.333 0 0 1-21.333 21.334H960a21.333 21.333 0 0 1-21.333-21.334v-128A21.333 21.333 0 0 1 960 512z" p-id="2103"></path></svg>
      </div>
    </div>

    <transition name="el-zoom-in-top" >
      <div  class="robot-speak" id='Robotbox' v-show="speakShow">
        <div  class=" robot-head" id="RobotboxTitle">
            <span >智能客服</span>
            <el-button  type="text" icon="el-icon-close" circle @click="switchRobot()"></el-button>
          </div>
          
          <div class="speak-x" id="speakX">
            <div v-for="(item,i) in allList" :key="'speak'+i" class="wordList">
            <div :class="[item.isUser ? 'user-x' : 'robot-x']">
                <div :class="[item.isUser ? 'user-word' : 'robot-word']">
                {{item.data}}
              </div>
            </div>
          </div>
          </div>
          <div class="input-robot">
            <el-input
                class="input-text"
                type="textarea"
                :rows="3"
                :autosize="{minRows:3, maxRows: 3}"
                resize="none"
                placeholder="请输入内容"
                v-model="userWord">
              </el-input>
              <div class="input-go"> 
                <el-button type="primary" @click="goSpeak">发送</el-button>
              </div>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {toRobot} from '@/api/index'
import { setTimeout, clearInterval } from 'timers';
export default {
  data(){
    return{
      allList:[{
        data:"你好我是智能客服,\n欢迎你咨询我任何问题",
        isUser:false,
      }],
      userList:[],
      robotList:[],
      userWord:'',
      
      speakShow:false,
    }
  },
  methods:{
    async speakToRobot(word){
      return await toRobot(word);
    },
    initList(){

    },
    switchRobot(){
      this.speakShow= !this.speakShow;
    },
    async goSpeak(){
      if(this.userWord==""){
                this.$message({
                  type: 'error',
                  message: `输入不能为空`
                });
                return ;
      }
       let result =(await this.speakToRobot(this.userWord));
       
      this.$nextTick(() => {
              this.allList.push(
              {
                data:this.userWord,
                isUser:true,
              }
            );
            this.userWord="";
            if(result.desc=="success"){
                  this.allList.push(
                    {
                      data:result.data[0].intent.answer.text,
                      isUser:false,
                    }
                  );
            }else{
                this.$message({
                  type: 'error',
                  message: `笨蛋机器人出错了`
                });
            }
      });
      this.$nextTick(()=>{
        setTimeout(()=>{
        let main = document.getElementById('speakX'); //滚动的DOM，一般是父级
          let wordList=document.getElementsByClassName('wordList');
          let lastWord=wordList[wordList.length-1];
          // let content = document.getElementById(id2); //子级
          //main.scrollTop =  main.clientHeight;
          main.scrollTo(0, main.scrollHeight);
        });
      });
       
       
    }
  },

  async mounted(){
    
      //console.log( await toRobot("百科杨树"));
  }
}
</script>

<style scoped>
.showRobot{
  position: fixed;
  right: 10px;
  top:80%;
  z-index: 100;
  background-color: #001529;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
}
.for-hide{
overflow: hidden;
 
}

.roboticon{
   filter: drop-shadow(#eee 100px 0);
   transform: translateX(-100px);
   overflow: hidden;
 height: 40px;
  width: 40px;

}
.robot-speak{
  position: fixed;
  width: 30vw;
  height: 50vh;
  top: 60%;
  border-radius: 10px;
  right: 20%;
  transform: translate(50%,-50%);
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.robot-head{
  display: flex;
  align-items: baseline;
  padding-left: 2em;
  padding-right: 1em;
  box-sizing: border-box;
  border-bottom: #ccc 1px solid;
  font-size: 15px;
  height: 5vh;
  justify-content: space-between;
}
.speak-x{
  height: 30vh;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 15px;
  position: relative;
  padding:0 10px;
}
.robot-x{
  
}
.robot-word{
  background: #409EFF;
  padding:10px;
  color: #fff;
  text-align: left;
  border-radius: 10px;
  margin: 10px;
  display: inline-block;
  position: relative;
  max-width: 80%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.robot-word::before{
  content: '';
            position: absolute;
            width: 0;
            height: 0;
            border: 8px solid;
            border-color: transparent;
  border-right-color: #409EFF;
            top: 50%;
            right: 100%;
            margin-top: -9px;
}
.user-x{
  text-align: right;
}
.user-word{
  background: #fff;
  padding:10px;
  color: #000;
  text-align: left;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  margin: 10px;
  display: inline-block;
  position: relative;
  max-width: 80%;
}
.user-word::before{
  content: '';
  
            position: absolute;
            width: 0;
            height: 0;
            border: 8px solid;
            border-color: transparent;
  border-left-color: #fff;
            top: 50%;
            left: 100%;
            margin-top: -9px;
}
.input-robot{
  border-top: 2px solid #DCDFE6;
  height: 15vh;
  padding: 0px;
}
.input-text{
  max-height: 11vh;
}
.input-go{
  max-height: 4vh;
  display: flex;
  justify-content: flex-end;
  margin-right: 5px;
  z-index: 99;
}
.el-button {
  padding: calc((4vh - 16.8px ) /2 );
}

</style>
<style>
.input-robot .el-textarea__inner {
  border:0px !important;
  /* border-top: 1px solid #DCDFE6; */
}
</style>



