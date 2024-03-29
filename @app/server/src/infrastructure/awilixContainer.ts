import { PrismaClient } from '@prisma/client'
import * as awilix from 'awilix'

const container = awilix
  .createContainer()
  .loadModules(['./application/**/*.ts'], {
    cwd: `${__dirname}/..`,
    formatName: 'camelCase',
    resolverOptions: {
      register: awilix.asClass,
      injectionMode: awilix.InjectionMode.CLASSIC
    }
  })
  .register({
    prismaClient: awilix.asValue(new PrismaClient())
  })
export default container
