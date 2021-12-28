import { Delivery, PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import { UpdateDeliveryDTO } from '../dtos/UpdateDeliveryDTO'

@injectable()
export class CompleteDeliveryService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async execute({ id_deliveryman, id_delivery }: UpdateDeliveryDTO): Promise<Delivery> {
    // const completeDelivery = await this.prisma.delivery.updateMany({
    //   where: {
    //     id: id_delivery,
    //     id_deliveryman,
    //   },
    //   data: {
    //     end_at: new Date(),
    //   },
    // })
    
    const completeDelivery = await this.prisma.delivery.update({
      where: {
        id: id_delivery,
      },
      data: {
        end_at: new Date(),
      },
    })

    // TODO:
    // verificar se já não foi completada e melhorar retorno

    return completeDelivery
  }
}
