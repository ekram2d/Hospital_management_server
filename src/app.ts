/* eslint-disable no-unused-vars */
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { userRoutes } from './routes/user.route'
import { doctorFeatureRoutes } from './routes/doctor-features.route'
import { patientRoutes } from './routes/patients.route'
import { medicineRoutes } from './routes/medicine.route'

const app: Application = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/doctors', doctorFeatureRoutes)
app.use('/api/v1/patients', patientRoutes)
app.use('/api/v1/medicine', medicineRoutes)

// Default route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the doctor pages',
  })
})

// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('error', err.stack)
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

export default app
