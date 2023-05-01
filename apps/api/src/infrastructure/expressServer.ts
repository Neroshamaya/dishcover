import express from 'express'
import container from './awilixContainer'
import * as conf from './configuration'
import cors from 'cors'
import bodyParser from 'body-parser'

import type AuthenticationController from '../application/controllers/AuthenticationController'
import type IngredientController from '../application/controllers/IngredientController'

import type ReceipeController from '../application/controllers/ReceipeController'

import responseHeaders from './expressMiddlewares/responseHeaders'
import logRequest from './expressMiddlewares/logRequest'
import { errorHandler } from './expressMiddlewares/errorHandler'
import jwtVerification from './expressMiddlewares/jwtVerification'
import jwt from 'jsonwebtoken'

const app = express()

const authenticationController: AuthenticationController = container.resolve(
  'authenticationController'
)
const receipeController: ReceipeController = container.resolve('receipeController')
const ingredientController: IngredientController = container.resolve('ingredientController')

app.use(bodyParser.json())
app.use(logRequest)
app.use(responseHeaders)

app.route('/login/password').post(async (req, res, next) => {
  try {
    const data = await authenticationController.login(req.body)
    res.send(data)
    res.end()
  } catch (err) {
    return next(err)
  }
})

app.route('/register/password').post(async (req, res, next) => {
  try {
    const data = await authenticationController.register(req.body)
    res.send(data)
    res.end()
  } catch (err) {
    return next(err)
  }
})

app.route('/receipes').post(jwtVerification, async (req, res, next) => {
  try {
    const data = await receipeController.createReceipe(req.body)
    res.status(201)
    res.send(data)
    res.end()
  } catch (err) {
    return next(err)
  }
})

app.route('/receipes').patch(jwtVerification, async (req, res, next) => {
  try {
    const data = await receipeController.updateReceipe(req.body)
    res.send(data)
    res.end()
  } catch (err) {
    return next(err)
  }
})

app.route('/receipes').delete(jwtVerification, async (req, res, next) => {
  try {
    await receipeController.deleteReceipe(req.body)
    res.send({ done: true })
    res.end()
  } catch (err) {
    return next(err)
  }
})

app.route('/receipes/personal').get(jwtVerification, async (req, res, next) => {
  try {
    const data = await receipeController.retrieveAllFromUser({ userId: req.user })
    res.send(data)
    res.end()
  } catch (err) {
    return next(err)
  }
})

app.route('/receipes/community').get(jwtVerification, async (req, res, next) => {
  try {
    const data = await receipeController.retrieveAllExceptFromUser({ userId: req.user })
    res.send(data)
    res.end()
  } catch (err) {
    return next(err)
  }
})

app.route('/ingredients').get(jwtVerification, async (req, res, next) => {
  try {
    const data = await ingredientController.retrieveAll()
    res.send(data)
    res.end()
  } catch (err) {
    return next(err)
  }
})

app.use(errorHandler)
app.listen(conf.port, () => {
  console.log(`Shoupifly web server listening on port ${conf.port}`)
})
