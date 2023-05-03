import type {Request, Response, NextFunction} from 'express'

export default (req: Request, res: Response, next:NextFunction) => {
    console.log('-----')
    console.log(`${req.method} ${req.path}`)
    console.log(`params: ${JSON.stringify(req.params)}`)
    console.log(`query: ${JSON.stringify(req.query)}`)
    console.log(`body: ${JSON.stringify(req.body)}`)
    next()
}