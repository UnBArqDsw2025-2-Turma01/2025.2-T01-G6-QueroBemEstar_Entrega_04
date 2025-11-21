import { User } from "../../domain/entities/user"

export interface ICreateUserRepository {
  create(user: User): Promise<boolean>
}
