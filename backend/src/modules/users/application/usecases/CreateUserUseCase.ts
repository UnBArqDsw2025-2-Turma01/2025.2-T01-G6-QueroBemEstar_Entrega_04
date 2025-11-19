import { User } from "../../domain/entities/User"
import {
  CreateUserOutput,
  CreateUserInput,
  ICreateUser,
} from "../../application/ports/ICreateUser"
import { ICreateUserRepository } from "../repositories/ICreateUserRepository"

export class CreateUser implements ICreateUser {
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
