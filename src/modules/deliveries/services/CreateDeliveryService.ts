import { Delivery, PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import { CreateDeliveryDTO } from '../dtos/CreateDeliveryDTO'

@injectable()
export class CreateDeliveryService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async execute({ id_client, item_name }: CreateDeliveryDTO): Promise<Delivery> {
    const newDelivery = await this.prisma.delivery.create({
      data: { item_name, id_client },
    })

    return newDelivery
  }
}
