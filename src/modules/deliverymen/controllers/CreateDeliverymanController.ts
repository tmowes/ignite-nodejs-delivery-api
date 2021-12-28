import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { CreateDeliverymanService } from '../services/CreateDeliverymanService'

export class CreateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password } = request.body
      const createDeliveryman = container.resolve(CreateDeliverymanService)
      const createdDeliveryman = await createDeliveryman.execute({ username, password })
      return response.status(200).json(createdDeliveryman)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
