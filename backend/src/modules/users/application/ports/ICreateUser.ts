export interface ICreateUser {
  execute(input: CreateUserInput): Promise<CreateUserOutput>
}

export interface CreateUserInput {
  nome: string
  senha: string
}

export type CreateUserOutput = boolean
