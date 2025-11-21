import { Repository } from "typeorm"
import { IAddCurtidaRepository } from "@/modules/social/application/repositories/IAddCurtidaRepository"
import { ReceitaModel } from "@/modules/receitas/infra/database/typeorm/models/RecipeModel"
import { TypeOrmConnection } from "@/main/database/TypeOrmConnection"
import { Curtida } from "@/modules/social/domain/entities/Curtida"

export class CurtidaRepository implements IAddCurtidaRepository {
  private ormRepository: Repository<ReceitaModel>

  constructor() {
    this.ormRepository = TypeOrmConnection.getInstance()
      .getDataSource()
      .getRepository(ReceitaModel)
  }

  async curtir(curtida: Curtida): Promise<boolean> {
    const result = await this.ormRepository.save(curtida)
    return result !== null
  }
}
