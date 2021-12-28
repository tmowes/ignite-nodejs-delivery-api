import { Delivery, PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FindAllPendingDeliveriesService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async execute(): Promise<Delivery[]> {
    const allDeliveries = await this.prisma.delivery.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
    })

    return allDeliveries
  }
}
