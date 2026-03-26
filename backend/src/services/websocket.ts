// WebSocket broadcast service
import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import type { BotEvent } from '../types/index.js';

let wss: WebSocketServer | null = null;
const clients: Set<WebSocket> = new Set();

// Initialize WebSocket server
export function initializeWebSocket(server: any): void {
  wss = new WebSocketServer({ server, path: '/ws/bots' });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    console.log('[WS] Client connected from:', req.socket.remoteAddress);
    clients.add(ws);

    // Send initial connection confirmation
    ws.send(JSON.stringify({
      type: 'connected',
      timestamp: Date.now(),
      data: { message: 'Connected to Pixel Bot Monitor WS' }
    }));

    ws.on('close', () => {
      console.log('[WS] Client disconnected');
      clients.delete(ws);
    });

    ws.on('error', (error) => {
      console.error('[WS] Client error:', error);
      clients.delete(ws);
    });

    // Handle incoming messages from clients (if needed)
    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        console.log('[WS] Received:', message);
        // Future: handle client messages like subscribe to specific bots
      } catch (e) {
        console.error('[WS] Failed to parse message:', e);
      }
    });
  });

  console.log('[WS] WebSocket server initialized at /ws/bots');
}

// Broadcast event to all connected clients
export function broadcastEvent(event: BotEvent): void {
  if (!wss || clients.size === 0) {
    return;
  }

  const payload = JSON.stringify(event);

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}

// Broadcast a custom event type
export function broadcast(
  type: BotEvent['type'],
  botId: string,
  data: Record<string, unknown>
): void {
  const event: BotEvent = {
    type,
    botId,
    timestamp: Date.now(),
    data,
  };
  broadcastEvent(event);
}

// Get number of connected clients
export function getClientCount(): number {
  return clients.size;
}
