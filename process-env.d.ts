declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_USER_NAME: string
    DATABASE_USER_PASSWORD: string
    PORT: string
    DATABASE_URL_LOCAL: string
    DATABASE_URL: string
    NODE_ENV: string
  }
}
