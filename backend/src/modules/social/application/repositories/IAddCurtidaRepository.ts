import { Curtida } from "../../domain/entities/Curtida"

export interface IAddCurtidaRepository {
  curtir(curtida: Curtida): Promise<boolean>
}
