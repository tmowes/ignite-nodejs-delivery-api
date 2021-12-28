import { Deliveryman, PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import { CreateDeliverymanDTO } from '../dtos/CreateDeliverymanDTO'

@injectable()
export class CreateDeliverymanService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async execute({ username, password }: CreateDeliverymanDTO): Promise<Deliveryman> {
    const deliverymanExists = await this.prisma.deliveryman.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
    })

    if (deliverymanExists) {
      throw new AppError('Deliveryman already exists!', 403)
    }

    const hashedPassword = await hash(password, 10)

    const newDeliveryMan = this.prisma.deliveryman.create({
      data: {
        username,
        password: hashedPassword,
      },
    })

    return newDeliveryMan
  }
}
