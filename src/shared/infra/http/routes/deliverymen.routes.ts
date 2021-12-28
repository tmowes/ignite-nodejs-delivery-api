import { AuthenticateDeliverymanController } from '@modules/deliverymen/controllers/AuthenticateDeliverymanController'
import { CreateDeliverymanController } from '@modules/deliverymen/controllers/CreateDeliverymanController'
import { FindAllDelivermanDeliveriesController } from '@modules/deliverymen/controllers/FindAllDelivermanDeliveriesController'
import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares'

export const deliverymenRoutes = Router()

const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const findAllDelivermanDeliveriesController = new FindAllDelivermanDeliveriesController()

deliverymenRoutes.post('/create', createDeliverymanController.handle)

deliverymenRoutes.post('/login', authenticateDeliverymanController.handle)

deliverymenRoutes.get('/deliveries', ensureAuthenticated, findAllDelivermanDeliveriesController.handle)
