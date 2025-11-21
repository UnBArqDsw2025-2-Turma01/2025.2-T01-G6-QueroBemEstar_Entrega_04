import { ISearchUserRepository } from "@/modules/users/application/repositories/ISearchUserRepository"
import { CurtidaReceitaInput, ICurtirReceita } from "../ports/ICurtirReceita"
import { ICurtirReceitaRepository } from "../repositories/ICurtirReceitaRepository"
import { Curtida } from "../../domain/entities/Curtida"
import { ISearchRecipeRepository } from "@/modules/receitas/application/repositories/ISearchRecipeRepository"
import { InvalidParamError } from "@/shared/errors/InvalidParamError"
import { ISearchCurtidaRepository } from "../repositories/ISearchCurtidaRepository"
import { ReceitaJaCurtidaError } from "@/shared/errors/ReceitaJaCurtidaError"

export class CurtirReceita implements ICurtirReceita {
  constructor(
    private readonly curtirReceitaRepository: ICurtirReceitaRepository,
    private readonly searchCurtidaRepository: ISearchCurtidaRepository,
    private readonly searchUserRepository: ISearchUserRepository,
    private readonly searchRecipeRepository: ISearchRecipeRepository,
  ) {}

  async execute(input: CurtidaReceitaInput): Promise<boolean> {
    const { autorId, receitaId } = input

    const autor = await this.searchUserRepository.findById(autorId)
    const receita = await this.searchRecipeRepository.findById(receitaId)

    if (!autor?.id) {
      throw new InvalidParamError("userId")
    }
    if (!receita?.id) {
      throw new InvalidParamError("receitaId")
    }

    const jaFoiCurtida = await this.searchCurtidaRepository.jaFoiCurtida(
      autor.id,
      receita.id,
    )
    if (jaFoiCurtida) {
      throw new ReceitaJaCurtidaError(autor.id.toString())
    }

    const curtida = Curtida.create({ autorId: autor.id, receitaId: receita.id })

    const result = await this.curtirReceitaRepository.curtir(curtida)
    return result
  }
}
