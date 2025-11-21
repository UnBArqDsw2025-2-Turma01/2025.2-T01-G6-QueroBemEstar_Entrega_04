export interface CurtidaReceitaInput {
  autorId: number
  receitaId: number
}

export interface ICurtirReceita {
  execute(input: CurtidaReceitaInput): Promise<boolean>
}
