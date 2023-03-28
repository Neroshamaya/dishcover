import type {Request, Response, NextFunction} from 'express'

export default (req: Request, res: Response, next:NextFunction) => {
    //res.setHeader('access-control-allow-origin', 'null')
    res.setHeader('access-control-allow-origin', '*')
    next()
}