import { Curtida } from "../../domain/entities/Curtida"

export interface ISearchCurtidaRepository {
  jaFoiCurtida(usuarioId: number, receitaId: number): Promise<boolean>
  findAllByReceitaId(receitaId: number): Promise<Curtida[]>
}
