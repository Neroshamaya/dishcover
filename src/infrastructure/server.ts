import express from 'express'
import container from './diContainer'
import conf from './configuration'

import type ProductController from '../application/controllers/ProductController'

const app = express()


const productController: ProductController = container.resolve('productController')

app.route('/products')
    .get(async (req, res) => {
        const data = await productController.list(req)
        res.send(data)
        res.end()
    })
app.listen(conf.webserver.port, () => {
    console.log(`Shoupifly web server listening on port ${conf.webserver.port}`)
})