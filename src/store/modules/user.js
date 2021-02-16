import wepy from '@wepy/core'
import { login, logout, refresh, register } from '@/api/auth'
import * as auth from '@/utils/auth'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import { getCurrentUser, updateUser, getUserPermissions } from '@/api/user'

const getDefaultState = () => {
  return {
    user: auth.getUser(),
    accessToken: auth.getToken(),
    accessTokenExpiredAt: auth.getTokenExpiredAt(),
    permissions: auth.getPermissions(),
  }
}

const state = getDefaultState()

// 定义 getters
const getters = {
  isLoggedIn: state => !isEmpty(state.accessToken),
  user: state => state.user,
  accessToken: state => state.accessToken,
  accessTokenExpiredAt: state => state.accessTokenExpiredAt,
  permissions: state => state.permissions,
  canManageContents: state => {
    return find(state.permissions, function(permission) {
      return permission.name === 'manage_contents'
    }) !== undefined;
  },
}

// 定义 actions
const actions = {
  async login ({ dispatch, commit }, params = {}) {
    const loginData = await wepy.wx.login()
    params.code = loginData.code

    const authResponse = await login(params)

    commit('setToken', authResponse.data)
    auth.setToken(authResponse.data)

    dispatch('getUser')
    dispatch('getUserPermissions')
  },

  async refresh ({ dispatch, commit, state }, params = {}) {
    const refreshResponse = await refresh(state.accessToken, {}, false)

    commit('setToken', refreshResponse.data)
    auth.setToken(refreshResponse.data)
  },

  async getUser ({ dispatch, commit }) {
    const userResponse = await getCurrentUser()

    commit('setUser', userResponse.data)
    auth.setUser(userResponse.data)
  },

  async getUserPermissions({commit}) {
    const permissions = await getUserPermissions()

    commit('setUserPermissions', permissions.data)
    auth.setPermissions(permissions.data)
  },

  async logout ({ commit, state }) {
    await logout(state.accessToken)

    // 清空 storage
    auth.logout()
    commit('resetState')
  },

  async register ({ dispatch, commit }, params = {}) {
    const loginData = await wepy.wx.login()
    params.code = loginData.code

    await register(params)
  },

  async updateUser ({ commit }, params = {}) {

    const editResponse = await updateUser(params)

    commit('setUser', editResponse.data)
    auth.setUser(editResponse.data)
  }
}

// 定义 mutations
const mutations = {
  setUser(state, user) {
    state.user = user
  },

  setToken(state, tokenPayload) {
    state.accessToken = tokenPayload.access_token
    state.accessTokenExpiredAt = new Date().getTime() + tokenPayload.expires_in * 1000
  },

  setUserPermissions(state, permissions) {
    state.permissions = permissions
  },

  resetState: (state) => {
    Object.assign(state, getDefaultState())
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
