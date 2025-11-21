import { Validation } from "@/shared/protocols/Validation"
import { InvalidParamError } from "../errors/InvalidParamError"

export class IsArrayFieldValidation<T> implements Validation<T> {
  constructor(private readonly fieldName: keyof T) {}

  validate(input: T): Error | null {
    if (!Array.isArray(input[this.fieldName])) {
      return new InvalidParamError(
        String(this.fieldName),
        `O campo ${String(this.fieldName)} deve ser um array.`,
      )
    }
    return null
  }
}
