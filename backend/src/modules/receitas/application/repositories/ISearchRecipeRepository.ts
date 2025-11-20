import { PaginatedResult } from "@/shared/protocols/pagination"
import { Recipe } from "../../domain/entities/recipe"

export interface ISearchRecipeRepository {
  findById(id: number): Promise<Recipe | null>
  findByAuthorId(authorId: number): Promise<Recipe[]>
  findAll(page: number, limit: number): Promise<PaginatedResult<Recipe>>
}
