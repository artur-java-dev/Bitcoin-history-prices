const dateFormats = 'dd-mm-yyyy, dd/mm/yyyy, dd mm yyyy'


// выходной формат dd-mm-yyyy
export function dateToStr(dt: Date, sep = '-') {
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()
  const dd = (d < 10) ? ('0' + d) : String(d)
  const mm = (m < 10) ? ('0' + m) : String(m)
  return `${dd}${sep}${mm}${sep}${y}`
}


export function dateFrom(dateStr: string, sep = '-') {
  if (!isValidDate(dateStr, sep))
    throw Error(`требуемые форматы дат: ${dateFormats}`)

  const { fulldate } =
    parseDate(dateStr, sep)

  return fulldate
}


export function dateFromTimestampUNIX(ts: number) {
  const valueInMs = ts * 1000
  return new Date(valueInMs)
}


export function getTimestampUNIX(date: string, endOfDay = false) {
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
  const millisec = dt.getTime()
  return Math.floor(millisec / 1000)
}


export function addDaysToTimestampUNIX(timestamp: number, days: number) {
  const d = Math.floor(days)
  if (d <= 0) throw Error('неверный аргумент "days"')
  return timestamp + (d * secInDay)
}

const secInDay = 24 * 60 * 60


// входной формат dd-mm-yyyy
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
