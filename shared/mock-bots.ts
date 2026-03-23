// mock-bots.json - Pixel Office Bot 模擬資料
// Pokemon 分配根據討論結果

import type { Bot, BotStatus } from '../pixel-art-map/src/types';

export const MOCK_BOTS: Bot[] = [
  {
    id: 'Frontend',
    numericId: '1484830086350897152',
    name: 'Frontend',
    pokemon: 'Pikachu',
    status: 'idle',
    position: { x: 0, y: 0 },
    currentTask: null,
    currentMessage: null,
    lastActive: Date.now(),
    uptime: 0,
  },
  {
    id: 'Backend',
    numericId: '1484830707124535396',
    name: 'Backend',
    pokemon: 'Snorlax',
    status: 'idle',
    position: { x: 1, y: 0 },
    currentTask: null,
    currentMessage: null,
    lastActive: Date.now(),
    uptime: 0,
  },
  {
    id: 'Data',
    numericId: '1484929073892429945',
    name: 'Data',
    pokemon: 'Meowth',
    status: 'idle',
    position: { x: 2, y: 0 },
    currentTask: null,
    currentMessage: null,
    lastActive: Date.now(),
    uptime: 0,
  },
  {
    id: 'Devops',
    numericId: '1484929943417655296',
    name: 'Devops',
    pokemon: 'Onix',
    status: 'idle',
    position: { x: 3, y: 0 },
    currentTask: null,
    currentMessage: null,
    lastActive: Date.now(),
    uptime: 0,
  },
  {
    id: 'QA',
    numericId: '1484930371307966535',
    name: 'QA',
    pokemon: 'Snorunt',
    status: 'idle',
    position: { x: 4, y: 0 },
    currentTask: null,
    currentMessage: null,
    lastActive: Date.now(),
    uptime: 0,
  },
  {
    id: 'AI Engineer',
    numericId: '1484930784463949844',
    name: 'AI Engineer',
    pokemon: 'Ralts',
    status: 'idle',
    position: { x: 5, y: 0 },
    currentTask: null,
    currentMessage: null,
    lastActive: Date.now(),
    uptime: 0,
  },
  {
    id: 'SecOps',
    numericId: '1484931134713364480',
    name: 'SecOps',
    pokemon: 'Dreepy',
    status: 'idle',
    position: { x: 6, y: 0 },
    currentTask: null,
    currentMessage: null,
    lastActive: Date.now(),
    uptime: 0,
  },
];

// 狀態顏色對應
export const STATUS_COLORS: Record<BotStatus, string> = {
  idle: '#22c55e',        // 綠色
  working: '#3b82f6',     // 藍色
  broadcasting: '#ef4444', // 紅色
  error: '#ff0000',        // 亮紅色
};
