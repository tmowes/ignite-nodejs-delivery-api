import { AuthenticateClientController } from '@modules/clients/controllers/AuthenticateUserController'
import { CreateClientController } from '@modules/clients/controllers/CreateClientController'
import { FindAllClientDeliveriesController } from '@modules/clients/controllers/FindAllClientDeliveriesController'
import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares'

export const clientsRoutes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const findAllClientDeliveriesController = new FindAllClientDeliveriesController()

clientsRoutes.post('/create', createClientController.handle)

clientsRoutes.post('/login', authenticateClientController.handle)

clientsRoutes.get('/deliveries', ensureAuthenticated, findAllClientDeliveriesController.handle)
