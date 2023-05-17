import jwt from 'jsonwebtoken'

import { IJwtService } from '@/domain/types/IJwtService'

import { tokenSecret } from '../../infrastructure/configuration'

export default class JwtService implements IJwtService {
  generateToken(payload: Record<string, unknown>) {
    return jwt.sign(payload, tokenSecret)
  }
  decodeToken(token: string) {
    return jwt.verify(token, tokenSecret)
  }
}
