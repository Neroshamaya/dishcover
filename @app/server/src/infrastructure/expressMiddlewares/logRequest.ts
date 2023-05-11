import type { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  console.log('-----')
  console.log(`${req.method} ${req.path}`)
  console.log('Request Info:')
  console.log(`Headers: ${JSON.stringify(req.headers, null, 2)}`)
  console.log(`Params: ${JSON.stringify(req.params, null, 2)}`)
  console.log(`Query: ${JSON.stringify(req.query)}`)
  console.log(`Body: ${JSON.stringify(req.body, null, 2)}`)
  next()
}
