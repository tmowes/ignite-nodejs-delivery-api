import { Client, PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import { CreateClientDTO } from '../dtos/CreateClientDTO'

@injectable()
export class CreateClientService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async execute({ username, password }: CreateClientDTO): Promise<Client> {
    const clientExists = await this.prisma.client.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
    })

    if (clientExists) {
      throw new AppError('Client already exists!', 403)
    }

    const hashedPassword = await hash(password, 10)

    const newUser = this.prisma.client.create({
      data: {
        username,
        password: hashedPassword,
      },
    })

    return newUser
  }
}
