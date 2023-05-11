import { ExpressApplication } from './expressServer'
import container from './awilixContainer'
new ExpressApplication(container).start()
