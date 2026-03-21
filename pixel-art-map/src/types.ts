// Shared type definitions for pixel-art-map
// These should stay in sync with Backend's shared/ types

export type BotStatus = 'idle' | 'working' | 'broadcasting';

export interface Position {
  x: number;
  y: number;
}

export interface Bot {
  id: string;
  name: string;
  status: BotStatus;
  position: Position;
  task?: string;
}

export interface Tile {
  type: TileType;
  zone: MapZone;
}

export type TileType = 'empty' | 'bot-station' | 'task-area' | 'comms' | 'monitoring' | 'idle';

export type MapZone = 
  | 'bot-stations'   // y 0-4
  | 'task-execution' // y 5-10
  | 'comms'          // y 8-10 (overlap)
  | 'monitoring'     // y 11-13
  | 'idle';          // y 14-15

export interface MapConfig {
  width: number;    // 16 tiles
  height: number;   // 16 tiles
  tileSize: number; // 32 pixels
}

export const MAP_CONFIG: MapConfig = {
  width: 16,
  height: 16,
  tileSize: 32,
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
  | 'bot.left';

export interface BotEvent {
  type: BotEventType;
  botId: string;
  timestamp: number;
  data?: Record<string, unknown>;
}
