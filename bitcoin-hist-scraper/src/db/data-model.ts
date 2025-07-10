import { Schema, model } from 'mongoose'


const bitcoinHourPriceSchema = new Schema({
  timestamp: {
    type: Number,
    required: true,
    index: { unique: true },
  },

  value: {
    type: Number,
    required: true
  },
})

bitcoinHourPriceSchema.set('autoCreate', true)
bitcoinHourPriceSchema.set('collection', 'prices-1hour')


export const HourPrice = model(
  'Price_1Hour',
  bitcoinHourPriceSchema)
