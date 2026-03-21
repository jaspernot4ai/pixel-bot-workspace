import { renderMap } from './map';

const canvas = document.getElementById('map') as HTMLCanvasElement;
if (!canvas) throw new Error('Canvas not found');

const ctx = canvas.getContext('2d')!;
const { MAP_CONFIG } = await import('./types');

canvas.width = MAP_CONFIG.width * MAP_CONFIG.tileSize;
canvas.height = MAP_CONFIG.height * MAP_CONFIG.tileSize;

renderMap(ctx);

// Simple demo: add a few bots
import { Bot, Position } from './types';

const demoBots: Bot[] = [
  { id: 'frontend', name: 'Frontend', status: 'working', position: { x: 0, y: 1 }, task: 'Rendering pixel map' },
  { id: 'backend', name: 'Backend', status: 'idle', position: { x: 1, y: 1 } },
];

// Draw bots on top
for (const bot of demoBots) {
  renderBot(ctx, bot);
}

// Re-render on status change (demo)
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderMap(ctx);
  
  // Update demo bots
  demoBots[0].status = demoBots[0].status === 'working' ? 'idle' : 'working';
  
  for (const bot of demoBots) {
    renderBot(ctx, bot);
  }
}, 2000);

function renderBot(ctx: CanvasRenderingContext2D, bot: Bot) {
  const { MAP_CONFIG } = require('./types');
  const x = bot.position.x * MAP_CONFIG.tileSize + MAP_CONFIG.tileSize / 2;
  const y = bot.position.y * MAP_CONFIG.tileSize + MAP_CONFIG.tileSize / 2;
  
  // Draw status indicator
  ctx.save();
  ctx.translate(x, y);
  
  // Status colors
  const colors: Record<string, string> = {
    idle: '#22c55e',        // green
    working: '#3b82f6',     // blue
    broadcasting: '#ef4444', // red
  };
  
  ctx.fillStyle = colors[bot.status] || colors.idle;
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  
  // Add pixel border
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  ctx.restore();
}
