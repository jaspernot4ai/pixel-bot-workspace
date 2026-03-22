import { renderMap } from './map';
import { fetchBots, fetchMap } from './api';
import { botWs } from './ws';
import { BubbleAnimator } from './animations';
import { MAP_CONFIG, Bot } from './types';

const canvas = document.getElementById('map') as HTMLCanvasElement;
if (!canvas) throw new Error('Canvas not found');

const ctx = canvas.getContext('2d')!;

canvas.width = MAP_CONFIG.width * MAP_CONFIG.tileSize;
canvas.height = MAP_CONFIG.height * MAP_CONFIG.tileSize;

// State
let bots: Bot[] = [];
const bubbleAnimator = new BubbleAnimator(canvas, ctx, renderBots);

// Render function
function renderBots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderMap(ctx);

  for (const bot of bots) {
    renderBot(ctx, bot);
  }

  // Draw message bubbles on top
  bubbleAnimator.draw(ctx);
}

function renderBot(ctx: CanvasRenderingContext2D, bot: Bot) {
  const x = bot.position.x * MAP_CONFIG.tileSize + MAP_CONFIG.tileSize / 2;
  const y = bot.position.y * MAP_CONFIG.tileSize + MAP_CONFIG.tileSize / 2;

  const colors: Record<string, string> = {
    idle: '#22c55e',        // green
    working: '#3b82f6',     // blue
    broadcasting: '#ef4444', // red
  };

  // Draw status circle with animation (pulse for working)
  const radius = bot.status === 'working' ? 8 + Math.sin(Date.now() / 200) * 2 : 8;

  ctx.fillStyle = colors[bot.status] || colors.idle;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Pixel border
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw bot name below
  ctx.fillStyle = '#fff';
  ctx.font = '8px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(bot.id, x, y + 18, MAP_CONFIG.tileSize - 4);

  // Draw current task if any
  if (bot.currentTask) {
    ctx.fillStyle = '#9ca3af';
    ctx.font = '6px monospace';
    ctx.fillText(bot.currentTask.substring(0, 8), x, y + 28, MAP_CONFIG.tileSize - 4);
  }
}

// Event handlers
function handleBotStatusChanged(botId: string, newStatus: string, data?: Record<string, unknown>) {
  const bot = bots.find((b) => b.id === botId);
  if (bot) {
    bot.status = newStatus as Bot['status'];
    if (data?.task) bot.currentTask = data.task as string;
    renderBots();
  }
}

function handleBotMessageSent(botId: string, message: string, timestamp: number) {
  const bot = bots.find((b) => b.id === botId);
  if (bot) {
    bot.currentMessage = message;

    // Show bubble animation
    const x = bot.position.x * MAP_CONFIG.tileSize + MAP_CONFIG.tileSize / 2;
    const y = bot.position.y * MAP_CONFIG.tileSize + MAP_CONFIG.tileSize / 2;
    bubbleAnimator.show({ id: `${botId}-${timestamp}`, botId, message, x, y, timestamp });

    renderBots();
  }
}

function handleTaskStarted(botId: string, task: string) {
  const bot = bots.find((b) => b.id === botId);
  if (bot) {
    bot.currentTask = task;
    bot.status = 'working';
    renderBots();
  }
}

function handleTaskCompleted(botId: string) {
  const bot = bots.find((b) => b.id === botId);
  if (bot) {
    bot.currentTask = null;
    bot.status = 'idle';
    renderBots();
  }
}

// Initialize
async function init() {
  try {
    // Fetch initial data
    const [botsRes, _mapRes] = await Promise.all([fetchBots(), fetchMap()]);
    bots = botsRes.bots;
    console.log('[Init] Loaded', bots.length, 'bots');
  } catch (e) {
    console.warn('[Init] API not available, using demo mode');
    // Demo mode with mock data
    bots = [
      {
        id: 'Frontend',
        numericId: '1484830086350897152',
        status: 'idle',
        position: { x: 0, y: 1 },
        currentTask: null,
        currentMessage: null,
        lastActive: Date.now(),
        uptime: 0,
      },
      {
        id: 'Backend',
        numericId: '1484830707124535396',
        status: 'idle',
        position: { x: 1, y: 1 },
        currentTask: null,
        currentMessage: null,
        lastActive: Date.now(),
        uptime: 0,
      },
    ];
  }

  // Initial render
  renderBots();

  // Set up WebSocket handlers
  botWs.on('bot.status.changed', (msg) => {
    handleBotStatusChanged(msg.botId!, msg.data?.status as string, msg.data);
  });

  botWs.on('bot.message.sent', (msg) => {
    handleBotMessageSent(
      msg.botId!,
      msg.data?.message as string,
      msg.timestamp
    );
  });

  botWs.on('bot.task.started', (msg) => {
    handleTaskStarted(msg.botId!, msg.data?.task as string);
  });

  botWs.on('bot.task.completed', (msg) => {
    handleTaskCompleted(msg.botId!);
  });

  botWs.on('bot.error', (msg) => {
    const bot = bots.find((b) => b.id === msg.botId);
    if (bot) {
      bot.status = 'broadcasting'; // Error = red
      renderBots();
    }
  });

  // Try to connect (will fail gracefully if server not running)
  botWs.connect().catch(() => {
    console.warn('[WS] WebSocket connection failed, running in demo mode');
  });

  // Demo mode: simulate status changes
  setInterval(() => {
    if (bots.length > 0) {
      const bot = bots[0];
      const statuses: Bot['status'][] = ['idle', 'working', 'broadcasting'];
      const currentIndex = statuses.indexOf(bot.status);
      bot.status = statuses[(currentIndex + 1) % statuses.length];
      renderBots();
    }
  }, 3000);

  // Demo: simulate message every 8 seconds
  setInterval(() => {
    if (bots.length > 0) {
      const bot = bots[0];
      const messages = ['Hello!', 'Working...', 'Done!', 'Error?', 'OK'];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      handleBotMessageSent(bot.id, msg, Date.now());
    }
  }, 8000);
}

init();
