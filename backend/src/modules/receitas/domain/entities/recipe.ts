import { User } from "../../../users/domain/entities/user"
import { InvalidParamError } from "@/shared/errors/InvalidParamError"

export class Recipe {
  public readonly id?: number
  public titulo: string
  public descricao: string
  public ingredientes: string[]
  public modoPreparo: string
  public fotoUrl: string
  public readonly dataPublicacao: Date
  public dataAtualizacao: Date
  public autor: User

  private constructor(props: {
    id?: number
    titulo: string
    descricao: string
    ingredientes: string[]
    modoPreparo: string
    fotoUrl: string
    dataPublicacao: Date
    dataAtualizacao: Date
    autor: User
  }) {
    this.id = props.id
    this.titulo = props.titulo
    this.descricao = props.descricao
    this.ingredientes = props.ingredientes
    this.modoPreparo = props.modoPreparo
    this.fotoUrl = props.fotoUrl
    this.dataPublicacao = props.dataPublicacao
    this.dataAtualizacao = props.dataAtualizacao
    this.autor = props.autor
  }

  public static create(props: {
    titulo: string
    descricao: string
    ingredientes: string[]
    modoPreparo: string
    fotoUrl: string
    autor: User
  }): Recipe {
    const titulo = props.titulo.trim()
    const descricao = props.descricao.trim()
    const modoPreparo = props.modoPreparo.trim()
    const fotoUrl = props.fotoUrl.trim()

    if (titulo.length === 0) {
      throw new InvalidParamError("titulo", "Título vazio")
    }

    if (titulo.length < 10) {
      throw new InvalidParamError("titulo", "Título menor que o mínimo de 10 caracteres")
    }

    if (titulo.length > 255) {
      throw new InvalidParamError(
        "titulo",
        "Título não pode ter mais de 255 caracteres",
      )
    }

    if (descricao.length === 0) {
      throw new InvalidParamError("descricao", "Descrição vazia")
    }

    if (descricao.length < 10) {
      throw new InvalidParamError("descricao", "Descrição menor que o mínimo de 10 caracteres")
    }

    if (descricao.length > 1000) {
      throw new InvalidParamError(
        "descricao",
        "Descrição não pode ter mais de 1000 caracteres",
      )
    }

    if (!props.ingredientes || props.ingredientes.length === 0) {
      throw new InvalidParamError(
        "ingredientes",
        "Pelo menos um ingrediente é obrigatório",
      )
    }

    if (props.ingredientes.some((ing) => !ing || ing.trim().length === 0)) {
      throw new InvalidParamError(
        "ingredientes",
        "Ingredientes não podem estar vazios",
      )
    }

    if (modoPreparo.length === 0) {
      throw new InvalidParamError("modoPreparo", "Modo de preparo vazio")
    }

    if (modoPreparo.length < 10) {
      throw new InvalidParamError("modoPreparo", "Modo de preparo menor que o mínimo de 10 caracteres")
    }

    if (modoPreparo.length > 2000) {
      throw new InvalidParamError(
        "modoPreparo",
        "Modo de preparo não pode ter mais de 2000 caracteres",
      )
    }

    if (fotoUrl.length === 0) {
      throw new InvalidParamError("fotoUrl", "URL da foto vazia")
    }

    try {
      new URL(fotoUrl)
    } catch {
      throw new InvalidParamError("fotoUrl", "URL da foto é inválida")
    }

    if (!props.autor) {
      throw new InvalidParamError("autor", "Autor vazio")
    }

    return new Recipe({
      titulo: props.titulo,
      descricao: props.descricao,
      ingredientes: props.ingredientes,
      modoPreparo: props.modoPreparo,
      fotoUrl: props.fotoUrl,
      dataPublicacao: new Date(),
      dataAtualizacao: new Date(),
      autor: props.autor,
    })
  }
}
