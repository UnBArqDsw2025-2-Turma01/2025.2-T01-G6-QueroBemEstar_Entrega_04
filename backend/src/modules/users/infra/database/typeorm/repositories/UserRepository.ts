import { ICreateUserRepository } from "@/modules/users/application/protocols/ICreateUserRepository"
import { Repository } from "typeorm"
import { UserModel } from "../models/UserModel"
import { TypeOrmConnection } from "@/main/database/TypeOrmConnection"
import { User } from "@/modules/users/domain/entities/User"

export class UserRepository implements ICreateUserRepository {
  private ormRepository: Repository<UserModel>

  constructor() {
    this.ormRepository = TypeOrmConnection.getInstance()
      .getDataSource()
      .getRepository(UserModel)
  }

  async create(user: User): Promise<boolean> {
    const result = await this.ormRepository.save(user)
    return result.id !== null
  }
}
