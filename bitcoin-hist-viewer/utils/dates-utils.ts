export type DateRange = {
  startDate: Date
  endDate: Date
}

export function dateRange(dates: [Date, Date]): DateRange {
  return {
    startDate: startOfDate(dates[0]),
    endDate: endOfDate(dates[1])
  }
}

export type MonthYear = {
  month: number
  year: number
}

export type SingleDay = {
  day: number
  month: number
  year: number
}



export function currentYear() {
  return new Date().getFullYear()
}

export function currentMonth() {
  return new Date().getMonth()
}

export function currentDayOfMonth() {
  return new Date().getDate()
}

export function currentWeekRange(): [Date, Date] {
  const dt = currentDate()
  return [
    getMonday(dt),
    getSunday(dt)]
}

export function currentDate(): Date {
  return new Date(currentTimestamp())
}


export function getMonday(dt: Date) {
  const first = dt.getDate() - dt.getDay() + 1
  const copy = new Date(dt)
  copy.setDate(first)
  return setBeginningOfDay(copy)
}

export function getSunday(dt: Date) {
  const sunday = new Date(getMonday(dt))
  sunday.setDate(sunday.getDate() + 6)
  return setBeginningOfDay(sunday)
}


export function setEndOfDay(dt: Date) {
  dt.setUTCHours(23, 59, 59, 999)
  return dt
}

export function setBeginningOfDay(dt: Date) {
  dt.setUTCHours(0, 0, 0, 0)
  return dt
}


export function currentTimestamp() {
  return Date.now()
}

export function getMonthNum(dt: Date) {
  return dt.getMonth() + 1
}

export function firstDayOfYear(year: number) {
  return startOfDay(1, 0, year)
}

export function lastDayOfYear(year: number) {
  return endOfDay(31, 11, year)
}

export function firstDayOfMonth(month: number, year: number) {
  return startOfDay(1, month, year)
}

export function lastDayOfMonth(month: number, year: number) {
  const dt = new Date(year, month + 1, 0)
  return endOfDay(dt.getDate(), dt.getMonth(), dt.getFullYear())
}

export function startOfDate(dt: Date) {
  return startOfDay(dt.getDate(), dt.getMonth(), dt.getFullYear())
}

export function endOfDate(dt: Date) {
  return endOfDay(dt.getDate(), dt.getMonth(), dt.getFullYear())
}

export function startOfDay(day: number, month: number, year: number) {
  const dt = new Date()
  dt.setUTCFullYear(year)
  dt.setUTCMonth(month)
  dt.setUTCDate(day)
  return setBeginningOfDay(dt)
}

export function endOfDay(day: number, month: number, year: number) {
  const dt = new Date()
  dt.setUTCFullYear(year)
  dt.setUTCMonth(month)
  dt.setUTCDate(day)
  return setEndOfDay(dt)
}


export function getYearRange(year: number): DateRange {
  return {
    startDate: firstDayOfYear(year),
    endDate: lastDayOfYear(year)
  }
}

export function getMonthRange(month: MonthYear): DateRange {
  return {
    startDate: firstDayOfMonth(month.month, month.year),
    endDate: lastDayOfMonth(month.month, month.year)
  }
}

export function getSingleDayRange(day: SingleDay): DateRange {
  return {
    startDate: startOfDay(day.day, day.month, day.year),
    endDate: endOfDay(day.day, day.month, day.year)
  }
}
