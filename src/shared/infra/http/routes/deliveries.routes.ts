import { CreateDeliveryController } from '@modules/deliveries/controllers/CreateDeliverymanController'
import { DeliveryCompleteController } from '@modules/deliveries/controllers/DeliveryCompleteController'
import { DeliveryPickupController } from '@modules/deliveries/controllers/DeliveryPickupController'
import { FindAllPendingDeliveriesController } from '@modules/deliveries/controllers/FindAllPendingDeliveriesController'
import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares'

export const deliveriesRoutes = Router()

const createDeliveryController = new CreateDeliveryController()
const deliveryPickupController = new DeliveryPickupController()
const deliveryCompleteController = new DeliveryCompleteController()
const findAllPendingDeliveriesController = new FindAllPendingDeliveriesController()

deliveriesRoutes.post('/create', ensureAuthenticated, createDeliveryController.handle)

deliveriesRoutes.put('/pickup/:id_delivery', ensureAuthenticated, deliveryPickupController.handle)

deliveriesRoutes.put('/complete/:id_delivery', ensureAuthenticated, deliveryCompleteController.handle)

deliveriesRoutes.get('/pending', ensureAuthenticated, findAllPendingDeliveriesController.handle)
