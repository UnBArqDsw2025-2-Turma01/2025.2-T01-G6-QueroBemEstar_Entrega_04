import { Express, Router } from "express"
import setupAuthRoutes from "@/modules/auth/presentation/routes/AuthRoutes"

export default (app: Express): void => {
  const router = Router()
  app.use("/api", router)

  router.get("/health", (req, res) => {
    res.status(200).send("OK")
  })

  setupAuthRoutes(router)
}
