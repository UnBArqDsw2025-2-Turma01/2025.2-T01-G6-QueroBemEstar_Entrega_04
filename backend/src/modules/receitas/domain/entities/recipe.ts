import { User } from "../../../users/domain/entities/user"

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
