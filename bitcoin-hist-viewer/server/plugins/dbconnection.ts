import mongoose from 'mongoose'


export default async () => {
  const config = useRuntimeConfig()
  const uri = config.mongoDbUri

  try {
    await mongoose.connect(uri)
    console.log('Подключение к MongoDB установлено')

  } catch (err) {
    console.error('Не удалось подключиться к MongoDB', err)
  }
}
