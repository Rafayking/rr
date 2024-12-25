import { Server, Socket } from 'socket.io';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

interface AuthenticatedSocket extends Socket {
  user?: any;
}

export function setupWebSocket(io: Server) {
  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (error || !user) {
        return next(new Error('Invalid token'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  // Connection handler
  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log('Client connected:', socket.id);

    // Join project room
    socket.on('join:project', ({ projectId }) => {
      socket.join(`project:${projectId}`);
      console.log(`Socket ${socket.id} joined project ${projectId}`);
    });

    // Leave project room
    socket.on('leave:project', ({ projectId }) => {
      socket.leave(`project:${projectId}`);
      console.log(`Socket ${socket.id} left project ${projectId}`);
    });

    // Annotation updates
    socket.on('annotation:update', (data) => {
      socket.to(`project:${data.projectId}`).emit('annotation:updated', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}