import auth from '@config/auth'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import { AuthenticateClientDTO } from '../dtos/AuthenticateClientDTO'

@injectable()
export class AuthenticateClientService {
  constructor(
    @inject('PrismaClient')
    private prisma: PrismaClient,
  ) {}

  async execute({ username, password }: AuthenticateClientDTO): Promise<string> {
    const { secret_token, expires_in_token } = auth
    const clientExists = await this.prisma.client.findFirst({ where: { username } })

    if (!clientExists) {
      throw new AppError('Credentials incorrect!', 400)
    }

    const passwordMatch = await compare(password, clientExists.password)

    if (!passwordMatch) {
      throw new AppError('Credentials incorrect!', 400)
    }

    const token = sign({ username }, secret_token, {
      subject: clientExists.id,
      expiresIn: expires_in_token,
    })

    return token
  }
}
