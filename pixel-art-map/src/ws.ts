// WebSocket client for pixel-art-map
import type { WsMessage, BotEventType } from './types';

type MessageHandler = (msg: WsMessage) => void;

const WS_URL = 'ws://localhost:3001/ws/bots';

export class BotWebSocket {
  private ws: WebSocket | null = null;
  private handlers: Map<BotEventType, Set<MessageHandler>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(WS_URL);

        this.ws.onopen = () => {
          console.log('[WS] Connected to', WS_URL);
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const msg: WsMessage = JSON.parse(event.data);
            this.dispatch(msg);
          } catch (e) {
            console.error('[WS] Failed to parse message:', e);
          }
        };

        this.ws.onerror = (error) => {
          console.error('[WS] Error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('[WS] Disconnected');
          this.attemptReconnect();
        };
      } catch (e) {
        reject(e);
      }
    });
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('[WS] Max reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * this.reconnectAttempts;
    console.log(`[WS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

    setTimeout(() => {
      this.connect().catch(() => {});
    }, delay);
  }

  private dispatch(msg: WsMessage) {
    const handlers = this.handlers.get(msg.type);
    if (handlers) {
      handlers.forEach((handler) => handler(msg));
    }
  }

  on(type: BotEventType, handler: MessageHandler) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    this.handlers.get(type)!.add(handler);
  }

  off(type: BotEventType, handler: MessageHandler) {
    this.handlers.get(type)?.delete(handler);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Singleton instance
export const botWs = new BotWebSocket();
