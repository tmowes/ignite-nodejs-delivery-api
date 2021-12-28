import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { CompleteDeliveryService } from '../services/CompleteDeliveryService'

export class CompleteDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: id_deliveryman } = request.user
      const { id_delivery } = request.params
      const completeDelivery = container.resolve(CompleteDeliveryService)
      const completedDelivery = await completeDelivery.execute({
        id_deliveryman,
        id_delivery,
      })
      return response.status(200).json(completedDelivery)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
