import { InvalidParamError } from "@/shared/errors/InvalidParamError"
import {
  ILoginUser,
  LoginUserInput,
  LoginUserOutput,
} from "../ports/ILoginUser"
import { ISearchUserRepository } from "@/modules/users/application/repositories/ISearchUserRepository"
import { IPasswordHasher } from "../protocols/IPasswordHasher"
import { ITokenGenerator } from "../protocols/ITokenGenerator"

export class LoginUser implements ILoginUser {
  constructor(
    private readonly userRepository: ISearchUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly jwtGenerator: ITokenGenerator,
  ) {}

  async execute(input: LoginUserInput): Promise<LoginUserOutput> {
    const user = await this.userRepository.findByName(input.nome)

    if (!user?.id) {
      throw new InvalidParamError("Usuário ou senha inválidos")
    }

    const isPasswordValid = await this.passwordHasher.compare(
      input.senha,
      user.senha,
    )

    if (!isPasswordValid) {
      throw new InvalidParamError("Usuário ou senha inválidos")
    }

    const token = this.jwtGenerator.generate({
      userId: user.id,
      userName: user.nome,
    })

    return {
      token,
    }
  }
}
