import {
  CreateRecipeInput,
  CreateRecipeOutput,
  ICreateRecipe,
} from "../ports/ICreateRecipe"
import { ICreateRecipeRepository } from "../repositories/ICreateRecipeRepository"
import { Recipe } from "../../domain/entities/recipe"
import { ISearchUserRepository } from "@/modules/users/application/repositories/ISearchUserRepository"
import { AccessDeniedError } from "@/shared/errors/AccessDenied"

export class CreateRecipe implements ICreateRecipe {
  constructor(
    private readonly createRecipeRepository: ICreateRecipeRepository,
    private readonly searchUserById: ISearchUserRepository,
  ) {}

  async execute(
    input: CreateRecipeInput,
    userId: number,
  ): Promise<CreateRecipeOutput> {
    const autor = await this.searchUserById.findById(userId)
    if (!autor) {
      throw new AccessDeniedError()
    }

    const novaReceita = Recipe.create({
      titulo: input.titulo,
      descricao: input.descricao,
      ingredientes: input.ingredientes,
      modoPreparo: input.modoPreparo,
      fotoUrl: input.fotoUrl,
      autor: autor,
    })

    const receitaSalva = await this.createRecipeRepository.create(novaReceita)
    return receitaSalva
  }
}
