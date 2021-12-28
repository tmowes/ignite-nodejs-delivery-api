import { Delivery, PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import { DeliveryPickupDTO } from '../dtos/DeliveryPickupDTO'

@injectable()
export class DeliveryPickupService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async execute({ id_deliveryman, id_delivery }: DeliveryPickupDTO): Promise<Delivery> {
    const updatedDelivery = await this.prisma.delivery.update({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      },
    })

    return updatedDelivery
  }
}
