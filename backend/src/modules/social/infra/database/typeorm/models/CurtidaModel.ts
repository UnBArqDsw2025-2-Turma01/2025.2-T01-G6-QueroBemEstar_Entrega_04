import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { UserModel } from "@/modules/users/infra/database/typeorm/models/UserModel"
import { ReceitaModel } from "@/modules/receitas/infra/database/typeorm/models/RecipeModel"

@Entity("curtidas")
export class CurtidaModel {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserModel, { onDelete: "CASCADE" })
  @JoinColumn({ name: "usuario_id" })
  usuario: UserModel

  @ManyToOne(() => ReceitaModel, { onDelete: "CASCADE" })
  @JoinColumn({ name: "receita_id" })
  receita: ReceitaModel

  @Column({ name: "data_curtida" })
  dataCurtida: Date
}
