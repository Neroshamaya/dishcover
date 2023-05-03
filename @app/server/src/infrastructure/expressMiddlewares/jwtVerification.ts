import express, { Request, Response, NextFunction, RequestHandler } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { tokenSecret } from '../configuration'
import { z } from 'zod'

const decodedTokenSchema = z.object({
  email: z.string().email(),
  id: z.string(),
  iat: z.number()
})

export const jwtVerification: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

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
