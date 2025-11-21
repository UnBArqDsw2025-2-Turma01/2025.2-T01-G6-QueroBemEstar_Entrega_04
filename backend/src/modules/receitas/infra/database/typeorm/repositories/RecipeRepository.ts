import { Repository } from "typeorm"
import { ReceitaModel } from "../models/RecipeModel"
import { ICreateRecipeRepository } from "../../../../application/repositories/ICreateRecipeRepository"
import { TypeOrmConnection } from "@/main/database/TypeOrmConnection"
import { Recipe } from "@/modules/receitas/domain/entities/recipe"
import { ISearchRecipeRepository } from "@/modules/receitas/application/repositories/ISearchRecipeRepository"
import { User } from "@/modules/users/domain/entities/user"
import { PaginatedResult } from "@/shared/protocols/pagination"

export class ReceitaRepository
  implements ICreateRecipeRepository, ISearchRecipeRepository
{
  private ormRepository: Repository<ReceitaModel>

  constructor() {
    this.ormRepository = TypeOrmConnection.getInstance()
      .getDataSource()
      .getRepository(ReceitaModel)
  }

  async create(receita: Recipe): Promise<boolean> {
    const receitaModel = this.ormRepository.create({
      titulo: receita.titulo,
      descricao: receita.descricao,
      ingredientes: receita.ingredientes,
      modoPreparo: receita.modoPreparo,
      fotoUrl: receita.fotoUrl,
      autor: receita.autor,
      dataPublicacao: receita.dataPublicacao,
      dataAtualizacao: receita.dataAtualizacao,
    })

    const result = await this.ormRepository.save(receitaModel)

    return result !== null
  }

  async findById(id: number): Promise<Recipe | null> {
    const receitaModel = await this.ormRepository.findOne({
      where: { id },
      relations: ["autor"],
    })

    if (!receitaModel) {
      return null
    }

    const autor = User.rebuild({
      id: receitaModel.autor.id,
      nome: receitaModel.autor.name,
      senha: receitaModel.autor.password,
      dataCadastro: receitaModel.autor.createdAt,
      dataAtualizacao: receitaModel.autor.updatedAt,
    })

    const receita = Recipe.rebuild({
      id: receitaModel.id,
      titulo: receitaModel.titulo,
      descricao: receitaModel.descricao,
      ingredientes: receitaModel.ingredientes,
      modoPreparo: receitaModel.modoPreparo,
      fotoUrl: receitaModel.fotoUrl,
      dataAtualizacao: receitaModel.dataAtualizacao,
      dataPublicacao: receitaModel.dataPublicacao,
      autor: autor,
    })

    return receita
  }

  async findByAuthorId(authorId: number): Promise<Recipe[]> {
    const receitaModel = await this.ormRepository.find({
      where: { autor: { id: authorId } },
      relations: ["autor"],
    })

    if (!receitaModel) {
      return []
    }

    const receita = receitaModel.map((receitaModel) => {
      const autor = User.rebuild({
        id: receitaModel.autor.id,
        nome: receitaModel.autor.name,
        senha: receitaModel.autor.password,
        dataCadastro: receitaModel.autor.createdAt,
        dataAtualizacao: receitaModel.autor.updatedAt,
      })

      return Recipe.rebuild({
        id: receitaModel.id,
        titulo: receitaModel.titulo,
        descricao: receitaModel.descricao,
        ingredientes: receitaModel.ingredientes,
        modoPreparo: receitaModel.modoPreparo,
        fotoUrl: receitaModel.fotoUrl,
        dataAtualizacao: receitaModel.dataAtualizacao,
        dataPublicacao: receitaModel.dataPublicacao,
        autor: autor,
      })
    })

    return receita
  }

  async findAll(page: number, limit: number): Promise<PaginatedResult<Recipe>> {
    const skip = (page - 1) * limit

    const [receitasModel, total] = await this.ormRepository.findAndCount({
      relations: ["autor"],
      skip,
      take: limit,
      order: { dataPublicacao: "DESC" },
    })

    if (!receitasModel) {
      return {
        data: [],
        meta: {
          page,
          limit,
          total: 0,
          totalPages: 0,
        },
      }
    }

    const receitas = receitasModel.map((receitaModel) => {
      const autor = User.rebuild({
        id: receitaModel.autor.id,
        nome: receitaModel.autor.name,
        senha: receitaModel.autor.password,
        dataCadastro: receitaModel.autor.createdAt,
        dataAtualizacao: receitaModel.autor.updatedAt,
      })

      return Recipe.rebuild({
        id: receitaModel.id,
        titulo: receitaModel.titulo,
        descricao: receitaModel.descricao,
        ingredientes: receitaModel.ingredientes,
        modoPreparo: receitaModel.modoPreparo,
        fotoUrl: receitaModel.fotoUrl,
        dataAtualizacao: receitaModel.dataAtualizacao,
        dataPublicacao: receitaModel.dataPublicacao,
        autor: autor,
      })
    })

    const totalPages = Math.ceil(total / limit)

    return {
      data: receitas,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    }
  }
}
