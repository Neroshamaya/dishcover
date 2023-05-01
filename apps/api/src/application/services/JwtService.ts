import jwt from 'jsonwebtoken'
import {tokenSecret} from '../../infrastructure/configuration'

export default class JwtService {
    generateToken(payload: Record<string, unknown>){
        return jwt.sign(payload, tokenSecret)
    }
    decodeToken(token: string){
        return jwt.verify(token, tokenSecret)
    }
}