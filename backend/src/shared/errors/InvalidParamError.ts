export class InvalidParamError extends Error {
  constructor(paramName: string, message?: string) {
    super(message || `Invalid param: ${paramName}`)
    this.name = "InvalidParamError"
  }
}
