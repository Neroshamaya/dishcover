import * as dotenv from 'dotenv'
dotenv.config()

export default {
    port: process.env.WEBSERVER_PORT
}