import { pricesCollector as collector } from './data-collector'
import { saveManyToDb } from './data-saver'
import { connectToDB } from './db/connection'
import { isNotExists } from './utils/common'


class AppService {

  private initCompleted = false

  constructor() { }

  async init() {
    await connectToDB()
    this.initCompleted = true
  }


  async run(from: string, to?: string) {
    if (!this.initCompleted)
      throw Error('сервис не инициализирован')

    await this.doWork(from, to)

    console.log('сервис завершил работу успешно!')
  }


  private async doWork(from: string, to?: string) {

    const data = (isNotExists(to)) ?
      await collector.getFor90Days(from)
      : await collector.getForPeriod(from, to)

    if (isNotExists(data))
      throw Error('данные не получены')

    await saveManyToDb(data)
  }

}


export const appService = new AppService
