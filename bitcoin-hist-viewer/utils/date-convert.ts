const dateFormat = 'dd-mm-yyyy'

// входной формат dd-mm-yyyy
export function dateFrom(dateStr: string, sep = '-'): Date {
  if (!isValidDate(dateStr, sep))
    throw Error(`требуемые форматы дат: ${dateFormat}`)

  const { fulldate } =
    parseDate(dateStr, sep)

  return fulldate
}


// выходной формат dd-mm-yyyy
export function dateToStr(dt: Date) {
  const y = dt.getUTCFullYear()
  const m = dt.getUTCMonth() + 1
  const d = dt.getUTCDate()
  const dd = (d < 10) ? ('0' + d) : String(d)
  const mm = (m < 10) ? ('0' + m) : String(m)
  return `${dd}-${mm}-${y}`
}

export function dateFromTimestampUNIX(ts: number) {
  const valueInMs = ts * 1000
  return new Date(valueInMs)
}

export function dateFromTimestampInMs(ts: number) {
  return new Date(ts)
}


export function getTimestampInMs(date: string, endOfDay = false) {
  const dt = dateFrom(date)
  if (endOfDay) {
    dt.setUTCHours(23)
    dt.setUTCMinutes(59)
    dt.setUTCSeconds(59)
  } else {
    dt.setUTCHours(0)
    dt.setUTCMinutes(0)
    dt.setUTCSeconds(0)
  }
  return dt.getTime()
}


export function addDaysToTimestampUNIX(timestamp: number, days: number) {
  const d = Math.floor(days)
  if (d <= 0) throw Error('неверный аргумент "days"')
  return timestamp + (d * secInDay)
}

const secInDay = 24 * 60 * 60


export function isValidDate(dateStr: string, sep = '-') {
  const parts = dateStr.split(sep)

  if (parts.length !== 3)
    return false

  const { fulldate: date, year, month, day } =
    parseDate(dateStr, sep)

  return date.getUTCFullYear() === year
    && date.getUTCMonth() === month
    && date.getUTCDate() === day
}


function parseDate(dateStr: string, sep = '-') {
  const parts = dateStr.split(sep)
  const year = parseInt(parts[2])
  const month = parseInt(parts[1]) - 1
  const day = parseInt(parts[0])
  const fulldate = new Date()
  fulldate.setUTCDate(day)
  fulldate.setUTCMonth(month)
  fulldate.setUTCFullYear(year)
  return { fulldate, year, month, day }
}
