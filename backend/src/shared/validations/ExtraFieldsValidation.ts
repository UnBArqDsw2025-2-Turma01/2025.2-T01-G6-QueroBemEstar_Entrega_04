import { Validation } from "@/shared/protocols/Validation"

export class ExtraFieldsValidation<T> implements Validation<T> {
  constructor(private readonly allowedFields: (keyof T)[]) {}

  validate(input: T): Error | null {
    const inputKeys = Object.keys(input as Record<string, unknown>)
    const allowedFieldsSet = new Set(this.allowedFields.map(String))

    for (const key of inputKeys) {
      if (!allowedFieldsSet.has(key)) {
        return new Error(`Field ${key} is not allowed`)
      }
    }
    return null
  }
}
