/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */

import Vue from 'vue'
import { getUserInfo, login, wxLogin, logout } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { resetRouter } from '@/router'
import { title, tokenName } from '@/config'

const state = () => ({
  accessToken: getAccessToken(),
  username: '',
  nickname: '',
  avatar: '',
  permissions: [],
})
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  nickname: (state) => state.nickname,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
}
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username
  },
  setNickname(state, nickname) {
    state.nickname = nickname
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
}
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  /*微信登录*/
  async wxLogin({ commit },code){
    const { data } = await wxLogin(code)
    const accessToken = data[tokenName]
    if (accessToken) {
      commit('setAccessToken', accessToken)
      //设置用户信息
      const { data } = await getUserInfo(state.accessToken)
      if (!data) {
        Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
        return false
      }
      let { /*permissions, */ username, nickname, avatar,openid } = data
      if (username || openid) {
        let permissions = ['admin']
        commit('setPermissions', permissions)
        commit('setUsername', username)
        commit('setNickname', nickname)
        commit('setAvatar', avatar)
        const hour = new Date().getHours()
        const thisTime = hour < 8 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 18 ? '下午好' : '晚上好'
        Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
      } else {
        Vue.prototype.$baseMessage('用户信息接口异常', 'error')
        return false
      }
    } else {
      Vue.prototype.$baseMessage(
          `登录接口异常，未正确返回${tokenName}...`,
          'error'
      )
    }
  },
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo)
    const accessToken = data[tokenName]
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime = hour < 8 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 18 ? '下午好' : '晚上好'
      Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(
        `登录接口异常，未正确返回${tokenName}...`,
        'error'
      )
    }
  },
  async getUserInfo({ commit, state }) {
    const { data } = await getUserInfo(state.accessToken)
    if (!data) {
      Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
      return false
    }
    let { /*permissions, */ username, nickname, avatar,openid } = data
    if (username || openid) {
      let permissions = ['admin']
      commit('setPermissions', permissions)
      commit('setUsername', username)
      commit('setNickname', nickname)
      commit('setAvatar', avatar)
      return permissions
    } else {
      Vue.prototype.$baseMessage('用户信息接口异常', 'error')
      return false
    }
  },
  async logout({ dispatch }) {
    await logout(state.accessToken)
    await dispatch('resetAccessToken')
    // await resetRouter()
  },
  resetAccessToken({ commit }) {
    // commit('setPermissions', [])
    commit('setAccessToken', '')
    commit('setUsername', '')
    commit('setNickname', '')
    commit('setAvatar', '')
    removeAccessToken()
  },
}
export default { state, getters, mutations, actions }
