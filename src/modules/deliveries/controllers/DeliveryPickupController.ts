import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { DeliveryPickupService } from '../services/DeliveryPickupService'

export class DeliveryPickupController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: id_deliveryman } = request.user
      const { id_delivery } = request.params
      const pickupDelivery = container.resolve(DeliveryPickupService)
      const createdDelivery = await pickupDelivery.execute({ id_deliveryman, id_delivery })
      return response.status(200).json(createdDelivery)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
