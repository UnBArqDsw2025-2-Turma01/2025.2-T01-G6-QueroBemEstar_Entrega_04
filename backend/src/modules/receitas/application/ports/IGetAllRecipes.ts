import { PaginatedResult } from "@/shared/protocols/pagination"
import { Recipe } from "../../domain/entities/recipe"

export interface IGetAllRecipes {
  execute(page: number, limit: number): Promise<PaginatedResult<Recipe>>
}
