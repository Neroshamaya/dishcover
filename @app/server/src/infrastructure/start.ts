import container from './awilixContainer'
import { ExpressApplication } from './expressServer'
new ExpressApplication(container).start()
