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

export function deleteReply(replyId) {
  return authRequest(`replies/${replyId}`, {
    method: 'DELETE',
  })
}
