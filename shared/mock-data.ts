/**
 * Pixel Office - Mock Data
 * 讓 Frontend 可以先基於這些資料開發 UI
 */

import type { BotStatus, MapConfig, BotConfig } from './bot.types';

// ============================================================
// 地圖設定
// ============================================================

export const MAP_CONFIG: MapConfig = {
  width: 16,
  height: 16,
  tileSize: 32,
};

// ============================================================
// Bot 靜態設定 (4x4 tile 區塊)
// ============================================================

export const BOT_CONFIGS: BotConfig[] = [
  { id: 'frontend',   name: 'Frontend',    position: { x: 0, y: 0 },  pixelSize: 32 },
  { id: 'backend',    name: 'Backend',     position: { x: 0, y: 4 },  pixelSize: 32 },
  { id: 'data',       name: 'Data',        position: { x: 0, y: 8 },  pixelSize: 32 },
  { id: 'devops',     name: 'Devops',      position: { x: 0, y: 12 }, pixelSize: 32 },
  { id: 'qa',         name: 'QA',           position: { x: 4, y: 0 },  pixelSize: 32 },
  { id: 'aiEngineer', name: 'AI Engineer', position: { x: 4, y: 4 },  pixelSize: 32 },
  { id: 'secOps',     name: 'SecOps',      position: { x: 4, y: 8 },  pixelSize: 32 },
];

// ============================================================
// Pokemon 對應
// ============================================================

export const BOT_POKEMON: Record<string, string> = {
  frontend:   'Pikachu',      // 電力十足，活潑可愛
  backend:    'Snorlax',      // 懶惰工程師，躺平大師
  data:       'Meowth',       // 數據導向
  devops:     'Onix',         // 穩定可靠，岩石系
  qa:         'Snorunt',      // 測試精靈
  aiEngineer: 'Ralts',        // 感知型 AI
  secOps:     'Dreepy',       // 隱密監視
};

// ============================================================
// Mock Bot 狀態
// ============================================================

export const MOCK_BOTS: BotStatus[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    state: 'working',
    position: { x: 0, y: 0 },
    currentTask: '開發 Pixel Office UI',
    lastActive: Date.now(),
    avatar: '/pixels/frontend-pikachu.png',
  },
  {
    id: 'backend',
    name: 'Backend',
    state: 'idle',
    position: { x: 0, y: 4 },
    currentTask: '建立 shared types',
    lastActive: Date.now(),
    avatar: '/pixels/backend-snorlax.png',
  },
  {
    id: 'data',
    name: 'Data',
    state: 'idle',
    position: { x: 0, y: 8 },
    currentTask: '待命',
    lastActive: Date.now() - 300000,
    avatar: '/pixels/data-meowth.png',
  },
  {
    id: 'devops',
    name: 'Devops',
    state: 'idle',
    position: { x: 0, y: 12 },
    currentTask: '待命',
    lastActive: Date.now() - 600000,
    avatar: '/pixels/devops-onix.png',
  },
  {
    id: 'qa',
    name: 'QA',
    state: 'idle',
    position: { x: 4, y: 0 },
    currentTask: '待命',
    lastActive: Date.now() - 120000,
    avatar: '/pixels/qa-snorunt.png',
  },
  {
    id: 'aiEngineer',
    name: 'AI Engineer',
    state: 'idle',
    position: { x: 4, y: 4 },
    currentTask: '待命',
    lastActive: Date.now() - 900000,
    avatar: '/pixels/ai-ralts.png',
  },
  {
    id: 'secOps',
    name: 'SecOps',
    state: 'idle',
    position: { x: 4, y: 8 },
    currentTask: '待命',
    lastActive: Date.now() - 1800000,
    avatar: '/pixels/secops-dreepy.png',
  },
];

// ============================================================
// 狀態顏色對應 (UI 渲染用)
// ============================================================

export const STATE_COLORS: Record<BotStatus['state'], string> = {
  idle:    '#22c55e',  // 綠色
  working: '#3b82f6',  // 藍色
  speaking: '#eab308', // 黃色
  error:   '#ef4444',  // 紅色
};
