// const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
class timeProcess {
  formatUtcString(utcString: string, formate = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs.utc(utcString).format(formate)
  }
}
export default new timeProcess()
const formatUtcString = function (
  utcString: string,
  formate = 'YYYY-MM-DD HH:mm:ss'
) {
  return dayjs.utc(utcString).utcOffset(8).format(formate)
}
export { formatUtcString }
