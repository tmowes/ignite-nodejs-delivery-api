import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { FindAllPendingDeliveriesService } from '../services/FindAllPendingDeliveriesService'

export class FindAllPendingDeliveriesController {
  async handle(_: Request, response: Response): Promise<Response> {
    try {
      const findAllPendingDeliveries = container.resolve(FindAllPendingDeliveriesService)
      const listDeliveries = await findAllPendingDeliveries.execute()
      return response.status(200).json(listDeliveries)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
