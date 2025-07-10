import mongoose from 'mongoose'
import { config } from 'dotenv'
import { closeApp, isNotExists } from '../utils/common'


config()

const uri = process.env.MONGODB_URI


export async function connectToDB() {
  try {

    if (isNotExists(uri))
      throw Error('не задана строка подключения в .env')

    await mongoose.connect(uri)

    console.log('Подключение к MongoDB установлено')

  } catch (err) {
    console.error('Не удалось подключиться к MongoDB', err)
  }
}


export async function disconnectFromDB() {
  await mongoose.connection.close(true)
  console.log('Подключение к MongoDB закрыто')
}


mongoose.connection.on('error', err => {
  console.error('[MongoDB] ошибка:', err)
})

const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT']

async function close() {
  await disconnectFromDB()
  closeApp()
}

signals.forEach(sig => {
  process.on(sig, close)
})
