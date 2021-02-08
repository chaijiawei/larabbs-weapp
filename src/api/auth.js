import { request } from '@/utils/request'

export function login(data) {
  return request('miniprogram/login', {
    method: 'post',
    data: data
  })
}

export function refresh(token) {
  return request('jwt_token', {
    method: 'put',
    header: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export function logout(token) {
  return request('jwt_token', {
    method: 'delete',
    header: {
      'Authorization': 'Bearer ' + token
    }
  })
}
