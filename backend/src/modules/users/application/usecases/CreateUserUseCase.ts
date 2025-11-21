import {
  CreateUserOutput,
  CreateUserInput,
  ICreateUser,
} from "../../application/ports/ICreateUser"
import { ICreateUserRepository } from "../repositories/ICreateUserRepository"
import { User } from "../../domain/entities/user"
import { IPasswordHasher } from "@/modules/auth/application/protocols/IPasswordHasher"
import { ISearchUserRepository } from "../repositories/ISearchUserRepository"

export class CreateUser implements ICreateUser {
  constructor(
    private readonly userRepository: ICreateUserRepository,
    private readonly searchUserRepository: ISearchUserRepository,
    private readonly passwordHassher: IPasswordHasher,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const validNome = await this.searchUserRepository.findByName(input.nome)
    if (validNome) {
      return false
    }

    const user = User.create({ nome: input.nome, senha: input.senha })

    user.senha = await this.passwordHassher.hash(user.senha)

    const result = await this.userRepository.create(user)

    return result
  }
}
