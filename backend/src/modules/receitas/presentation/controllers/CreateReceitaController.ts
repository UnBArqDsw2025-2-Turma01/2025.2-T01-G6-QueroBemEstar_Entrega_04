import { HttpRequest, HttpResponse } from "@/shared/protocols/http"
import { ICreateRecipe } from "../../application/ports/ICreateRecipe"
import { IController } from "@/shared/protocols/controller"
import {
  badRequest,
  noContent,
  serverError,
} from "@/shared/helpers/HttpHelpers"
import { Validation } from "@/shared/protocols/Validation"
import { InvalidParamError } from "@/shared/errors/InvalidParamError"

export interface CreateReceitaRequest {
  titulo: string
  descricao: string
  ingredientes: string[]
  modoPreparo: string
  fotoUrl: string
}

export class CreateReceitaController
  implements IController<HttpRequest<CreateReceitaRequest>, null>
{
  constructor(
    private readonly createReceitaUseCase: ICreateRecipe,
    private readonly validator: Validation<CreateReceitaRequest>,
  ) {}

  async handle(
    request: HttpRequest<CreateReceitaRequest>,
  ): Promise<HttpResponse<null | Error>> {
    try {
      const error = this.validator.validate(request.body)
      if (error) {
        return badRequest(error)
      }

      const { titulo, descricao, ingredientes, modoPreparo, fotoUrl } =
        request.body

      const userId = request.userId

      if (!userId) {
        return { statusCode: 401, body: new Error("Usuário não autenticado.") }
      }

      await this.createReceitaUseCase.execute(
        {
          titulo,
          descricao,
          ingredientes,
          modoPreparo,
          fotoUrl,
        },
        userId,
      )

      return noContent()
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return badRequest(error)
      }
      return serverError(error as Error)
    }
  }
}
