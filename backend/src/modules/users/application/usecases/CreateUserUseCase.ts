import { User } from "../../domain/entities/User"
import {
  CreateUserOutput,
  CreateUserInput,
  ICreateUserUseCase,
} from "../../domain/usecases/ICreateUserUseCase"
import { ICreateUserRepository } from "../protocols/ICreateUserRepository"

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepository: ICreateUserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = User.create({
      name: input.name,
      password: input.password,
    })

    console.log("User created:", user)

    const result = await this.userRepository.create(user)

    return result
  }
}
