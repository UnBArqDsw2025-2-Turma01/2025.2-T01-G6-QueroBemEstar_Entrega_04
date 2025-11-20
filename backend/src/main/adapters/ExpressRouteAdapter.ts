import { IController } from "@/shared/protocols/controller"
import { Request, Response } from "express"

interface AuthenticatedRequest extends Request {
  userId?: number
}

export const adaptRoute = (controller: IController<unknown, unknown>) => {
  return async (req: AuthenticatedRequest, res: Response) => {
    const request = {
      body: req.body || {},
      params: req.params || {},
      userId: req.userId,
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: (httpResponse.body as Error).message,
      })
    }
  }
}
