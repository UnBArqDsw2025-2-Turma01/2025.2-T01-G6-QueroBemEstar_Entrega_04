export class ReceitaJaCurtidaError extends Error {
  constructor(usuario: string) {
    super(`Receita já curtida pelo usuário: ${usuario}`)
    this.name = "ReceitaJaCurtidaError"
  }
}
