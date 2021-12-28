declare namespace Express {
  export interface Request {
    user: {
      id: string
    }
  }
}

type CustomEnvVar =
  | 'DATABASE_URL'
  | 'SECRET_TOKEN'
  | 'EXPIRES_IN_TOKEN'
  | 'SECRET_REFRESH_TOKEN'
  | 'EXPIRES_IN_REFRESH_TOKEN'
  | 'EXPIRES_REFRESH_TOKEN_DAYS'

type ProcessEnvExtended = {
  [key in CustomEnvVar]: string
}

declare namespace NodeJS {
  export interface ProcessEnv extends ProcessEnvExtended {}
}
