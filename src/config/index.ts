import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

const config = {
  port: process.env.PORT,
  database_url_local: process.env.DATABASE_URL_LOCAL,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  database_user_name: process.env.DATABASE_USER_NAME,
  database_password: process.env.DATABASE_USER_PASSWORD,
}

export default config
