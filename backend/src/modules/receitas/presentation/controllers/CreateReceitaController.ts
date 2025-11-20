import { HttpRequest, HttpResponse } from "@/shared/protocols/http"
import { ICreateRecipe } from "../../application/ports/ICreateRecipe"
import { IController } from "@/shared/protocols/controller"
import { noContent, serverError } from "@/shared/helpers/HttpHelpers"

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
  constructor(private readonly createReceitaUseCase: ICreateRecipe) {}

  async handle(
    request: HttpRequest<CreateReceitaRequest>,
  ): Promise<HttpResponse<null | Error>> {
    try {
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
      return serverError(error as Error)
    }
  }
}
