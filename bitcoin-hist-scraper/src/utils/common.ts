export function isNotExists(val: unknown): val is null | undefined {
  return val === null || val === undefined
}


export function closeApp() {
  process.exit(0)
}
