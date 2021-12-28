import { Delivery, PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import { UpdateDeliveryDTO } from '../dtos/UpdateDeliveryDTO'

@injectable()
export class UpdateDeliveryService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async execute({ id_deliveryman, id_delivery }: UpdateDeliveryDTO): Promise<Delivery> {
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
