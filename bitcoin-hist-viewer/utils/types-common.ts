export type Price = [
  timestamp: Timestamp,
  value: number
]

type Timestamp = number


export function isStr(value: unknown): value is string {
  return typeof value === 'string'
}
