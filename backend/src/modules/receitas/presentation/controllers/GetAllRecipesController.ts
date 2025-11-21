import { IController } from "@/shared/protocols/controller"
import { HttpResponse, HttpRequest } from "@/shared/protocols/http"
import { IGetAllRecipes } from "../../application/ports/IGetAllRecipes"
import { ok, badRequest, serverError } from "@/shared/helpers/HttpHelpers"
import {
  SanitizationHelpers,
  SanitizedRecipe,
} from "@/shared/helpers/SanitizationHelpers"
import { PaginatedResult } from "@/shared/protocols/pagination"

export interface PaginationQuery {
  page?: string | number
  limit?: string | number
}

export class GetAllRecipesController
  implements
    IController<HttpRequest<PaginationQuery>, PaginatedResult<SanitizedRecipe>>
{
  private readonly DEFAULT_PAGE = 1
  private readonly DEFAULT_LIMIT = 10
  private readonly MAX_LIMIT = 30

  constructor(private readonly getAllRecipes: IGetAllRecipes) {}

  async handle(
    request: HttpRequest<PaginationQuery>,
  ): Promise<HttpResponse<PaginatedResult<SanitizedRecipe> | Error>> {
    try {
      const page = this.getPageParam(request?.query?.page)
      const limit = this.getLimitParam(request?.query?.limit)

      if (!page || !limit) {
        return badRequest(
          new Error(
            "Parâmetros de paginação inválidos. Min: 1, Máx: 30 receitas por página.",
          ),
        )
      }

      const result = await this.getAllRecipes.execute(page, limit)
      const sanitizedRecipes = SanitizationHelpers.sanitizeRecipes(result.data)

      console.log("GetAllRecipesController: ", page, limit)

      return ok({
        data: sanitizedRecipes,
        meta: result.meta,
      })
    } catch (error) {
      return serverError(error as Error)
    }
  }

  private getPageParam(page: string | undefined): number | null {
    if (!page) return this.DEFAULT_PAGE

    const pageNum = typeof page === "string" ? parseInt(page, 10) : page

    if (!pageNum || pageNum < 1) {
      return null
    }

    return pageNum
  }

  private getLimitParam(limit: string | undefined): number | null {
    if (!limit) return this.DEFAULT_LIMIT

    const limitNum = typeof limit === "string" ? parseInt(limit, 10) : limit

    if (!limitNum || limitNum < 1 || limitNum > this.MAX_LIMIT) {
      return null
    }

    return limitNum
  }
}
