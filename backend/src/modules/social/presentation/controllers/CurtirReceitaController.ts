import { IController } from "@/shared/protocols/controller"
import { HttpRequest, HttpResponse } from "@/shared/protocols/http"
import { ICurtirReceita } from "../../application/ports/ICurtirReceita"
import {
  badRequest,
  noContent,
  serverError,
} from "@/shared/helpers/HttpHelpers"
import { InvalidParamError } from "@/shared/errors/InvalidParamError"
import { ReceitaJaCurtidaError } from "@/shared/errors/ReceitaJaCurtidaError"

export interface CurtirReceitaRequest {
  receitaId: number
  autorId: number
}

export class CurtirReceitaController
  implements IController<HttpRequest<CurtirReceitaRequest>, null>
{
  constructor(private readonly curtirReceita: ICurtirReceita) {}

  async handle(
    request: HttpRequest<CurtirReceitaRequest>,
  ): Promise<HttpResponse<null | Error>> {
    try {
      let autorId = request.userId
      let receitaId = request?.params?.receitaId

      if (!autorId) {
        throw new InvalidParamError("userId")
      }

      if (!receitaId) {
        throw new InvalidParamError("receitaId")
      }

      receitaId = Number(receitaId)
      autorId = Number(autorId)

      const result = await this.curtirReceita.execute({
        autorId,
        receitaId,
      })

      if (result) {
        return noContent()
      }

      return badRequest(new Error("Não foi possível curtir a receita."))
    } catch (error) {
      if (error instanceof ReceitaJaCurtidaError) {
        return badRequest(error)
      }
      if (error instanceof InvalidParamError) {
        return badRequest(error)
      }
      return serverError(error as Error)
    }
  }
}
