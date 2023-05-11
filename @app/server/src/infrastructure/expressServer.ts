import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Express } from 'express'
import helmet from 'helmet'

import type AuthenticationController from '../application/controllers/AuthenticationController'
import type IngredientController from '../application/controllers/IngredientController'
import type RecipeController from '../application/controllers/RecipeController'

import * as conf from './configuration'
import { localHostDynamicOrigin } from './corsOrigin'
import { apiKeyVerification } from './expressMiddlewares/apiKeyVerification'
import { errorHandler } from './expressMiddlewares/errorHandler'
import { jwtVerification } from './expressMiddlewares/jwtVerification'
import logRequest from './expressMiddlewares/logRequest'
import { AwilixContainer } from 'awilix'
import { exit } from 'process'

export class ExpressApplication {
  app: Express
  corsConf = {
    origin: localHostDynamicOrigin
  }
  constructor(awilixContainer: AwilixContainer) {
    this.app = express()
    const authenticationController: AuthenticationController = awilixContainer.resolve(
      'authenticationController'
    )
    const recipeController: RecipeController = awilixContainer.resolve('recipeController')

    const ingredientController: IngredientController =
      awilixContainer.resolve('ingredientController')
    this.app.use(cors(this.corsConf))

    this.app.use(helmet())

    this.app.use(bodyParser.json())
    this.app.use(logRequest)
    this.app.use(apiKeyVerification)

    this.app.route('/login/password').post(async (req, res, next) => {
      try {
        const data = await authenticationController.login(req.body)
        res.send(data)
        res.end()
      } catch (err) {
        return next(err)
      }
    })

    this.app.route('/register/password').post(async (req, res, next) => {
      try {
        const data = await authenticationController.register(req.body)
        res.send(data)
        res.end()
      } catch (err) {
        return next(err)
      }
    })

    this.app.route('/recipes').post(jwtVerification, async (req, res, next) => {
      try {
        const data = await recipeController.createRecipe(req.body)
        res.status(201)
        res.json(data)
        res.end()
      } catch (err) {
        return next(err)
      }
    })

    this.app.route('/recipes').patch(jwtVerification, async (req, res, next) => {
      try {
        const data = await recipeController.updateRecipe(req.body)
        res.json(data)
        res.end()
      } catch (err) {
        return next(err)
      }
    })

    this.app.route('/recipes').delete(jwtVerification, async (req, res, next) => {
      try {
        await recipeController.deleteRecipe(req.body)
        res.end()
      } catch (err) {
        return next(err)
      }
    })

    this.app.route('/recipes/personal').get(jwtVerification, async (req, res, next) => {
      try {
        const data = await recipeController.retrieveAllFromUser({
          userId: req.app.locals['userId']
        })
        res.json(data)
        res.end()
      } catch (err) {
        return next(err)
      }
    })

    this.app.route('/recipes/community').get(async (req, res, next) => {
      try {
        const data = await recipeController.retrieveAll()
        res.json(data)
        res.end()
      } catch (err) {
        return next(err)
      }
    })

    this.app.route('/ingredients').get(async (req, res, next) => {
      try {
        const data = await ingredientController.retrieveAll()
        res.json(data)
        res.end()
      } catch (err) {
        return next(err)
      }
    })

    this.app.route('/ingredients').post(jwtVerification, async (req, res, next) => {
      try {
        const data = await ingredientController.createIngredient(req.body)
        res.json(data)
        res.end()
      } catch (err) {
        return next(err)
      }
    })

    this.app.route('/ingredients').delete(jwtVerification, async (req, res, next) => {
      try {
        const data = await ingredientController.deleteIngredient(req.body)
        res.json(data)
        res.end()
      } catch (err) {
        return next(err)
      }
    })

    this.app.use(errorHandler)
  }
  start(port?: number): void {
    this.app.listen(port || conf.port, () => {
      console.log(`Dishcover backend server is listening on port ${conf.port}`)
    })
  }
}
