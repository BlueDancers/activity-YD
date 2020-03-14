import Vue from 'vue'

/**
 * 增加自定义对象和
 */
declare module 'vue/types/vue' {
  interface Vue {
    $showLoading: any,
    $hideLoading: any,
  }
}