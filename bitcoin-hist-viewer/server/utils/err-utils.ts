export function errMessage(e: unknown): string {
  if (e instanceof Error)
    return e.message

  if (typeof e === "string")
    return e

  return String(e)
}


export function badRequest(errCause: unknown) {
  const msg = errMessage(errCause)

  const err = createError({
    statusCode: 400,
    statusMessage: msg
  })

  return err
}


export function serverError(msg?: string) {
  return createError({
    statusCode: 500,
    statusMessage: msg ?? 'Internal server error'
  })
}
