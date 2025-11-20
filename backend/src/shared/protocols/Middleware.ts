import { HttpResponse } from "./http";

export interface Middleware<T, R> {
  handle: (httpRequest: T) => Promise<HttpResponse<R>>
}