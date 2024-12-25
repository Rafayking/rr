import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import { authenticateToken } from './middleware/auth';
import { setupWebSocket } from './websocket';
import { projectRoutes } from './routes/projects';
import { annotationRoutes } from './routes/annotations';
import { audioRoutes } from './routes/audio';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.VITE_CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(authenticateToken);

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/annotations', annotationRoutes);
app.use('/api/audio', audioRoutes);

// WebSocket setup
setupWebSocket(io);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});