import { HttpResponse } from "./http"

export interface IController<T, R> {
  handle(request: T): Promise<HttpResponse<R | Error>>
}
