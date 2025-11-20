export type HttpResponse<T> = {
  statusCode: number
  body: T
}

export type HttpRequest<T> = {
  body: T
  headers?: Record<string, string>
}
