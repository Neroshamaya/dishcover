import express from 'express'
import container from '../../application/services/dependencyInjectionService'
import type ProductController from '../../application/controllers/ProductController'

const app = express()
const productController: ProductController = container.productController


app.route('/products')
    .get((req, res) => {
        res.send(productController.list(req))
    })