import { Recipe } from "../../domain/entities/recipe"

export interface ICreateRecipeRepository {
  create(recipe: Recipe): Promise<boolean>
}
