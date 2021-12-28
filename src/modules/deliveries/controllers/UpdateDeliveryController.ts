import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { UpdateDeliveryService } from '../services/UpdateDeliveryService'

export class UpdateDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: id_deliveryman } = request.user
      const { id_delivery } = request.params
      const updateDelivery = container.resolve(UpdateDeliveryService)
      const createdDelivery = await updateDelivery.execute({ id_deliveryman, id_delivery })
      return response.status(200).json(createdDelivery)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
