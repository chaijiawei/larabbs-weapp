import { authRequest } from '@/utils/request'

export function getNotificationStats() {
  return authRequest('notifications/stats')
}
