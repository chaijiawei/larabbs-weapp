import { authRequest } from '@/utils/request'

export function getNotificationStats() {
  return authRequest('notifications/stats')
}

export function getNotifications() {
  return authRequest('notifications')
}

export function readNotifications() {
  return authRequest('notifications/mark_read', {
    method: 'put'
  })
}
