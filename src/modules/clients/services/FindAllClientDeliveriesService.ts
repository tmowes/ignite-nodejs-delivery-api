import { Client, Delivery, PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import { FindAllClientDeliveriesDTO } from '../dtos/FindAllClientDeliveriesDTO'

@injectable()
export class FindAllClientDeliveriesService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async execute({
    id_client,
  }: FindAllClientDeliveriesDTO): Promise<(Partial<Client> & { deliveries: Delivery[] })[]> {
    const allClientDeliveries = await this.prisma.client.findMany({
      where: { id: id_client },
      select: {
        id: true,
        username: true,
        deliveries: true,
      },
    })

    return allClientDeliveries
  }
}
