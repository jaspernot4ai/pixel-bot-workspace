// Re-export shared types for backend use
export type { BotStatus, TaskType, BotState, BotEventType, BotEvent } from '@pixel-bot-monitor/shared/events';
export type { BotConfig } from '@pixel-bot-monitor/shared/bot-config';
export type { MapConfig } from '@pixel-bot-monitor/shared/map-config';
export {
  BOT_CONFIGS,
  BOT_IDS
} from '@pixel-bot-monitor/shared/bot-config';
export {
  MAP_CONFIG,
  TILE_SIZE,
  MAP_PIXEL_WIDTH,
  MAP_PIXEL_HEIGHT
} from '@pixel-bot-monitor/shared/map-config';
