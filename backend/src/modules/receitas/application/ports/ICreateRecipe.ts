export interface CreateRecipeInput {
  titulo: string
  descricao: string
  ingredientes: string[]
  modoPreparo: string
  fotoUrl: string
}

export interface ICreateRecipe {
  execute(input: CreateRecipeInput, userId: number): Promise<CreateRecipeOutput>
}

export type CreateRecipeOutput = boolean
