import Axios from 'axios'
const request = Axios.create({
  timeout: 0, // 无超时时间
  // timeout: 20000, // 请求超时 20s
})

let showMsg = true
// 请求拦截器（发起请求之前的拦截）
request.interceptors.request.use(
  (config) => {
    /**
     * 根据你的项目实际情况来对 config 做处理;这里没有对 config 不做任何处理，直接返回
     */
    const userInfo = window.$Cookies.get('userInfo') ? JSON.parse(window.$Cookies.get('userInfo')) : {}
    // 这里还可以添加token等等
    config.headers['System-Name'] = 'Pi-Diginn' // 要改成一样才能公用token
    config.headers['username'] = userInfo.username
    config.headers.Authorization = window.$Cookies.get('authorToken') || undefined
    return config
  },
  (error) => Promise.reject(error),
)

// 响应拦截器（获取到响应时的拦截）
request.interceptors.response.use(
  (response) => {
    const data = response.data
    // 弹出提示
    return data
  },
  (error) => {
    if (error.response && error.response.data) {
      if (showMsg) {
        const code = error.response.status
        const msg = error.response.data.message
        window.$message.error(`Code: ${code}, Message: ${msg}`)
        showMsg = false
        setTimeout(() => {
          showMsg = true
        }, 3000)
      }
    } else {
      //取消接口的情况无需把错误抛出
      error.code !== 'ERR_CANCELED' && window.$message.error(`${error}`)
    }
    return Promise.reject(error)
  },
)

/**
 * get请求方式
 * @url {string} 请求的接口路径
 * @params {object} 入参
 * @headers {object} 通常是headers里的一些特殊处理
 * */
export function get(url, params, headers) {
  return request({
    url,
    method: 'get',
    params,
    // ...headers,
    headers: headers || {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}

/**
 * post请求方式
 * @url {string} 请求的接口路径
 * @data {object} 入参
 * @headers {object} 通常是headers里的一些特殊处理
 * */
export function post(url, data, headers) {
  return request({
    url,
    method: 'post',
    data,
    // ...headers,
    headers: headers || {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}

/**
 * 下载常用
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function download(url, params, headers) {
  return request({
    method: 'post',
    url,
    data: params,
    responseType: 'blob',
    headers: headers || {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}

/**
 * 文件预览常用
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function filePreview(url, params) {
  return request({
    method: 'post',
    url,
    data: params,
    responseType: 'blob',
  })
}

/**
 * 上传常用
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function upload(url, params) {
  return request({
    method: 'post',
    url,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
    },
  })
}
