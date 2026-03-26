// shared/bot-config.ts
// Bot 初始座標、工位位置設定

export interface BotConfig {
  id: string;
  numericId: string;
  name: string;
  initialPosition: { x: number; y: number };
  taskZone: {
    heartbeat: { x: number; y: number };
    cron: { x: number; y: number };
    broadcast: { x: number; y: number };
    message_reply: { x: number; y: number };
    health_check: { x: number; y: number };
    alert: { x: number; y: number };
  };
}

export const BOT_CONFIGS: BotConfig[] = [
  {
    id: 'Frontend',
    numericId: '1484830086350897152',
    name: 'Frontend',
    initialPosition: { x: 0, y: 0 },
    taskZone: {
      heartbeat: { x: 5, y: 5 },
      cron: { x: 6, y: 5 },
      broadcast: { x: 7, y: 7 },
      message_reply: { x: 8, y: 7 },
      health_check: { x: 9, y: 9 },
      alert: { x: 10, y: 9 },
    },
  },
  {
    id: 'Backend',
    numericId: '1484830707124535396',
    name: 'Backend',
    initialPosition: { x: 1, y: 0 },
    taskZone: {
      heartbeat: { x: 5, y: 6 },
      cron: { x: 6, y: 6 },
      broadcast: { x: 7, y: 8 },
      message_reply: { x: 8, y: 8 },
      health_check: { x: 9, y: 10 },
      alert: { x: 10, y: 10 },
    },
  },
  {
    id: 'Data',
    numericId: '1484929073892429945',
    name: 'Data',
    initialPosition: { x: 2, y: 0 },
    taskZone: {
      heartbeat: { x: 5, y: 5 },
      cron: { x: 6, y: 5 },
      broadcast: { x: 7, y: 7 },
      message_reply: { x: 8, y: 7 },
      health_check: { x: 9, y: 9 },
      alert: { x: 10, y: 9 },
    },
  },
  {
    id: 'Devops',
    numericId: '1484929943417655296',
    name: 'Devops',
    initialPosition: { x: 3, y: 0 },
    taskZone: {
      heartbeat: { x: 5, y: 6 },
      cron: { x: 6, y: 6 },
      broadcast: { x: 7, y: 8 },
      message_reply: { x: 8, y: 8 },
      health_check: { x: 9, y: 10 },
      alert: { x: 10, y: 10 },
    },
  },
  {
    id: 'QA',
    numericId: '1484930371307966535',
    name: 'QA',
    initialPosition: { x: 4, y: 0 },
    taskZone: {
      heartbeat: { x: 5, y: 5 },
      cron: { x: 6, y: 5 },
      broadcast: { x: 7, y: 7 },
      message_reply: { x: 8, y: 7 },
      health_check: { x: 9, y: 9 },
      alert: { x: 10, y: 9 },
    },
  },
  {
    id: 'AI Engineer',
    numericId: '1484930784463949844',
    name: 'AI Engineer',
    initialPosition: { x: 5, y: 0 },
    taskZone: {
      heartbeat: { x: 5, y: 6 },
      cron: { x: 6, y: 6 },
      broadcast: { x: 7, y: 8 },
      message_reply: { x: 8, y: 8 },
      health_check: { x: 9, y: 10 },
      alert: { x: 10, y: 10 },
    },
  },
  {
    id: 'SecOps',
    numericId: '1484931134713364480',
    name: 'SecOps',
    initialPosition: { x: 6, y: 0 },
    taskZone: {
      heartbeat: { x: 5, y: 5 },
      cron: { x: 6, y: 5 },
      broadcast: { x: 7, y: 7 },
      message_reply: { x: 8, y: 7 },
      health_check: { x: 9, y: 9 },
      alert: { x: 10, y: 9 },
    },
  },
];

// 取得所有 Bot ID 清單
export const BOT_IDS = BOT_CONFIGS.map((b) => b.id);
