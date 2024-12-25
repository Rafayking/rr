import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

interface RealtimeState {
  socket: Socket | null;
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
}

export const useRealtimeStore = create<RealtimeState>((set) => ({
  socket: null,
  connected: false,
  connect: () => {
    const socket = io(import.meta.env.VITE_WS_URL || 'ws://localhost:3001', {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    socket.on('connect', () => {
      set({ connected: true });
    });

    socket.on('disconnect', () => {
      set({ connected: false });
    });

    set({ socket });
  },
  disconnect: () => {
    set((state) => {
      state.socket?.disconnect();
      return { socket: null, connected: false };
    });
  },
}));

export function useRealtime(projectId: number) {
  const { socket, connect, disconnect } = useRealtimeStore();

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('join:project', { projectId });

      return () => {
        socket.emit('leave:project', { projectId });
      };
    }
  }, [socket, projectId]);

  return {
    socket,
    connected: useRealtimeStore((state) => state.connected),
  };
}