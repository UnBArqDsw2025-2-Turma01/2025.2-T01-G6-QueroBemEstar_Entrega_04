import jwt, { Secret, SignOptions } from "jsonwebtoken"
import {
  ITokenGenerator,
  ITokenPayload,
} from "@/modules/auth/application/protocols/ITokenGenerator"
import env from "@/main/config/env"

export class JwtAdapter implements ITokenGenerator {
  private readonly secret: Secret = env.jwt_secret
  private readonly expiresIn: number = 8 * 60 * 60 // 8 horas

  generate(payload: ITokenPayload): string {
    const options: SignOptions = { expiresIn: this.expiresIn }
    return jwt.sign(payload, this.secret, options)
  }

  verify(token: string): ITokenPayload {
    return jwt.verify(token, this.secret) as ITokenPayload
  }
}
