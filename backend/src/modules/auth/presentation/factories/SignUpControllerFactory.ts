import { SignUpController } from "@/modules/auth/presentation/controllers/SignUpController"
import { CreateUser } from "@/modules/users/application/usecases/CreateUserUseCase"
import { UserRepository } from "@/modules/users/infra/database/typeorm/repositories/UserRepository"

export const makeSignUpController = () => {
  const userRepository = new UserRepository()
  const createUser = new CreateUser(userRepository)
  const controller = new SignUpController(createUser)
  return controller
}
