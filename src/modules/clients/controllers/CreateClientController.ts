import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { CreateClientService } from '../services/CreateClientService'

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password } = request.body
      const createClient = container.resolve(CreateClientService)
      const createdClient = await createClient.execute({ username, password })
      return response.status(200).json(createdClient)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
