import { ISearchUserRepository } from "@/modules/users/application/repositories/ISearchUserRepository"
import { HttpResponse } from "../protocols/http"
import {
  forbidden,
  ok,
  serverError,
  unauthorized,
} from "../helpers/HttpHelpers"
import { AccessDeniedError } from "../errors/AccessDenied"
import { ITokenGenerator } from "@/modules/auth/application/protocols/ITokenGenerator"
import { Middleware } from "../protocols/Middleware"
import { JsonWebTokenError } from "jsonwebtoken"

export interface AuthRequest {
  accessToken?: string
}

export class AuthMiddleware
  implements Middleware<unknown, { userId: number } | Error>
{
  constructor(
    private readonly searchUserByName: ISearchUserRepository,
    private readonly tokenVerifier: ITokenGenerator,
  ) {}

  async handle(
    request: unknown,
  ): Promise<HttpResponse<{ userId: number } | Error>> {
    try {
      const authRequest = request as AuthRequest
      const { accessToken } = authRequest

      if (!accessToken) {
        return forbidden(new AccessDeniedError())
      }

      const token = accessToken.replace("Bearer ", "")

      const decoded = this.tokenVerifier.verify(token)

      if (!decoded) {
        return unauthorized()
      }

      const account = await this.searchUserByName.findByName(decoded.userName)

      if (account && account.id) {
        return ok({ userId: account.id })
      }

      return forbidden(new AccessDeniedError())
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return unauthorized()
      }
      return serverError(error as Error)
    }
  }
}
