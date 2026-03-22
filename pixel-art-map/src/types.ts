// Shared type definitions for pixel-art-map
// Synced with Backend API v1

export type BotStatus = 'idle' | 'working' | 'broadcasting';

export interface Position {
  x: number;
  y: number;
}

export interface Bot {
  id: string;
  numericId: string;
  status: BotStatus;
  position: Position;
  currentTask: string | null;
  currentMessage: string | null;
  lastActive: number;
  uptime: number;
}

export interface BotsResponse {
  bots: Bot[];
  count: number;
}

export interface BotResponse extends Bot {}

// Map API types
export interface MapZones {
  botArea: { yStart: number; yEnd: number };
  generalTask: { yStart: number; yEnd: number };
  communicationTask: { yStart: number; yEnd: number };
  monitoringTask: { yStart: number; yEnd: number };
  decoration: { yStart: number; yEnd: number };
}

export interface MapConfig {
  width: number;
  height: number;
  tileSize: number;
  origin: string;
  zones: MapZones;
}

export interface MapDerived {
  tileSize: number;
  pixelWidth: number;
  pixelHeight: number;
  totalTiles: number;
}

export interface MapResponse {
  config: MapConfig;
  derived: MapDerived;
}

export const MAP_CONFIG = {
  width: 16,
  height: 16,
  tileSize: 32,
  origin: 'topLeft' as const,
};

// WebSocket event types
export type BotEventType = 
  | 'bot.status.changed'
  | 'bot.message.sent'
  | 'bot.task.started'
  | 'bot.task.completed'
  | 'bot.heartbeat'
  | 'bot.error'
  | 'bot.joined'
  | 'bot.left'
  | 'connected';

export interface WsMessage {
  type: BotEventType;
  botId?: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export interface WsConnectedData {
  message: string;
}

// Status update payload
export interface StatusUpdatePayload {
  status?: BotStatus;
  task?: string;
  position?: Position;
}
