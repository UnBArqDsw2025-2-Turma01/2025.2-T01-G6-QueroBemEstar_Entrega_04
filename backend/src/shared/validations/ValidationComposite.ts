import { Validation } from "../protocols/Validation"

export class ValidationComposite<T> implements Validation<T> {
  constructor(private readonly validations: Validation<T>[]) {}

  validate(input: T): Error | null {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
    return null
  }
}
