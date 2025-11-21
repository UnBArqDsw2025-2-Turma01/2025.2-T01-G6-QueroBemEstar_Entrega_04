export interface ILoginUser {
  execute(input: LoginUserInput): Promise<LoginUserOutput>
}

export interface LoginUserInput {
  nome: string
  senha: string
}

export interface LoginUserOutput {
  token: string
}
