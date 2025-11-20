import { ICreateUserRepository } from "@/modules/users/application/repositories/ICreateUserRepository"
import { Repository } from "typeorm"
import { UserModel } from "../models/UserModel"
import { TypeOrmConnection } from "@/main/database/TypeOrmConnection"
import { User } from "@/modules/users/domain/entities/user"
import { ISearchUserRepository } from '@/modules/users/application/repositories/ISearchUserRepository'

export class UserRepository
  implements ICreateUserRepository, ISearchUserRepository {
  private ormRepository: Repository<UserModel>

  constructor() {
    this.ormRepository = TypeOrmConnection.getInstance()
      .getDataSource()
      .getRepository(UserModel)
  }

  async create(user: User): Promise<boolean> {
    const result = await this.ormRepository.save({
      name: user.nome,
      password: user.senha,
      createdAt: user.dataCadastro,
      updatedAt: user.dataAtualizacao,
    })
    return result.id !== null
  }

  async findById(id: number): Promise<User | null> {
    const userModel = await this.ormRepository.findOneBy({ id })

    if (!userModel) {
      return null
    }

    // Mapeia o UserModel (infra) para a entidade User (domínio)
    const user = User.create({
      nome: userModel.name,
      senha: userModel.password,
    })
    // Sobrescreve os campos de id e data para refletir o estado do banco
    Object.assign(user, {
      id: userModel.id,
      dataCadastro: userModel.createdAt,
      dataAtualizacao: userModel.updatedAt,
    })

    return user
  }
}
