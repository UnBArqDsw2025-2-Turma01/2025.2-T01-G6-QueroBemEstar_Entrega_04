import { User } from "@/modules/users/domain/entities/user"
import { Recipe } from "@/modules/receitas/domain/entities/recipe"

export interface SanitizedUser {
  nome: string
}

export interface SanitizedRecipe {
  id?: number
  titulo: string
  descricao: string
  ingredientes: string[]
  modoPreparo: string
  fotoUrl: string
  dataPublicacao: Date
  dataAtualizacao: Date
  autor: SanitizedUser
}

export class SanitizationHelpers {
  static sanitizeUser(user: User): SanitizedUser {
    return {
      nome: user.nome,
    }
  }

  static sanitizeRecipe(recipe: Recipe): SanitizedRecipe {
    return {
      id: recipe.id,
      titulo: recipe.titulo,
      descricao: recipe.descricao,
      ingredientes: recipe.ingredientes,
      modoPreparo: recipe.modoPreparo,
      fotoUrl: recipe.fotoUrl,
      dataPublicacao: recipe.dataPublicacao,
      dataAtualizacao: recipe.dataAtualizacao,
      autor: this.sanitizeUser(recipe.autor),
    }
  }

  static sanitizeRecipes(recipes: Recipe[]): SanitizedRecipe[] {
    return recipes.map((recipe) => this.sanitizeRecipe(recipe))
  }
}
