export class User {
  public readonly id: string | null
  public name: string
  public password: string

  public readonly createdAt: Date
  public updatedAt: Date

  private constructor(props: {
    id: string | null
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
    id?: string
    name: string
    password: string
    createdAt?: Date
    updatedAt?: Date
  }): User {
    //TODO: Add domain validations here

    const user = new User({
      id: props.id ?? null,
      name: props.name,
      password: props.password,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    })
    return user
  }
}
