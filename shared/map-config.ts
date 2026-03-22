// shared/map-config.ts
// 地圖大小、分區設定

export interface MapConfig {
  width: number;
  height: number;
  tileSize: number;
  origin: 'topLeft';
  zones: {
    botArea: { yStart: number; yEnd: number };
    generalTask: { yStart: number; yEnd: number };
    communicationTask: { yStart: number; yEnd: number };
    monitoringTask: { yStart: number; yEnd: number };
    decoration: { yStart: number; yEnd: number };
  };
}

export const MAP_CONFIG: MapConfig = {
  width: 16,
  height: 16,
  tileSize: 32,
  origin: 'topLeft',
  zones: {
    botArea: { yStart: 0, yEnd: 4 },       // Bot 工位區
    generalTask: { yStart: 5, yEnd: 6 },   // 一般任務區（heartbeat、cron）
    communicationTask: { yStart: 7, yEnd: 8 }, // 通訊任務區（broadcast、訊息回覆）
    monitoringTask: { yStart: 9, yEnd: 10 },   // 監控任務區（health check、alert）
    decoration: { yStart: 11, yEnd: 15 },   // 裝飾/緩衝區
  },
};

export const TILE_SIZE = MAP_CONFIG.tileSize; // 32 pixels
export const MAP_PIXEL_WIDTH = MAP_CONFIG.width * TILE_SIZE;  // 512px
export const MAP_PIXEL_HEIGHT = MAP_CONFIG.height * TILE_SIZE; // 512px
