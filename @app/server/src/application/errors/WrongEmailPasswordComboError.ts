import {ZodError} from 'zod'
import { Prisma } from '@prisma/client'

export default class WrongEmailPasswordComboError implements Error {
    public name = 'WrongEmailPasswordComboError'
    public status = 401
    public message
    constructor(error: Error){
        this.message = error.message
    }
}