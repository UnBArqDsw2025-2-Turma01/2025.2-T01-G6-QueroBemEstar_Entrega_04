export interface ITokenPayload {
  userId: number
  userName: string
}

export interface ITokenGenerator {
  generate(payload: ITokenPayload): string
  verify(token: string): ITokenPayload
}
