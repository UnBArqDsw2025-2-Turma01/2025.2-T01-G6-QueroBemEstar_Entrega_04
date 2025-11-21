export type HttpResponse<T> = {
  statusCode: number
  body: T
}

export type HttpRequest<T> = {
  body: T
  headers?: Record<string, string>
  query?: Record<string, string>
  userId?: number
  params?: Record<string, string | number>
}
