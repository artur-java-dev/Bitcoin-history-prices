import CoinGecko from 'coingecko-api'
import { addDaysToTimestampUNIX, dateToStr, getTimestampUNIX } from './utils/date-convert'
import { Price } from './utils/types'


const apiClient = new CoinGecko()
const coinId = 'bitcoin'
const currency = 'usd'
const dateFormat = 'dd-mm-yyyy'


type DateStr = string


class PricesCollector {

  async getFor90Days(from: DateStr) {
    try {
      const res =
        await fetchByDays(from, maxPeriodInDays)
      return res

    } catch (error) {
      console.error(error)
    }
  }


  async getForPeriod(from: DateStr, to: DateStr) {
    try {

      const fromTS = getTimestampUNIX(from)
      const toTS = getTimestampUNIX(to, true)

      checkPeriod(fromTS, toTS)

      const resp =
        await fetchByPeriod(coinId,
          { vs_currency: currency, from: fromTS, to: toTS })

      const prices = resp.data.prices
      return prices as Price[]

    } catch (error) {
      console.error(error)
    }
  }


  async getForSingleDate(date: Date) {
    try {
      const strdate = dateToStr(date)
      const resp = await fetchByDate(coinId, { date: strdate })
      const price = resp.data.market_data.current_price
      const res = price[currency]
      console.log(res)
      return res

    } catch (error) {
      console.error(error)
    }
  }

}


const fetchByDate = apiClient.coins.fetchHistory
const fetchByPeriod = apiClient.coins.fetchMarketChartRange
const minPeriodInDays = 1
const maxPeriodInDays = 90
const secInDay = 24 * 3600
const minPeriodInSec = minPeriodInDays * secInDay
const maxPeriodInSec = maxPeriodInDays * secInDay


function checkPeriod(fromUNIX: number, toUNIX: number) {
  if (fromUNIX >= toUNIX)
    throw Error('левая граница периода превышает правую')

  const span = toUNIX - fromUNIX

  if (span < minPeriodInSec || span > maxPeriodInSec)
    throw Error(`период должен быть в пределах
                ${minPeriodInDays}-${maxPeriodInDays} дней`)
}


async function fetchByDays(from: string, days: number) {
  const fromTS = getTimestampUNIX(from)
  const toTS = addDaysToTimestampUNIX(fromTS, days)

  const resp = await fetchByPeriod(coinId,
    { vs_currency: currency, from: fromTS, to: toTS })

  if (!resp.success) {
    console.error(resp.message)
    return
  }

  return resp.data.prices as Price[]
}


export const pricesCollector = new PricesCollector
