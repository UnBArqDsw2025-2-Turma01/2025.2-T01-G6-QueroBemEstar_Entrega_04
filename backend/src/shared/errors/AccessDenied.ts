export class AccessDeniedError extends Error {
  constructor() {
    super("Invalid credentials or access denied")
    this.name = "AccessDeniedError"
  }
}
