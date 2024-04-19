import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { userRoutes } from './routes/user.route';
import { doctorFeatureRoutes } from './routes/doctor-features.route';
import { patientRoutes } from './routes/patients.route';
import { medicineRoutes } from './routes/medicine.route';
import config from './config';

// Create an Express application
const app: Application = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Create an HTTP server using Express
const server = http.createServer(app);

// Set up Socket.io server
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Socket.io connection handling
io.on("connection", (socket: Socket) => {
  console.log('A user connected');

  socket.on("chat", (chat: any) => {
    io.emit('chat', chat);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/doctors', doctorFeatureRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/medicine', medicineRoutes);

// Default route
// app.get('/', (req: Request, res: Response) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'Welcome to the doctor pages',
//   });
// });


// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
