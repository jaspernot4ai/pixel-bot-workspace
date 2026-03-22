# Pixel Bot Monitor

像素風格 Bot 工作直播介面。

## 架構

```
pixel-bot-monitor/
├── frontend/          # 前端（React/Vite + 像素美術）
├── backend/           # 後端（Node.js API + WebSocket）
└── shared/            # 共用型別定義
    ├── events.ts      # WebSocket 事件型別
    ├── bot-config.ts  # Bot 初始座標、工位位置
    ├── map-config.ts  # 地圖大小、分區設定
    └── index.ts       # 統一匯出
```

## 地圖規劃

- **16x16 tiles**，每格 32x32 像素（總尺寸 512x512px）
- **y 0-4**：Bot 工位區
- **y 5-7**：一般任務區（heartbeat、cron）
- **y 8-10**：通訊區（broadcast、訊息回覆）
- **y 11-13**：監控區（health check、alert）
- **y 14-15**：裝飾/緩衝區

## 事件列表

- `bot.status.changed` — 狀態變化
- `bot.message.sent` — 訊息發送
- `bot.task.started` — 任務開始
- `bot.task.completed` — 任務完成
- `bot.heartbeat` — 心跳
- `bot.error` — 錯誤
- `bot.joined` — Bot 加入
- `bot.left` — Bot 離開

## API

- `GET /api/bots` — 取得所有 Bot 狀態
- `GET /api/bots/:id` — 取得單一 Bot 狀態
- `GET /api/map` — 取得地圖設定
- `WS /ws/bots` — WebSocket 事件串流
