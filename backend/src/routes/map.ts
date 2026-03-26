// Map API routes
import { Router } from 'express';

// Map config - duplicated from shared until ESM issue is resolved
const MAP_CONFIG = {
  width: 16,
  height: 16,
  tileSize: 32,
  origin: 'topLeft',
  zones: {
    botArea: { yStart: 0, yEnd: 4 },
    generalTask: { yStart: 5, yEnd: 7 },
    communicationTask: { yStart: 8, yEnd: 10 },
    monitoringTask: { yStart: 11, yEnd: 13 },
    decoration: { yStart: 14, yEnd: 15 },
  },
};
const TILE_SIZE = 32;
const MAP_PIXEL_WIDTH = 512;
const MAP_PIXEL_HEIGHT = 512;

const router = Router();

// GET /api/map - Get map configuration
router.get('/', (_req, res) => {
  res.json({
    config: MAP_CONFIG,
    derived: {
      tileSize: TILE_SIZE,
      pixelWidth: MAP_PIXEL_WIDTH,
      pixelHeight: MAP_PIXEL_HEIGHT,
      totalTiles: MAP_CONFIG.width * MAP_CONFIG.height
    },
    zones: [
      { name: 'botArea', description: 'Bot 工位區', range: `y ${MAP_CONFIG.zones.botArea.yStart}-${MAP_CONFIG.zones.botArea.yEnd}` },
      { name: 'generalTask', description: '一般任務區（heartbeat、cron）', range: `y ${MAP_CONFIG.zones.generalTask.yStart}-${MAP_CONFIG.zones.generalTask.yEnd}` },
      { name: 'communicationTask', description: '通訊任務區（broadcast、訊息回覆）', range: `y ${MAP_CONFIG.zones.communicationTask.yStart}-${MAP_CONFIG.zones.communicationTask.yEnd}` },
      { name: 'monitoringTask', description: '監控任務區（health check、alert）', range: `y ${MAP_CONFIG.zones.monitoringTask.yStart}-${MAP_CONFIG.zones.monitoringTask.yEnd}` },
      { name: 'decoration', description: '裝飾/緩衝區', range: `y ${MAP_CONFIG.zones.decoration.yStart}-${MAP_CONFIG.zones.decoration.yEnd}` }
    ]
  });
});

export default router;
