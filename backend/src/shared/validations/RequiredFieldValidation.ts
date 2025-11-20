import { Validation } from "@/shared/protocols/Validation"
import { MissingParamError } from "../errors/MissingParamError"

export class RequiredFieldValidation<T> implements Validation<T> {
  constructor(private readonly fieldName: keyof T) {}

  validate(input: T): Error | null {
    if (!input[this.fieldName]) {
      return new MissingParamError(String(this.fieldName))
    }
    return null
  }
}
