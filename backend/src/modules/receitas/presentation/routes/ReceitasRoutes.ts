import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter"
import { Router } from "express"
import { adaptMiddleware } from "@/main/adapters/ExpressMiddlewareAdapter"
import { AuthMiddleware } from "@/shared/middleware/AuthMiddleware"
import { UserRepository } from "@/modules/users/infra/database/typeorm/repositories/UserRepository"
import { JwtAdapter } from "@/modules/auth/infra/adapters/JwtAdapter"
import { makeGetAllReceitasController } from "../factories/GetAllReceitasControllerFactory"
import { makeCreateReceitaController } from "../factories/CreateReceitaControllerFactory"

const createAuthMiddleware = (): AuthMiddleware => {
  const tokenGenerator = new JwtAdapter()
  const userRepository = new UserRepository()
  return new AuthMiddleware(userRepository, tokenGenerator)
}

export default (router: Router): void => {
  router.post(
    "/receitas",
    adaptMiddleware(createAuthMiddleware()),
    adaptRoute(makeCreateReceitaController()),
  )
  router.get("/receitas", adaptRoute(makeGetAllReceitasController()))
}
