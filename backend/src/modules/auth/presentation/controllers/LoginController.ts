import { HttpRequest, HttpResponse } from "@/shared/protocols/http"
import { Validation } from "@/shared/protocols/Validation"
import { ILoginUser, LoginUserOutput } from "../../application/ports/ILoginUser"
import { IController } from "@/shared/protocols/controller"
import { badRequest, ok, serverError } from "@/shared/helpers/HttpHelpers"
import { InvalidParamError } from "@/shared/errors/InvalidParamError"

export interface LoginRequest {
  nome: string
  senha: string
}

export class LoginController
  implements IController<HttpRequest<LoginRequest>, LoginUserOutput>
{
  constructor(
    private readonly loginUser: ILoginUser,
    private readonly validation: Validation<LoginRequest>,
  ) {}

  async handle(
    request: HttpRequest<LoginRequest>,
  ): Promise<HttpResponse<LoginUserOutput | Error>> {
    try {
      const error = this.validation.validate(request.body)
      if (error) {
        return badRequest(error)
      }

      const { nome, senha } = request.body

      const output = await this.loginUser.execute({ nome, senha })

      if (output) {
        return ok<LoginUserOutput>(output)
      }

      return badRequest(new Error("Erro ao realizar login"))
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return badRequest(error)
      }
      return serverError(error as Error)
    }
  }
}
