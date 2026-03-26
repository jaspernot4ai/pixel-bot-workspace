// Bot API routes
import { Router } from 'express';
import {
  getAllBotStates,
  getBotState,
  updateBotStatus,
  updateBotTask,
  updateBotPosition,
  setBotError,
  clearBotError
} from '../services/botState.js';
import { broadcast } from '../services/websocket.js';
import type { BotStatus, TaskType } from '../types/index.js';

const router = Router();

// GET /api/bots - Get all bot states
router.get('/', (_req, res) => {
  const bots = getAllBotStates();
  res.json({ bots, count: bots.length });
});

// GET /api/bots/:id - Get single bot state
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const bot = getBotState(id);

  if (!bot) {
    return res.status(404).json({ error: 'Bot not found', botId: id });
  }

  res.json(bot);
});

// PATCH /api/bots/:id/status - Update bot status
router.patch('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, position } = req.body as { status?: BotStatus; position?: { x: number; y: number } };

  if (!status) {
    return res.status(400).json({ error: 'status is required' });
  }

  const bot = updateBotStatus(id, status, position);

  if (!bot) {
    return res.status(404).json({ error: 'Bot not found', botId: id });
  }

  broadcast('bot.status.changed', id, {
    status: bot.status,
    position: bot.position,
    currentTask: bot.currentTask
  });

  res.json(bot);
});

// PATCH /api/bots/:id/task - Update bot task
router.patch('/:id/task', (req, res) => {
  const { id } = req.params;
  const { task, message } = req.body as { task: TaskType; message?: string };

  if (!task) {
    return res.status(400).json({ error: 'task is required' });
  }

  const bot = updateBotTask(id, task, message);

  if (!bot) {
    return res.status(404).json({ error: 'Bot not found', botId: id });
  }

  broadcast('bot.task.started', id, { task });

  res.json(bot);
});

// PATCH /api/bots/:id/position - Update bot position
router.patch('/:id/position', (req, res) => {
  const { id } = req.params;
  const { x, y } = req.body as { x: number; y: number };

  if (x === undefined || y === undefined) {
    return res.status(400).json({ error: 'x and y are required' });
  }

  const bot = updateBotPosition(id, { x, y });

  if (!bot) {
    return res.status(404).json({ error: 'Bot not found', botId: id });
  }

  broadcast('bot.status.changed', id, {
    status: bot.status,
    position: bot.position,
    currentTask: bot.currentTask
  });

  res.json(bot);
});

// POST /api/bots/:id/message - Bot sends a message (triggers message.sent event)
router.post('/:id/message', (req, res) => {
  const { id } = req.params;
  const { message, channel } = req.body as { message: string; channel?: string };

  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  const bot = getBotState(id);
  if (!bot) {
    return res.status(404).json({ error: 'Bot not found', botId: id });
  }

  updateBotTask(id, bot.currentTask || 'broadcast', message);

  broadcast('bot.message.sent', id, { message, channel: channel || 'unknown' });

  res.json({ success: true, botId: id, message });
});

// POST /api/bots/:id/error - Set bot error state
router.post('/:id/error', (req, res) => {
  const { id } = req.params;
  const { error } = req.body as { error: string };

  if (!error) {
    return res.status(400).json({ error: 'error message is required' });
  }

  const bot = setBotError(id, error);

  if (!bot) {
    return res.status(404).json({ error: 'Bot not found', botId: id });
  }

  broadcast('bot.error', id, { error });

  res.json(bot);
});

// POST /api/bots/:id/clear-error - Clear bot error state
router.post('/:id/clear-error', (req, res) => {
  const { id } = req.params;

  const bot = clearBotError(id);

  if (!bot) {
    return res.status(404).json({ error: 'Bot not found', botId: id });
  }

  broadcast('bot.status.changed', id, {
    status: bot.status,
    position: bot.position,
    currentTask: bot.currentTask
  });

  res.json(bot);
});

export default router;
