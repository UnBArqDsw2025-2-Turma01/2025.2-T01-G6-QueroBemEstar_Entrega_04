import { InvalidParamError } from "@/shared/errors/InvalidParamError"

export class User {
  public readonly id?: number
  public nome: string
  public senha: string

  public readonly dataCadastro: Date
  public dataAtualizacao: Date

  private constructor(props: {
    id?: number
    nome: string
    senha: string
    dataCadastro: Date
    dataAtualizacao: Date
  }) {
    this.id = props.id
    this.nome = props.nome
    this.senha = props.senha
    this.dataCadastro = props.dataCadastro
    this.dataAtualizacao = props.dataAtualizacao
  }

  public static create(props: { nome: string; senha: string }): User {
    const nomeLimpo = props.nome.trim()
    const senhaLimpa = props.senha.trim()

    if (nomeLimpo === "") {
      throw new InvalidParamError(
        "nome",
        "O nome do usuário não pode ser vazio.",
      )
    }

    if (nomeLimpo.length < 3) {
      throw new InvalidParamError(
        "nome",
        "O nome do usuário deve ter no mínimo 3 caracteres.",
      )
    }

    if (nomeLimpo.length > 128) {
      throw new InvalidParamError(
        "nome",
        "O nome do usuário deve ter no máximo 128 caracteres.",
      )
    }

    if (senhaLimpa === "") {
      throw new InvalidParamError(
        "senha",
        "A senha do usuário não pode ser vazia.",
      )
    }

    if (senhaLimpa.length < 6) {
      throw new InvalidParamError(
        "senha",
        "A senha do usuário deve ter no mínimo 6 caracteres.",
      )
    }

    if (senhaLimpa.length > 128) {
      throw new InvalidParamError(
        "senha",
        "A senha do usuário deve ter no máximo 128 caracteres.",
      )
    }

    const user = new User({
      nome: nomeLimpo,
      senha: senhaLimpa,
      dataCadastro: new Date(),
      dataAtualizacao: new Date(),
    })
    return user
  }

  public static rebuild(props: {
    id: number
    nome: string
    senha: string
    dataCadastro: Date
    dataAtualizacao: Date
  }): User {
    const user = new User({
      id: props.id,
      nome: props.nome,
      senha: props.senha,
      dataCadastro: props.dataCadastro,
      dataAtualizacao: props.dataAtualizacao,
    })
    return user
  }
}
