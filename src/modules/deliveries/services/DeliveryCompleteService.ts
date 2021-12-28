import { Delivery, PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import { DeliveryCompleteDTO } from '../dtos/DeliveryCompleteDTO'

@injectable()
export class DeliveryCompleteService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async execute({ id_deliveryman, id_delivery }: DeliveryCompleteDTO): Promise<Delivery> {
    const deliveryExists = await this.prisma.delivery.findFirst({
      where: {
        id: id_delivery,
        id_deliveryman,
        end_at: null,
      },
    })

    if (!deliveryExists) {
      throw new AppError('Pending delivery not found!', 404)
    }

    const completeDelivery = await this.prisma.delivery.update({
      where: { id: deliveryExists.id },
      data: { end_at: new Date() },
    })

    return completeDelivery
  }
}
