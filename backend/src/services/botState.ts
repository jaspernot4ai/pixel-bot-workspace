// Bot state management service

import type { BotState, BotStatus, TaskType } from '../types/index.js';

// Bot config - duplicated from shared until ESM issue is resolved
const BOT_CONFIGS = [
  { id: 'Frontend', numericId: '1484830086350897152', initialPosition: { x: 0, y: 0 } },
  { id: 'Backend', numericId: '1484830707124535396', initialPosition: { x: 1, y: 0 } },
  { id: 'Data', numericId: '1484929073892429945', initialPosition: { x: 2, y: 0 } },
  { id: 'Devops', numericId: '1484929943417655296', initialPosition: { x: 3, y: 0 } },
  { id: 'QA', numericId: '1484930371307966535', initialPosition: { x: 4, y: 0 } },
  { id: 'AI Engineer', numericId: '1484930784463949844', initialPosition: { x: 5, y: 0 } },
  { id: 'SecOps', numericId: '1484931134713364480', initialPosition: { x: 6, y: 0 } },
];

// In-memory bot states
const botStates: Map<string, BotState> = new Map();

// Initialize all bots with their default states
export function initializeBotStates(): void {
  for (const config of BOT_CONFIGS) {
    const state: BotState = {
      id: config.id,
      numericId: config.numericId,
      status: 'idle',
      position: { ...config.initialPosition },
      currentTask: null,
      currentMessage: null,
      lastActive: Date.now(),
      uptime: 0,
    };
    botStates.set(config.id, state);
  }
}

// Get all bot states
export function getAllBotStates(): BotState[] {
  return Array.from(botStates.values());
}

// Get a single bot state by ID
export function getBotState(botId: string): BotState | undefined {
  return botStates.get(botId);
}

// Update bot status
export function updateBotStatus(
  botId: string,
  status: BotStatus,
  position?: { x: number; y: number }
): BotState | undefined {
  const state = botStates.get(botId);
  if (!state) return undefined;

  state.status = status;
  if (position) {
    state.position = position;
  }
  state.lastActive = Date.now();

  return state;
}

// Update bot task
export function updateBotTask(
  botId: string,
  task: TaskType,
  message?: string
): BotState | undefined {
  const state = botStates.get(botId);
  if (!state) return undefined;

  state.currentTask = task;
  if (message !== undefined) {
    state.currentMessage = message;
  }
  state.lastActive = Date.now();

  return state;
}

// Update bot position
export function updateBotPosition(
  botId: string,
  position: { x: number; y: number }
): BotState | undefined {
  const state = botStates.get(botId);
  if (!state) return undefined;

  state.position = position;
  state.lastActive = Date.now();

  return state;
}

// Set bot error status
export function setBotError(botId: string, errorMessage: string): BotState | undefined {
  const state = botStates.get(botId);
  if (!state) return undefined;

  state.status = 'error';
  state.currentMessage = errorMessage;
  state.lastActive = Date.now();

  return state;
}

// Clear error and set to idle
export function clearBotError(botId: string): BotState | undefined {
  const state = botStates.get(botId);
  if (!state) return undefined;

  state.status = 'idle';
  state.currentMessage = null;
  state.lastActive = Date.now();

  return state;
}
