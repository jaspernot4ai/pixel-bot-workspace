// shared/events.ts
// WebSocket 事件型別定義

export type BotStatus = 'idle' | 'working' | 'broadcasting' | 'error';

export type TaskType =
  | 'heartbeat'
  | 'cron'
  | 'broadcast'
  | 'message_reply'
  | 'health_check'
  | 'alert'
  | null;

export interface BotState {
  id: string;
  numericId: string;
  status: BotStatus;
  position: { x: number; y: number };
  currentTask: TaskType;
  currentMessage: string | null;
  lastActive: number;
  uptime: number;
}

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
  data: Record<string, unknown>;
}

// 事件 payload 具體型別
export interface BotStatusChangedData {
  status: BotStatus;
  position: { x: number; y: number };
  currentTask: TaskType;
}

export interface BotMessageSentData {
  message: string;
  channel: string;
}

export interface BotTaskData {
  task: TaskType;
  targetPosition?: { x: number; y: number };
}

export interface BotHeartbeatData {
  timestamp: number;
}

export interface BotErrorData {
  error: string;
}
