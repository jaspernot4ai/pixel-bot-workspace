import { renderMap } from './map';
import { fetchBots, fetchMap } from './api';
import { botWs } from './ws';
import { MAP_CONFIG, Bot } from './types';

const canvas = document.getElementById('map') as HTMLCanvasElement;
if (!canvas) throw new Error('Canvas not found');

const ctx = canvas.getContext('2d')!;

canvas.width = MAP_CONFIG.width * MAP_CONFIG.tileSize;
canvas.height = MAP_CONFIG.height * MAP_CONFIG.tileSize;

// State
let bots: Bot[] = [];

// Render bots on the map
function renderBots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderMap(ctx);

  for (const bot of bots) {
    renderBot(ctx, bot);
  }
}

function renderBot(ctx: CanvasRenderingContext2D, bot: Bot) {
  const x = bot.position.x * MAP_CONFIG.tileSize + MAP_CONFIG.tileSize / 2;
  const y = bot.position.y * MAP_CONFIG.tileSize + MAP_CONFIG.tileSize / 2;

  const colors: Record<string, string> = {
    idle: '#22c55e',        // green
    working: '#3b82f6',     // blue
    broadcasting: '#ef4444', // red
  };

  // Draw status circle
  ctx.fillStyle = colors[bot.status] || colors.idle;
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, Math.PI * 2);
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
}

// Event handlers
function handleBotStatusChanged(botId: string, newStatus: string) {
  const bot = bots.find((b) => b.id === botId);
  if (bot) {
    bot.status = newStatus as Bot['status'];
    renderBots();
  }
}

function handleBotMessageSent(botId: string, message: string) {
  const bot = bots.find((b) => b.id === botId);
  if (bot) {
    bot.currentMessage = message;
    renderBots();
    // TODO: Show message bubble animation
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
    if (msg.data?.status) {
      handleBotStatusChanged(msg.botId!, msg.data.status as string);
    }
  });

  botWs.on('bot.message.sent', (msg) => {
    if (msg.data?.message) {
      handleBotMessageSent(msg.botId!, msg.data.message as string);
    }
  });

  botWs.on('bot.task.started', (msg) => {
    console.log('[WS] Task started:', msg.botId, msg.data?.task);
  });

  botWs.on('bot.task.completed', (msg) => {
    console.log('[WS] Task completed:', msg.botId);
  });

  // Try to connect (will fail gracefully if server not running)
  botWs.connect().catch(() => {
    console.warn('[WS] WebSocket connection failed, running in demo mode');
  });

  // Demo: toggle status every 3 seconds
  setInterval(() => {
    if (bots.length > 0) {
      const bot = bots[0];
      bot.status = bot.status === 'idle' ? 'working' : 'idle';
      renderBots();
    }
  }, 3000);
}

init();
