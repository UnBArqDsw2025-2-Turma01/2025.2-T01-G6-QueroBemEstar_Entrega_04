import { forbidden, noContent } from "@/shared/helpers/HttpHelpers"
import { HttpResponse } from "@/shared/protocols/http"
import { ICreateUser } from "@/modules/users/application/ports/ICreateUser"
import { NameAlreadyInUse } from "@/shared/errors/NameAlreadyInUse"
import { IController } from "@/shared/protocols/controller"

export interface SignUpRequest {
  body: {
    nome: string
    senha: string
  }
  params: Record<string, unknown>
}

export class SignUpController implements IController<SignUpRequest, null> {
  constructor(private createUser: ICreateUser) { }

  async handle(request: SignUpRequest): Promise<HttpResponse<null | Error>> {
    const { nome, senha } = request.body
    const isValid = await this.createUser.execute({ nome, senha })
    if (!isValid) {
      return forbidden(new NameAlreadyInUse())
    }
    return noContent()
  }
}
