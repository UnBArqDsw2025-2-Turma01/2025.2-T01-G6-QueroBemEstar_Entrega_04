import { UserRepository } from "@/modules/users/infra/database/typeorm/repositories/UserRepository"
import { CreateRecipe } from "../../application/usecases/CreateRecipe"
import { ReceitaRepository } from "../../infra/database/typeorm/repositories/RecipeRepository"
import { CreateReceitaController } from "../controllers/CreateReceitaController"

export const makeReceitaControllerFactory = () => {
  const receitaRepository = new ReceitaRepository()
  const userRepository = new UserRepository()

  const createReceita = new CreateRecipe(receitaRepository, userRepository)
  const createReceitaController = new CreateReceitaController(createReceita)
  return createReceitaController
}
