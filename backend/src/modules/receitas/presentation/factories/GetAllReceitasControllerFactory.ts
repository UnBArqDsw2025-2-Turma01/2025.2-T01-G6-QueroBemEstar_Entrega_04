import { GetAllRecipes } from "../../application/usecases/GetAllReipes"
import { ReceitaRepository } from "../../infra/database/typeorm/repositories/RecipeRepository"
import { GetAllRecipesController } from "../controllers/GetAllRecipesController"

export const makeGetAllReceitasController = () => {
  const receitaRepository = new ReceitaRepository()

  const getAllRecipes = new GetAllRecipes(receitaRepository)
  const getAllRecipesController = new GetAllRecipesController(getAllRecipes)
  return getAllRecipesController
}
