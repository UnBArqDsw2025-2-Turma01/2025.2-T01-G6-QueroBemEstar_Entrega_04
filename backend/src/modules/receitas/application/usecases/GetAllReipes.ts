import { PaginatedResult } from "@/shared/protocols/pagination"
import { Recipe } from "../../domain/entities/recipe"
import { IGetAllRecipes } from "../ports/IGetAllRecipes"
import { ISearchRecipeRepository } from "../repositories/ISearchRecipeRepository"

export class GetAllRecipes implements IGetAllRecipes {
  constructor(private readonly recipeRepository: ISearchRecipeRepository) {}

  async execute(page: number, limit: number): Promise<PaginatedResult<Recipe>> {
    const recipes = await this.recipeRepository.findAll(page, limit)
    return recipes
  }
}
