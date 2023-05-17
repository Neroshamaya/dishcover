export const localHostDynamicOrigin = (
  requestOrigin: string | undefined,
  callback: (err: Error | null, origin?: boolean) => void
) => {
  if (requestOrigin) {
    const regex = new RegExp(/http:\/\/localhost.*/)
    if (requestOrigin && regex.test(requestOrigin)) {
      callback(null, true)
      return
    }
  }
  callback(new Error('Not allowed by CORS'))
}
