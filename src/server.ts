import app from './app'
import mongoose from 'mongoose'
import config from './config'

// getting-started.js

async function server() {
  try {
    //config.database_url
    await mongoose.connect(
      `mongodb+srv://${config.database_user_name}:${config.database_password}@cluster0.r2wmywq.mongodb.net/my-first`,
    )

    console.log('Connected to MongoDB')
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

server().catch((err) => console.log(err))
