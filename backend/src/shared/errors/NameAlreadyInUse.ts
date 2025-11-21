export class NameAlreadyInUse extends Error {
  constructor(name: string) {
    super(`The name '${name}' is already in use.`)
    this.name = "NameAlreadyInUse"
  }
}
