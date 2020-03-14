export const url = process.env.NODE_ENV == "development" ? "http://127.0.0.1" : "http://121.36.37.117"
// export const url = "http://121.36.37.117"
export const mobileUrl = `${url}/mobile/index/`; // 前台域名
export const baseURL = `${url}:7001`; // 后台地址
export const imageUpUrl = `${baseURL}/upimage`; // 上传图片地址

/**
 * 默认页面高度
 */
export const commHeight = 667; // 1334 750 是标准配置 这里 宽度是375 以应对标准高度,这里使用1334/2
export const commWidth = 375;
