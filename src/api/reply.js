import { request, authRequest } from '@/utils/request'

export function getReplies(data) {
  return request('replies', {
    data: data
  })
}

export function createReply(data) {
  return authRequest('replies', {
    method: 'POST',
    data: data
  })
}
