import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { tokenSecret } from '../configuration'

const decodedTokenSchema = z.object({
  email: z.string().email(),
  id: z.string(),
  iat: z.number()
})

export const jwtVerification: RequestHandler = (req, res, next) => {
  const token = req.headers['x-access-token'] as string

  if (!token) {
    return res.status(401).send('Unauthorized')
  }
  try {
    const decoded = jwt.verify(token, tokenSecret)
    const payload = decodedTokenSchema.parse(decoded)
    req.app.locals['userId'] = payload.id
    next()
  } catch (err) {
    return res.status(401).send('Unauthorized')
  }
}
