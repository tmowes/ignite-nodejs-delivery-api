import { Request, Response, Router } from 'express'

import { clientsRoutes } from './clients.routes'
import { deliveriesRoutes } from './deliveries.routes'
import { deliverymenRoutes } from './deliverymen.routes'

export const appRoutes = Router()

appRoutes.use('/client', clientsRoutes)

appRoutes.use('/deliveryman', deliverymenRoutes)

appRoutes.use('/delivery', deliveriesRoutes)

appRoutes.get('/', (req: Request, res: Response) => {
  return res.json({
    client: 'If you are client, access "/client/deliveries" to see all your deliveries',
    deliveryman: 'If you are deliveryman, access "/deliveryman/deliveries" to see all your deliveries',
  })
})
