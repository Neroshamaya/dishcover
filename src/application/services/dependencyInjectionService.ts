import * as awilix from 'awilix'
import { PrismaClient } from '@prisma/client'

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
}).register({
    PrismaClient: awilix.asClass(PrismaClient)
})

export default container.cradle