import express from 'express'
import container from './diContainer'
import conf from './configuration'

import type ProductController from '../application/controllers/ProductController'

import responseHeaders from './expressMiddlewares/responseHeaders'
import logRequest from './expressMiddlewares/logRequest'

const app = express()

// HEADER MIDDLEWARE
app.use(responseHeaders)
app.use(logRequest)

const productController: ProductController = container.resolve('productController')

app.use(express.static('front'))


app.route('/products')
    .get(async (req, res) => {
        const data = await productController.list()
        res.send(data)
        res.end()
    })

app.listen(conf.webserver.port, () => {
    console.log(`Shoupifly web server listening on port ${conf.webserver.port}`)
})
