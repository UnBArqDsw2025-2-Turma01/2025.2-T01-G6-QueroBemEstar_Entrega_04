import { Router } from "express"
import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter"
import { makeSignUpController } from "@/modules/auth/presentation/factories/SignUpControllerFactory"

export default (router: Router): void => {
  router.post("/auth/signup", adaptRoute(makeSignUpController()))
}
