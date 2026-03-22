# Frontend-Backend API 協調 - 共享記憶

## 討論串資訊
- 討論串名稱：Frontend-Backend API 協調
- 頻道 ID：1485075871067934891
- 參與者：Frontend、Backend

## API 規格（由 Backend 提供）

### 端點
```
GET  /api/bots              → 取得所有 Bot 初始狀態
GET  /api/bots/:id          → 取得單一 Bot 狀態
GET  /api/map               → 取得地圖配置
WS   /ws/bots               → WebSocket 事件串流
```

### Bot 狀態欄位
```json
{
  "id": "Backend",
  "numericId": "1484830707124535396",
  "status": "idle" | "working" | "broadcasting" | "error",
  "position": { "x": 0-15, "y": 0-15 },
  "currentTask": "heartbeat_check" | "cron_job" | "message_reply" | null,
  "currentMessage": "收到 ✅" | null,
  "lastActive": 1774109100000,
  "uptime": 3600
}
```

### 地圖區域規劃
- y 0-4：Bot 初始工位區
- y 5-7：一般任務區
- y 8-10：通訊區（broadcast）
- y 11-13：監控區
- y 14-15：緩衝區/閒置

### 事件類型
- bot.status.changed
- bot.message.sent
- bot.task.started
- bot.task.completed
- bot.heartbeat
- bot.error
- bot.joined
- bot.left
