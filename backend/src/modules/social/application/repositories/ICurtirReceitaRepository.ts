import { Curtida } from "../../domain/entities/Curtida"

export interface ICurtirReceitaRepository {
  curtir(curtida: Curtida): Promise<boolean>
}
