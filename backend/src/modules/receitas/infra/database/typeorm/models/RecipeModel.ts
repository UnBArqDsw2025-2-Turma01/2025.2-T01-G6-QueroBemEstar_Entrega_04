import { UserModel } from "@/modules/users/infra/database/typeorm/models/UserModel"
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm"

@Entity("receitas")
export class ReceitaModel {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  titulo: string

  @Column("text")
  descricao: string

  @Column({ type: "json" })
  ingredientes: string[]

  @Column("text")
  modoPreparo: string

  @Column()
  fotoUrl: string

  @Column()
  dataPublicacao: Date

  @Column()
  dataAtualizacao: Date

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: "autor_id" })
  autor: UserModel
}
