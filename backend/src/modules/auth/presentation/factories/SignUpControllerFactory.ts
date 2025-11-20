import {
  SignUpController,
  SignUpRequest,
} from "@/modules/auth/presentation/controllers/SignUpController"
import { CreateUser } from "@/modules/users/application/usecases/CreateUserUseCase"
import { UserRepository } from "@/modules/users/infra/database/typeorm/repositories/UserRepository"
import { Validation } from "@/shared/protocols/Validation"
import { RequiredFieldValidation } from "@/shared/validations/RequiredFieldValidation"
import { ExtraFieldsValidation } from "@/shared/validations/ExtraFieldsValidation"
import { ValidationComposite } from "@/shared/validations/ValidationComposite"

export const makeSignUpController = () => {
  const validations: Validation<SignUpRequest>[] = [
    new ExtraFieldsValidation<SignUpRequest>(["nome", "senha"]),
    new RequiredFieldValidation<SignUpRequest>("nome"),
    new RequiredFieldValidation<SignUpRequest>("senha"),
  ]
  const validationComposite = new ValidationComposite<SignUpRequest>(
    validations,
  )

  const userRepository = new UserRepository()
  const createUser = new CreateUser(userRepository)
  const controller = new SignUpController(createUser, validationComposite)
  return controller
}
