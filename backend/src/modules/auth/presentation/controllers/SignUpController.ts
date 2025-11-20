import { forbidden, noContent } from "@/shared/helpers/HttpHelpers"
import { HttpRequest, HttpResponse } from "@/shared/protocols/http"
import { ICreateUser } from "@/modules/users/application/ports/ICreateUser"
import { NameAlreadyInUse } from "@/shared/errors/NameAlreadyInUse"
import { IController } from "@/shared/protocols/controller"
import { Validation } from "@/shared/protocols/Validation"

export interface SignUpRequest {
  nome: string
  senha: string
}

export class SignUpController
  implements IController<HttpRequest<SignUpRequest>, null>
{
  constructor(
    private readonly createUser: ICreateUser,
    private readonly validation: Validation<SignUpRequest>,
  ) {}

  async handle(
    request: HttpRequest<SignUpRequest>,
  ): Promise<HttpResponse<null | Error>> {
    const error = this.validation.validate(request.body)
    if (error) {
      return forbidden(error)
    }
    const { nome, senha } = request.body
    const isValid = await this.createUser.execute({ nome, senha })
    if (!isValid) {
      return forbidden(new NameAlreadyInUse())
    }
    return noContent()
  }
}
