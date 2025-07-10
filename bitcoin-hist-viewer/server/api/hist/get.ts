import { histPricesRepository } from '~/server/repo/hist-prices-repo'
import { HourPriceDocument } from '~/server/db/data-model'
import { isNotExists } from '~/server/utils/common-funcs'
import { serverError } from '~/server/utils/err-utils'
import { Price } from '~/utils/types-common'


export default eventHandler(async (event) => {
  const query = getQuery<PeriodFilter>(event)

  const prices =
    await histPricesRepository.getAll({
      startDate: query.startDate,
      endDate: query.endDate
    })

  if (isNotExists(prices))
    return serverError()

  return {
    success: true,
    prices: docsToDto(prices)
  } as Dto
})


// параметры с датами должны быть в формате dd-mm-yyyy
export type PeriodFilter = {
  startDate: string
  endDate: string
}

export type Dto = {
  success: boolean
  prices: Price[]
}


function docsToDto(docs: HourPriceDocument[]): Price[] {
  return docs.map(x => [x.timestamp, x.value])
}
