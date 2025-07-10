import { HydratedDocument, InferRawDocType, Model, QueryWithHelpers, Schema, model } from 'mongoose'


type Price = {
  timestamp: number
  value: number
}

type HD = HydratedDocument<Price>
type Q = QueryWithHelpers<HD[], HD, PriceQueryHelpers>

interface PriceQueryHelpers {
  byPeriod(this: Q, startUNIX: number, endUNIX: number): Q
}


const def = {

  timestamp: {
    type: Number,
    required: true,
    index: { unique: true }
  },

  value: {
    type: Number,
    required: true
  }
} as const


type Mod = Model<Price, PriceQueryHelpers>
type PriceSchema = Schema<Price, Mod, {}, PriceQueryHelpers>

const schema: PriceSchema = new Schema(def)
schema.set('collection', 'prices-1hour')



export type HourPriceDocument =
  InferRawDocType<typeof def>


export const HourPrice: Mod = model('Price_1Hour', schema)
