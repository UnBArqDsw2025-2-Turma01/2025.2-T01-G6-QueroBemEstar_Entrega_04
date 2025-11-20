import { UserRepository } from "@/modules/users/infra/database/typeorm/repositories/UserRepository"
import { CreateRecipe } from "../../application/usecases/CreateRecipe"
import { ReceitaRepository } from "../../infra/database/typeorm/repositories/RecipeRepository"
import {
  CreateReceitaController,
  CreateReceitaRequest,
} from "../controllers/CreateReceitaController"
import { Validation } from "@/shared/protocols/Validation"
import { RequiredFieldValidation } from "@/shared/validations/RequiredFieldValidation"
import { ValidationComposite } from "@/shared/validations/ValidationComposite"
import { IsArrayFieldValidation } from "@/shared/validations/IsArrayFieldValidation"

export const makeReceitaControllerFactory = () => {
  const validations: Validation<CreateReceitaRequest>[] = [
    new RequiredFieldValidation<CreateReceitaRequest>("titulo"),
    new RequiredFieldValidation<CreateReceitaRequest>("descricao"),
    new RequiredFieldValidation<CreateReceitaRequest>("ingredientes"),
    new RequiredFieldValidation<CreateReceitaRequest>("modoPreparo"),
    new RequiredFieldValidation<CreateReceitaRequest>("fotoUrl"),
    new IsArrayFieldValidation<CreateReceitaRequest>("ingredientes"),
  ]
  const validationComposite = new ValidationComposite<CreateReceitaRequest>(
    validations,
  )

  const receitaRepository = new ReceitaRepository()
  const userRepository = new UserRepository()

  const createReceita = new CreateRecipe(receitaRepository, userRepository)
  const createReceitaController = new CreateReceitaController(
    createReceita,
    validationComposite,
  )
  return createReceitaController
}
