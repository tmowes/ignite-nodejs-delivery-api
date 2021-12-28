import auth from '@config/auth'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import { AuthenticateDeliverymanDTO } from '../dtos/AuthenticateDeliverymanDTO'

@injectable()
export class AuthenticateDeliverymanService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async execute({ username, password }: AuthenticateDeliverymanDTO): Promise<string> {
    const { secret_token, expires_in_token } = auth
    const deliverymanExists = await this.prisma.deliveryman.findFirst({ where: { username } })

    if (!deliverymanExists) {
      throw new AppError('Credentials incorrect!', 400)
    }

    const passwordMatch = await compare(password, deliverymanExists.password)

    if (!passwordMatch) {
      throw new AppError('Credentials incorrect!', 400)
    }

    const token = sign({ username }, secret_token, {
      subject: deliverymanExists.id,
      expiresIn: expires_in_token,
    })

    return token
  }
}
