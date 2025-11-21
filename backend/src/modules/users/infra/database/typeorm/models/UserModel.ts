import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("users")
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column()
  password: string

  @Column({ name: "created_at" })
  createdAt: Date

  @Column({ name: "updated_at" })
  updatedAt: Date
}
