import jwt from 'jsonwebtoken'

import { tokenSecret } from '../../infrastructure/configuration'
import { IJwtService } from '@/domain/types/IJwtService'

export default class JwtService implements IJwtService {
  generateToken(payload: Record<string, unknown>) {
    return jwt.sign(payload, tokenSecret)
  }
  decodeToken(token: string) {
    return jwt.verify(token, tokenSecret)
  }
}
