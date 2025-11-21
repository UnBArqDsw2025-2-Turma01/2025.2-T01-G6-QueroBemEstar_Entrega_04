import { Repository } from "typeorm"
import { ICurtirReceitaRepository } from "@/modules/social/application/repositories/ICurtirReceitaRepository"
import { TypeOrmConnection } from "@/main/database/TypeOrmConnection"
import { Curtida } from "@/modules/social/domain/entities/Curtida"
import { CurtidaModel } from "../models/CurtidaModel"
import { ISearchCurtidaRepository } from "@/modules/social/application/repositories/ISearchCurtidaRepository"

export class CurtidaRepository
  implements ICurtirReceitaRepository, ISearchCurtidaRepository
{
  private ormRepository: Repository<CurtidaModel>

  constructor() {
    this.ormRepository = TypeOrmConnection.getInstance()
      .getDataSource()
      .getRepository(CurtidaModel)
  }

  async curtir(curtida: Curtida): Promise<boolean> {
    console.log("CurtidaRepository - curtir:", curtida)
    const result = await this.ormRepository.save({
      autorId: { id: curtida.autorId },
      receitaId: { id: curtida.receitaId },
      dataCurtida: curtida.dataCurtida,
    })
    return result !== null
  }

  async jaFoiCurtida(usuarioId: number, receitaId: number): Promise<boolean> {
    const curtidaModel = await this.ormRepository.findOne({
      where: {
        autorId: { id: usuarioId },
        receitaId: { id: receitaId },
      },
    })
    if (curtidaModel) {
      return true
    }
    return false
  }

  async findAllByReceitaId(receitaId: number): Promise<Curtida[]> {
    const curtidaModels = await this.ormRepository.find({
      where: {
        receitaId: { id: receitaId },
      },
    })

    if (!curtidaModels) {
      return []
    }

    const curtidas = curtidaModels.map((curtidaModel) =>
      Curtida.reBuild({
        id: curtidaModel.id,
        autorId: curtidaModel.autorId.id,
        receitaId: curtidaModel.receitaId.id,
        dataCurtida: curtidaModel.dataCurtida,
      }),
    )
    return curtidas
  }
}
