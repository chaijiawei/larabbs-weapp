import { request, authRequest } from '@/utils/request'

export function getReplies(data) {
  return request('replies', {
    data: data
  })
}
