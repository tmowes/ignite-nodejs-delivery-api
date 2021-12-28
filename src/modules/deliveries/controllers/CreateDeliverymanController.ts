import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { CreateDeliveryService } from '../services/CreateDeliveryService'

export class CreateDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: id_client } = request.user
      const { item_name } = request.body
      const createDelivery = container.resolve(CreateDeliveryService)
      const createdDelivery = await createDelivery.execute({ item_name, id_client })
      return response.status(200).json(createdDelivery)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
