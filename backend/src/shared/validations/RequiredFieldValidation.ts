import { Validation } from "@/shared/protocols/Validation"

export class RequiredFieldValidation<T> implements Validation<T> {
  constructor(private readonly fieldName: keyof T) {}

  validate(input: T): Error | null {
    if (!input[this.fieldName]) {
      return new Error(`Field ${String(this.fieldName)} is required`)
    }
    return null
  }
}
