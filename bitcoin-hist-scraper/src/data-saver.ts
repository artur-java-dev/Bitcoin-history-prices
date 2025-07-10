import { HourPrice } from './db/data-model'
import { Price } from './utils/types'
import fs from 'fs'


export async function saveToDb(data: Price) {
  try {
    const rec = new HourPrice({
      timestamp: data[0],
      value: data[1]
    })

    await rec.save()

  } catch (err) {
    console.error('Не удалось сохранить в БД:', err)
  }
}


export async function saveManyToDb(data: Price[]) {
  const docs = data.map(x =>
    new HourPrice({
      timestamp: x[0],
      value: x[1]
    }))

  const opts = {
    rawResult: true, lean: true
  }

  try {
    await HourPrice.insertMany(docs, opts)
    console.log('сохранение прошло успешно')
  } catch (e) {
    console.error('Не удалось сохранить в БД:', e)
  }
}


const prettyPrintedJson = true
const encodingJson = "utf-8"
const pathJson = './data/fetched-prices.json'


export function saveJsonToFile(data: Price[], path = pathJson) {
  const jsonData = prettyPrintedJson ?
    JSON.stringify(data, null, 2)
    : JSON.stringify(data)

  try {
    fs.writeFileSync(path,
      jsonData,
      { encoding: encodingJson })

    console.log('JSON сохранен успешно')

  } catch (err) {
    console.error('Не удалось записать JSON:', err)
  }
}

export function loadJson(path = pathJson) {
  try {
    const json = fs.readFileSync(path,
      { encoding: encodingJson })

    const obj = JSON.parse(json)
    return obj

  } catch (err) {
    console.error('Не удалось загрузить JSON:', err)
  }
}
