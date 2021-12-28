import { CompleteDeliveryController } from '@modules/deliveries/controllers/CompleteDeliveryController'
import { CreateDeliveryController } from '@modules/deliveries/controllers/CreateDeliverymanController'
import { FindAllPendingDeliveriesController } from '@modules/deliveries/controllers/FindAllPendingDeliveriesController'
import { UpdateDeliveryController } from '@modules/deliveries/controllers/UpdateDeliveryController'
import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares'

export const deliveriesRoutes = Router()

const createDeliveryController = new CreateDeliveryController()
const updateDeliveryController = new UpdateDeliveryController()
const completeDeliveryController = new CompleteDeliveryController()
const findAllPendingDeliveriesController = new FindAllPendingDeliveriesController()

deliveriesRoutes.post('/create', ensureAuthenticated, createDeliveryController.handle)

deliveriesRoutes.put(
  '/pickup/:id_delivery',
  ensureAuthenticated,
  updateDeliveryController.handle,
)
deliveriesRoutes.put(
  '/complete/:id_delivery',
  ensureAuthenticated,
  completeDeliveryController.handle,
)

deliveriesRoutes.get(
  '/pending',
  ensureAuthenticated,
  findAllPendingDeliveriesController.handle,
)
