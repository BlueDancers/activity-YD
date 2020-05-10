<!--
 * @Author: your name
 * @Date: 2020-05-08 15:31:54
 * @LastEditTime: 2020-05-10 22:09:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \activity_generate\src\views\coverage\components\cell.vue
 -->
<template>
  <div class="cell">
    <span class="title">{{title}}</span>
  </div>
</template>
<script>
export default {
  props: ["title"]
};
</script>
<style lang="less" scoped>
.cell {
  border-bottom: 1px solid #aaa;
  padding-left: 0.5em;
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
