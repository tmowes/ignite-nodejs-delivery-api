import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { AuthenticateDeliverymanService } from '../services/AuthenticateDeliverymanService'

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password } = request.body
      const authenticateDeliveryman = container.resolve(AuthenticateDeliverymanService)
      const authDeliveryman = await authenticateDeliveryman.execute({ username, password })
      return response.status(200).json(authDeliveryman)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
