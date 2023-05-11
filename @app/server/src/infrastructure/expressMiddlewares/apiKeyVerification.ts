import { RequestHandler } from 'express'

import apiKeys from '../security/apiKeys'

export const apiKeyVerification: RequestHandler = (req, res, next) => {
  const apiKey = req.headers['x-api-key']
  if (!apiKey) {
    return res.status(401).send('Unauthorized')
  }
  if (apiKeys.find((entry) => entry.key === apiKey)) {
    return next()
  }
  return res.status(401).send('Unauthorized')
}
