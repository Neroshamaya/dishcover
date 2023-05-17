import type jwt from 'jsonwebtoken'
export interface IJwtService {
  generateToken(payload: Record<string, unknown>): string
  decodeToken(token: string): string | jwt.JwtPayload
}
