import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { AuthenticateClientService } from '../services/AuthenticateClientService'

export class AuthenticateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password } = request.body
      const authenticateClient = container.resolve(AuthenticateClientService)
      const authenticatedClient = await authenticateClient.execute({ username, password })
      return response.status(200).json(authenticatedClient)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
