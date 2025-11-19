import { User } from "../../domain/entities/User"

export interface ICreateUserRepository {
  create(user: User): Promise<boolean>
}
