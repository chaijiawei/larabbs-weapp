import { request } from '@/utils/request'

export function login(data) {
  return request('miniprogram/login', {
    method: 'post',
    data: data
  })
}
