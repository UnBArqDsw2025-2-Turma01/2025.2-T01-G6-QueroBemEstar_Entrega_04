import { Router } from "express"
import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter"
import { makeSignUpController } from "@/modules/auth/presentation/factories/SignUpControllerFactory"
import { makeLoginController } from "../factories/LoginControllerFactory"

export default (router: Router): void => {
  router.post("/auth/signup", adaptRoute(makeSignUpController()))
  router.post("/auth/login", adaptRoute(makeLoginController()))
}
