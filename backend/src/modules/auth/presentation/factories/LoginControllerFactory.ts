import { Validation } from "@/shared/protocols/Validation"
import { LoginController, LoginRequest } from "../controllers/LoginController"
import { ExtraFieldsValidation } from "@/shared/validations/ExtraFieldsValidation"
import { RequiredFieldValidation } from "@/shared/validations/RequiredFieldValidation"
import { ValidationComposite } from "@/shared/validations/ValidationComposite"
import { UserRepository } from "@/modules/users/infra/database/typeorm/repositories/UserRepository"
import { LoginUser } from "../../application/usercases/LoginUser"
import { JwtAdapter } from "../../infra/adapters/JwtAdapter"
import { BcryptAdapter } from "../../infra/adapters/BcryptAdapter"

export const makeLoginController = () => {
  const validations: Validation<LoginRequest>[] = [
    new ExtraFieldsValidation<LoginRequest>(["nome", "senha"]),
    new RequiredFieldValidation<LoginRequest>("nome"),
    new RequiredFieldValidation<LoginRequest>("senha"),
  ]
  const validationComposite = new ValidationComposite<LoginRequest>(validations)

  const passwordHasher = new BcryptAdapter()
  const tokenGenerator = new JwtAdapter()
  const userRepository = new UserRepository()

  const loginUser = new LoginUser(
    userRepository,
    passwordHasher,
    tokenGenerator,
  )

  const controller = new LoginController(loginUser, validationComposite)
  return controller
}
