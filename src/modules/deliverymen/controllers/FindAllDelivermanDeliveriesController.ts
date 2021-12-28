import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { FindAllDelivermanDeliveriesService } from '../services/FindAllDelivermanDeliveriesService'

export class FindAllDelivermanDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: id_deliveryman } = request.user
      const findAllDeliverymanDeliveries = container.resolve(FindAllDelivermanDeliveriesService)
      const listDeliveries = await findAllDeliverymanDeliveries.execute({ id_deliveryman })
      return response.status(200).json(listDeliveries)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
