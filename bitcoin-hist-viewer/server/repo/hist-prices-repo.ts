import { HourPrice, HourPriceDocument } from '~/server/db/data-model'
import { FilterQuery, FlattenMaps, QueryOptions } from 'mongoose'
import { isNotExists } from '~/server/utils/common-funcs'
import { getTimestampInMs } from '~/utils/date-convert'


class HistPricesRepository {

  private readonly model = HourPrice

  constructor() {
  }


  async getAll(period: Period, opts: QueryOptions = {})
    : Promise<FM[] | undefined> {

    const st = getTimestampInMs(period.startDate)
    const end = getTimestampInMs(period.endDate, true)

    try {

      if (isNotExists(opts.sort))
        opts.sort = {
          timestamp: 1
        }

      const result =
        await this.model
          .find({}, null, opts)
          .where('timestamp').gte(st).lte(end)
          .lean()
          .exec()

      console.log(result)
      return result

    } catch (e) {
      console.error("Ошибка поиска записей:", e)
    }
  }

}


type FM = FlattenMaps<HourPriceDocument>


export type Period = {
  startDate: string
  endDate: string
}


export const histPricesRepository = new HistPricesRepository
