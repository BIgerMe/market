import axios from 'axios'
import {
  baseURL,
  contentType,
   invalidCode,
  noPermissionCode,
  requestTimeout,
  successCode,
  tokenName
} from '@/config'
import router from '@/router'
import { isArray } from '@/utils/validate'
import {message} from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'

/**
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code, msg) => {
  switch (code) {
    case invalidCode:
      // message.error(msg || `后端接口${code}异常`)
      useUserStore().logout()
      router.push({ path: '/login' }).catch(() => {})
      break
    case noPermissionCode:
      message.error(msg || `没有权限访问`, 'error')
      break
    default:
      message.error(msg || `后端接口${code}异常`)
      break
  }
}

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    config.headers[tokenName] = userStore.accessToken
    //这里会过滤所有为空、0、false的key，如果不需要请自行注释
    // if (config.data && config.headers['Content-Type'] !== 'multipart/form-data')
      // config.data = Vue.prototype.$baseLodash.pickBy(config.data, Vue.prototype.$baseLodash.identity)
    // if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8')
    //   config.data = qs.stringify(config.data)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    // if (loadingInstance) loadingInstance.close()

    const { data, config } = response
    const { code, msg } = data
    // 操作正常Code数组
    const codeVerificationArray = isArray(successCode)
      ? [...successCode]
      : [...[successCode]]
    // 是否操作正常
    if (codeVerificationArray.includes(code)) {
      return data
    } else {
      handleCode(code, msg)
      return Promise.reject(
        '请求异常:' +
          JSON.stringify({ url: config.url, code, msg }) || 'Error'
      )
    }
  },
  (error) => {
    const msg = error.message
    if (error.response && error.response.data) {
      const { status, data } = error.response
      handleCode(status, data.msg || msg)
      return Promise.reject(error)
    } else {
      let msg  = error.message
      if (msg === 'Network Error') {
        msg = '后端接口连接异常'
      }
      if (msg.includes('timeout')) {
        msg = '后端接口请求超时'
      }
      if (msg.includes('Request failed with status code')) {
        const code = msg.substr(msg.length - 3)
        msg = '后端接口' + code + '异常'
      }
      message.error(msg || `后端接口未知异常`)
      return Promise.reject(error)
    }
  }
)

export default instance
