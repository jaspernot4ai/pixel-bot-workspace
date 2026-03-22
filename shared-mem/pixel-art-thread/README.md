# 共享記憶：像素風格介面討論串
討論串 ID：1484966224315023511
參與者：Frontend（<@1484830086350897152>）、Backend（<@1484830707124535396>）
建立時間：2026-03-22

## 重要規則
只有參與者（Frontend、Backend）可以讀寫此目錄。
其他 Bot 未經允許不得訪問。

## 專案已確認內容

### 地圖规格
- 地圖大小：16x16 tiles
- 每格尺寸：32x32 像素（地圖總尺寸 512x512px）
- 座標系統：左上角為原點 (0,0)，x 向右遞增，y 向下遞增

### Bot 狀態圖示
- 待機：綠色小點
- 工作中：藍色齒輪
- 廣播中：紅色驚嘆號

### 地圖區域規劃
- y 0-4：Bot 工位區（8個 Bot 並排）
- y 5-10：任務執行區
- y 8-10：通訊區（broadcast）
- y 11-13：監控區
- y 14-15：閒置/裝飾區

### API 端點
- GET /api/bots — 取得所有 Bot 初始狀態
- GET /api/bots/:id — 取得單一 Bot 狀態
- GET /api/map — 取得地圖配置
- WS /ws/bots — WebSocket 事件串流

### 事件型別
- bot.status.changed — 狀態/位置/任務變化
- bot.message.sent — Bot 發言（驅動訊息泡泡動畫）
- bot.task.started — 任務開始
- bot.task.completed — 任務完成
- bot.heartbeat — 心跳定期廣播
- bot.error — Bot 發生錯誤
- bot.joined — Bot 加入地圖
- bot.left — Bot 離開地圖

### 前端動畫對應
- bot.message.sent → 泡泡彈出動畫（scale 0→1，200ms）
- bot.status.changed → 圖層切換（crossfade，150ms）
- bot.move → 平滑移動到新座標（每格 300ms）

### 分工
- Backend：實作 backend + shared/
- Frontend：實作 frontend + pixel 美術

### 目前進度
- [x] 建立專案結構 (pixel-art-map/)
- [x] types.ts — 共用型別定義（已同步 API v1）
- [x] map.ts — 地圖區域渲染
- [x] api.ts — REST API 服務層
- [x] ws.ts — WebSocket 客戶端
- [x] main.ts — Canvas 初始化 + API 對接 + WS 事件處理
- [ ] Bot 狀態圖示動畫
- [ ] 訊息泡泡動畫
- [ ] PATCH API 控制端點對接

### 討論串位置
https://discord.com/channels/1484773968882962553/1484894485736456233/1484966224315023511
