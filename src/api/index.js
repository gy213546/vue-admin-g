import request from '@/utils/system/request'
import qs from 'qs'
const scope = 'server'
export function getMenu(id) {
  return request({
    url: '/admin/menu',
    params: { parentId: id },
    method: 'get'
  })
}

export const getUserInfo = () => {
  return request({
    url: '/admin/user/info',
    method: 'get'
  })
}

export const refreshToken = (refresh_token) => {
  const grant_type = 'refresh_token'
  return request({
    url: '/auth/oauth/token',
    headers: {
      'isToken': false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cmVzZXJ2b2lyOnJlc2Vydm9pcg=='
    },
    method: 'post',
    params: { refresh_token, grant_type, scope }
  })
}

export const loginByUsername = (username, password, code, randomStr) => {
  let grant_type = 'password'
  let dataObj = qs.stringify({'username': username, 'password': password})

  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      'TENANT-ID': '1',
      'Authorization': 'Basic cmVzZXJ2b2lyOnJlc2Vydm9pcg=='
    },
    method: 'post',
    params: {randomStr, code, grant_type},
    data: dataObj
  })
}

export const logout = () => {
  return request({
    url: '/auth/token/logout',
    method: 'delete'
  })
}