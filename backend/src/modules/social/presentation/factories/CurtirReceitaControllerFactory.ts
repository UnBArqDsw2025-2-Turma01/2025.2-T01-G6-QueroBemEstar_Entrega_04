import { UserRepository } from "@/modules/users/infra/database/typeorm/repositories/UserRepository"
import { CurtirReceita } from "../../application/usecases/CurtirReceita"
import { CurtidaRepository } from "../../infra/database/typeorm/repositories/CurtidaRepository"
import { CurtirReceitaController } from "../controllers/CurtirReceitaController"
import { ReceitaRepository } from "@/modules/receitas/infra/database/typeorm/repositories/RecipeRepository"

export const makeCurtirReceitaController = () => {
  const curtidaRepository = new CurtidaRepository()
  const userRepository = new UserRepository()
  const receitaRepository = new ReceitaRepository()

  const curtirReceitaUseCase = new CurtirReceita(
    curtidaRepository,
    curtidaRepository,
    userRepository,
    receitaRepository,
  )

  const controller = new CurtirReceitaController(curtirReceitaUseCase)
  return controller
}
