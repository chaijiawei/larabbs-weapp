import moment from 'moment'
import 'moment/locale/zh-cn'

export function diffForHumans(date) {
  moment.locale('zh-cn')
  return moment(date).fromNow()
}
