import * as dotenv from 'dotenv'
dotenv.config()

export const port = process.env.WEBSERVER_PORT || 3001
export const tokenSecret= process.env.TOKEN_SECRET || ''