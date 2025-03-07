// 登录api
import { post, get } from '@/utils/request'
const headers = {
  // 在request里面默认有请求头，当遇到后端接口请求头不一致的时候，这里可以自定义
  'Content-Type': 'application/x-www-form-urlencoded',
}
const loginApi = {
  login(parameter) {
    return post('/oauth/login', parameter)
  },
  /** 测试接口--传入请求头*/
  test(parameter) {
    return get('/oauth/user/test', parameter, headers)
  },
}
export default loginApi
