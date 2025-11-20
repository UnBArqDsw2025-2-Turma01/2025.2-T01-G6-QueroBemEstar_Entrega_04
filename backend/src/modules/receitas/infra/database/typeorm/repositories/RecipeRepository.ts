import { Repository } from "typeorm"
import { ReceitaModel } from "../models/RecipeModel"
import { ICreateRecipeRepository } from "../../../../application/repositories/ICreateRecipeRepository"
import { TypeOrmConnection } from "@/main/database/TypeOrmConnection"
import { Recipe } from "@/modules/receitas/domain/entities/recipe"

export class ReceitaRepository implements ICreateRecipeRepository {
  private ormRepository: Repository<ReceitaModel>

  constructor() {
    this.ormRepository = TypeOrmConnection.getInstance()
      .getDataSource()
      .getRepository(ReceitaModel)
  }

  public async create(receita: Recipe): Promise<boolean> {
    const receitaModel = this.ormRepository.create({
      titulo: receita.titulo,
      descricao: receita.descricao,
      ingredientes: receita.ingredientes,
      modoPreparo: receita.modoPreparo,
      fotoUrl: receita.fotoUrl,
      autor: receita.autor,
      dataPublicacao: receita.dataPublicacao,
      dataAtualizacao: receita.dataAtualizacao,
    })

    const result = await this.ormRepository.save(receitaModel)

    return result !== null
  }
}
