import 'reflect-metadata'
import 'dotenv/config'
import cors from 'cors'
import express, { json, Request, Response, NextFunction } from 'express'

import 'express-async-errors'
import '@shared/container'
import AppError from '@shared/errors/AppError'

import { appRoutes } from './routes'

const app = express()

app.use(cors())

app.use(json())

app.use(appRoutes)

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    })
  },
)

export { app }
