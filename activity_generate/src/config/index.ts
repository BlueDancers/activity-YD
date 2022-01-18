/*
 * @Author: your name
 * @Date: 2020-05-08 14:09:38
 * @LastEditTime: 2020-05-10 22:11:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \activity_generate\src\config\index.ts
 */
export const url = process.env.NODE_ENV == "development" ? "http://127.0.0.1" : "http://121.36.37.117"
// export const url = "http://121.36.37.117"
export const mobileUrl = `${url}/mobileb/index/`; // 前台域名
export const baseURL = `${url}:818`; // 后台地址
export const imageUpUrl = `${baseURL}/upimage`; // 上传图片地址
export const imageStaticUrl=`${baseURL}/public/image/`
/**
 * 默认页面高度
 */
export const commHeight = 667; // 1334 750 是标准配置 这里 宽度是375 以应对标准高度,这里使用1334/2
export const commWidth = 375;


export const initPage=`/*var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
                      httpRequest.open('POST', 'URL', true); //第二步：打开连接
                      httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                      //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
                      httpRequest.send('name=teswe&ee=ef');//发送请求 将情头体写在send中
                       // 获取数据后的处理程序
                      httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
                          if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
                              var json = httpRequest.responseText;//获取到服务端返回的数据
                              pageData.Buttom1="xxxx";//可单独为某个名称的组件设置值
                              pageData.text=['xxx','xxxxx','xxxxx']//也可以用数组的方式数组的顺序与添加组件的顺序相同
                              pageData.ajaxOver();//ajax结束后调用该方法
                          }
                      };*/`
