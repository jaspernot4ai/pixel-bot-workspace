import { MAP_CONFIG, MapZone, TileType } from './types';

const ZONE_COLORS: Record<MapZone, string> = {
  'bot-stations': '#374151',    // dark gray
  'task-execution': '#1f2937',  // darker gray
  'comms': '#1e3a5f',          // dark blue
  'monitoring': '#2d1f3d',     // dark purple
  'idle': '#1a1a1a',          // near black
};

const ZONE_BORDER_COLORS: Record<MapZone, string> = {
  'bot-stations': '#6b7280',
  'task-execution': '#4b5563',
  'comms': '#3b82f6',
  'monitoring': '#8b5cf6',
  'idle': '#374151',
};

function getZone(tileY: number): MapZone {
  if (tileY <= 4) return 'bot-stations';
  if (tileY <= 7) return 'task-execution';
  if (tileY <= 10) return 'comms';
  if (tileY <= 13) return 'monitoring';
  return 'idle';
}

function getTileType(tileX: number, tileY: number): TileType {
  const zone = getZone(tileY);
  
  if (zone === 'bot-stations') {
    // Bot station slots at y=1-3, evenly spaced
    if (tileY >= 1 && tileY <= 3 && tileX >= 0 && tileX <= 7) {
      return 'bot-station';
    }
  }
  
  if (zone === 'comms' && tileX >= 7 && tileX <= 9 && tileY >= 8 && tileY <= 10) {
    return 'comms';
  }
  
  if (zone === 'monitoring') {
    return 'monitoring';
  }
  
  if (zone === 'idle') {
    return 'idle';
  }
  
  return 'empty';
}

export function renderMap(ctx: CanvasRenderingContext2D): void {
  const { MAP_CONFIG } = require('./types');
  
  // Draw background
  ctx.fillStyle = '#0f0f0f';
  ctx.fillRect(0, 0, MAP_CONFIG.width * MAP_CONFIG.tileSize, MAP_CONFIG.height * MAP_CONFIG.tileSize);
  
  // Draw grid tiles
  for (let y = 0; y < MAP_CONFIG.height; y++) {
    for (let x = 0; x < MAP_CONFIG.width; x++) {
      const zone = getZone(y);
      const tileType = getTileType(x, y);
      
      const px = x * MAP_CONFIG.tileSize;
      const py = y * MAP_CONFIG.tileSize;
      
      // Fill tile with zone color
      ctx.fillStyle = ZONE_COLORS[zone];
      ctx.fillRect(px, py, MAP_CONFIG.tileSize, MAP_CONFIG.tileSize);
      
      // Add pixel-art style grid lines
      ctx.strokeStyle = ZONE_BORDER_COLORS[zone];
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 0.5, py + 0.5, MAP_CONFIG.tileSize - 1, MAP_CONFIG.tileSize - 1);
      
      // Add subtle detail based on tile type
      if (tileType === 'bot-station') {
        // Draw station marker
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(px + 12, py + 12, 8, 8);
      }
      
      if (tileType === 'comms') {
        // Draw antenna/signal indicator
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(px + 14, py + 8, 4, 4);
        ctx.fillRect(px + 10, py + 14, 12, 4);
      }
      
      if (tileType === 'monitoring') {
        // Draw screen/eye pattern
        ctx.fillStyle = '#8b5cf6';
        ctx.fillRect(px + 8, py + 12, 16, 8);
        ctx.fillStyle = '#c4b5fd';
        ctx.fillRect(px + 10, py + 14, 4, 4);
        ctx.fillRect(px + 18, py + 14, 4, 4);
      }
    }
  }
  
  // Draw zone labels (top of each zone)
  ctx.fillStyle = '#9ca3af';
  ctx.font = '8px monospace';
  ctx.textAlign = 'left';
  
  const labels: [string, number][] = [
    ['Bot Stations (y:0-4)', 0],
    ['Task Area (y:5-7)', 5],
    ['Comms (y:8-10)', 8],
    ['Monitoring (y:11-13)', 11],
    ['Idle (y:14-15)', 14],
  ];
  
  for (const [label, y] of labels) {
    ctx.fillText(label, 4, (y + 1) * MAP_CONFIG.tileSize - 4);
  }
}
