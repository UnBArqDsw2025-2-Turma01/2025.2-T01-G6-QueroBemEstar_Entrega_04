export class User {
  public readonly id?: number
  public name: string
  public password: string

  public readonly createdAt: Date
  public updatedAt: Date

  private constructor(props: {
    id?: number
    name: string
    password: string
    createdAt: Date
    updatedAt: Date
  }) {
    this.id = props.id
    this.name = props.name
    this.password = props.password
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  public static create(props: {
    name: string
    password: string
  }): User {
    //TODO: Adicionar validações e regras de negócio aqui

    const user = new User({
      name: props.name,
      password: props.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return user
  }
}
