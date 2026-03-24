/**
 * Pixel Office - Shared Types
 * 定義 Frontend 和 Backend 共用的資料結構
 */

// ============================================================
// 地圖與位置
// ============================================================

export interface Position {
  x: number; // tile X (0-15)
  y: number; // tile Y (0-15)
}

export interface MapConfig {
  width: number;      // 地圖寬度 tiles (預設 16)
  height: number;     // 地圖高度 tiles (預設 16)
  tileSize: number;   // 每格像素 (預設 32)
}

// ============================================================
// Bot 視覺化狀態
// ============================================================

export type BotVisualState =
  | 'idle'        // 待機：綠色小點
  | 'working'     // 工作中：藍色齒輪
  | 'speaking'    // 廣播中：紅色驚嘆號
  | 'error';      // 錯誤：紅色閃爍

// ============================================================
// Bot 狀態 (主要資料結構)
// ============================================================

export interface BotStatus {
  id: string;
  name: string;
  state: BotVisualState;
  position: Position;         // 當前 tile 座標
  currentTask?: string;       // 目前執行的任務
  lastActive: number;        // timestamp
  avatar: string;             // 頭像 URL 或路徑
}

// ============================================================
// Bot 靜態配置 (寫死在設定檔)
// ============================================================

export interface BotConfig {
  id: string;
  name: string;
  position: Position;         // 4x4 tile 區塊的左上角
  pixelSize: number;           // 像素風格解析度 (16 or 32)
}

// ============================================================
// 地圖區域定義
// ============================================================

export type ZoneType = 'bot' | 'task' | 'broadcast' | 'monitor' | 'idle';

export interface Zone {
  type: ZoneType;
  x: number;
  y: number;
  width: number;   // tiles
  height: number;  // tiles
}

// 地圖區域規劃 (SOUL.md 定義)
export const MAP_ZONES: Zone[] = [
  // y 0-3: Bot 工位區 (上半)
  { type: 'bot', x: 0, y: 0, width: 4, height: 4 },   // Frontend
  { type: 'bot', x: 0, y: 4, width: 4, height: 4 },   // Backend
  { type: 'bot', x: 0, y: 8, width: 4, height: 4 },   // Data
  { type: 'bot', x: 0, y: 12, width: 4, height: 4 },  // Devops
  { type: 'bot', x: 4, y: 0, width: 4, height: 4 },   // QA
  { type: 'bot', x: 4, y: 4, width: 4, height: 4 },   // AI Engineer
  { type: 'bot', x: 4, y: 8, width: 4, height: 4 },   // SecOps
  { type: 'bot', x: 4, y: 12, width: 4, height: 4 },  // 預留
  { type: 'bot', x: 8, y: 0, width: 4, height: 4 },   // 預留
  { type: 'bot', x: 8, y: 4, width: 4, height: 4 },    // 預留
  { type: 'bot', x: 8, y: 8, width: 4, height: 4 },    // 預留
  { type: 'bot', x: 8, y: 12, width: 4, height: 4 },   // 預留
  // y 5-7: 任務執行區
  // y 8-10: 通訊區 (broadcast)
  // y 11-13: 監控區
  // y 14-15: 閒置/裝飾區
];

// ============================================================
// WebSocket 事件 (由 Gateway 推送)
// ============================================================

export type BotEventType =
  | 'bot.status.changed'
  | 'bot.message.sent'
  | 'bot.task.started'
  | 'bot.task.completed'
  | 'bot.heartbeat'
  | 'bot.error';

export interface BotStatusChangedEvent {
  type: 'bot.status.changed';
  botId: string;
  oldState: BotVisualState;
  newState: BotVisualState;
  timestamp: number;
}

export interface BotMessageSentEvent {
  type: 'bot.message.sent';
  botId: string;
  message: string;
  channel: string;
  timestamp: number;
}

export interface BotTaskStartedEvent {
  type: 'bot.task.started';
  botId: string;
  task: string;
  timestamp: number;
}

export interface BotTaskCompletedEvent {
  type: 'bot.task.completed';
  botId: string;
  task: string;
  duration: number;
  timestamp: number;
}

export interface BotHeartbeatEvent {
  type: 'bot.heartbeat';
  botId: string;
  timestamp: number;
}

export interface BotErrorEvent {
  type: 'bot.error';
  botId: string;
  error: string;
  timestamp: number;
}

export type BotEvent =
  | BotStatusChangedEvent
  | BotMessageSentEvent
  | BotTaskStartedEvent
  | BotTaskCompletedEvent
  | BotHeartbeatEvent
  | BotErrorEvent;

// ============================================================
// API 回應格式
// ============================================================

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

export interface BotsListResponse {
  bots: BotStatus[];
  timestamp: number;
}

export interface MapResponse {
  config: MapConfig;
  zones: Zone[];
  bots: BotStatus[];
}
