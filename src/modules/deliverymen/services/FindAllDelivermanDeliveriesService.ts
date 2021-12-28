import { Delivery, Deliveryman, PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import { FindAllDelivermanDeliveriesDTO } from '../dtos/FindAllDelivermanDeliveriesDTO'

@injectable()
export class FindAllDelivermanDeliveriesService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async execute({
    id_deliveryman,
  }: FindAllDelivermanDeliveriesDTO): Promise<(Partial<Deliveryman> & { deliveries: Delivery[] })[]> {
    const allDeliverymanDeliveries = await this.prisma.deliveryman.findMany({
      where: { id: id_deliveryman },
      select: {
        id: true,
        username: true,
        deliveries: true,
      },
    })

    return allDeliverymanDeliveries
  }
}
