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

export function getCaptcha(phone) {
  return request('captcha', {
    method: 'post',
    data: {
      phone: phone
    }
  })
}

export function getVerificationCode(phone, key, code) {
  return request('phone_code', {
    method: 'post',
    data: {
      phone: phone,
      captcha_key: key,
      captcha: code
    }
  })
}

export function register(data) {
  return request('miniprogram/users', {
    method: 'post',
    data: data
  })
}
