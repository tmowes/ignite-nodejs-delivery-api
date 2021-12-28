import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { FindAllClientDeliveriesService } from '../services/FindAllClientDeliveriesService'

export class FindAllClientDeliveriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: id_client } = request.user
      const findAllClientDeliveries = container.resolve(FindAllClientDeliveriesService)
      const listClientDeliveries = await findAllClientDeliveries.execute({ id_client })
      return response.status(200).json(listClientDeliveries)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
