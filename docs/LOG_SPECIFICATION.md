# OpenCLAW 系統日誌規範 (System Log Specification)

## 1. 概述

本規範定義 OpenCLAW 系統從啟動到關閉的全程日誌標準，採用 JSON 格式輸出，支援自動化分析與可視化。

## 2. 日誌格式

```json
{
  "timestamp": "2026-03-28T12:52:00.123Z",
  "level": "INFO|WARN|ERROR|DEBUG",
  "component": "System|WebSocket_Server|Agent_Manager|Agent",
  "agent_id": "home|frontend|backend|...",
  "event": "事件類型",
  "message": "人類可讀描述",
  "data": {},
  "trace_id": "uuid-v4"
}
```

## 3. 組件標籤 (Component Tags)

| 組件 | 標籤格式 | 說明 |
|-----|---------|------|
| 系統核心 | `[System]` | 系統啟動、關閉、初始化 |
| WebSocket 服務 | `[WebSocket_Server]` | WS 連接管理 |
| Agent 管理器 | `[Agent_Manager]` | Agent 生命週期管理 |
| 個別 Agent | `[Agent_ID]` | 特定 Agent 的日誌 |

## 4. 事件層級 (Event Levels)

| 層級 | 用途 |
|-----|------|
| `DEBUG` | 詳細偵錯資訊 |
| `INFO` | 一般操作事件 |
| `WARN` | 警告（可恢復的異常） |
| `ERROR` | 錯誤（需要關注） |

## 5. 核心動作事件

### 5.1 系統核心事件 (System)

```json
{
  "timestamp": "2026-03-28T12:52:00.123Z",
  "level": "INFO",
  "component": "System",
  "event": "SYSTEM_START",
  "message": "OpenCLAW 系統啟動",
  "data": {
    "version": "1.0.0",
    "hostname": "Mac-mini-M4-2026",
    "os": "Darwin 25.2.0",
    "node_version": "v22.22.1",
    "uptime_ms": 0
  }
}
```

```json
{
  "timestamp": "2026-03-28T12:52:00.456Z",
  "level": "INFO",
  "component": "System",
  "event": "SYSTEM_SHUTDOWN",
  "message": "OpenCLAW 系統關閉",
  "data": {
    "uptime_ms": 86400000,
    "agents_active": 8,
    "reason": "正常關閉|異常終止"
  }
}
```

### 5.2 WebSocket 連接事件

```json
{
  "timestamp": "2026-03-28T12:52:01.234Z",
  "level": "INFO",
  "component": "WebSocket_Server",
  "event": "WS_CONNECTION_OPEN",
  "message": "WebSocket 連接已建立",
  "data": {
    "client_id": "ws_abc123",
    "remote_address": "192.168.1.100",
    "user_agent": "DiscordBot/...",
    "handshake_time_ms": 45
  }
}
```

```json
{
  "timestamp": "2026-03-28T12:52:01.567Z",
  "level": "INFO",
  "component": "WebSocket_Server",
  "event": "WS_CONNECTION_CLOSE",
  "message": "WebSocket 連接已關閉",
  "data": {
    "client_id": "ws_abc123",
    "close_code": 1000,
    "reason": "Normal closure",
    "duration_ms": 3600000
  }
}
```

```json
{
  "timestamp": "2026-03-28T12:52:02.890Z",
  "level": "WARN",
  "component": "WebSocket_Server",
  "event": "WS_CONNECTION_ERROR",
  "message": "WebSocket 連接錯誤",
  "data": {
    "client_id": "ws_abc123",
    "error_code": "ECONNREFUSED",
    "error_message": "Connection refused"
  }
}
```

### 5.3 心跳包事件 (Heartbeat)

```json
{
  "timestamp": "2026-03-28T12:52:05.000Z",
  "level": "DEBUG",
  "component": "WebSocket_Server",
  "event": "HEARTBEAT_SENT",
  "message": "發送心跳包",
  "data": {
    "client_id": "ws_abc123",
    "sequence": 12345,
    "interval_ms": 30000,
    "payload_size_bytes": 128
  }
}
```

```json
{
  "timestamp": "2026-03-28T12:52:05.050Z",
  "level": "DEBUG",
  "component": "WebSocket_Server",
  "event": "HEARTBEAT_ACK",
  "message": "心跳包確認",
  "data": {
    "client_id": "ws_abc123",
    "sequence": 12345,
    "latency_ms": 50
  }
}
```

```json
{
  "timestamp": "2026-03-28T12:52:05.500Z",
  "level": "WARN",
  "component": "WebSocket_Server",
  "event": "HEARTBEAT_TIMEOUT",
  "message": "心跳超時",
  "data": {
    "client_id": "ws_abc123",
    "missed_heartbeats": 3,
    "threshold": 5
  }
}
```

### 5.4 Agent 狀態機事件

```json
{
  "timestamp": "2026-03-28T12:52:10.000Z",
  "level": "INFO",
  "component": "Agent_Manager",
  "event": "AGENT_STATE_CHANGE",
  "message": "Agent 狀態變更",
  "data": {
    "agent_id": "frontend",
    "previous_state": "IDLE",
    "new_state": "RUNNING",
    "trigger": "task_assigned",
    "task_id": "task_xyz789"
  }
}
```

**Agent 狀態定義：**

| 狀態 | 說明 |
|-----|------|
| `INIT` | 初始化中 |
| `IDLE` | 閒置待命 |
| `RUNNING` | 執行任務中 |
| `WAITING` | 等待回應 |
| `SUSPENDED` | 暫停中 |
| `TERMINATED` | 已終止 |

```json
{
  "timestamp": "2026-03-28T12:52:15.000Z",
  "level": "INFO",
  "component": "Agent_Manager",
  "event": "AGENT_SPAWN",
  "message": "Agent 已啟動",
  "data": {
    "agent_id": "frontend",
    "workspace": "/path/to/workspace",
    "runtime": "node",
    "startup_time_ms": 1234
  }
}
```

```json
{
  "timestamp": "2026-03-28T12:52:20.000Z",
  "level": "INFO",
  "component": "Agent_Manager",
  "event": "AGENT_TERMINATE",
  "message": "Agent 已終止",
  "data": {
    "agent_id": "frontend",
    "reason": "task_completed|idle_timeout|error",
    "uptime_ms": 3600000,
    "tasks_completed": 5
  }
}
```

### 5.5 前端推送事件 (Frontend Payload)

```json
{
  "timestamp": "2026-03-28T12:52:25.000Z",
  "level": "DEBUG",
  "component": "Agent_Manager",
  "event": "PAYLOAD_TO_FRONTEND",
  "message": "推送 Payload 到前端",
  "data": {
    "target": "frontend|all",
    "payload_type": "message|event|status_update",
    "content_summary": "訊息前 50 字...",
    "payload_size_bytes": 2048,
    "delivery_status": "queued|delivered|failed"
  }
}
```

```json
{
  "timestamp": "2026-03-28T12:52:26.000Z",
  "level": "DEBUG",
  "component": "Agent_Manager",
  "event": "PAYLOAD_DELIVERED",
  "message": "Payload 已送達前端",
  "data": {
    "target": "frontend",
    "delivery_time_ms": 125,
    "attempts": 1
  }
}
```

## 6. 完整範例

```json
{
  "timestamp": "2026-03-28T12:52:30.123456Z",
  "level": "INFO",
  "component": "Agent_Manager",
  "agent_id": "frontend",
  "event": "AGENT_STATE_CHANGE",
  "message": "Frontend Agent 開始處理任務",
  "data": {
    "task_id": "task_12345",
    "task_type": "code_generation",
    "previous_state": "IDLE",
    "new_state": "RUNNING",
    "workspace": "/Users/.../workspaces/frontend",
    "assigned_by": "user:ckweiiiii"
  },
  "trace_id": "trace_abc123-def456-ghi789"
}
```

## 7. 日誌輸出目標

| 目標 | 格式 | 用途 |
|-----|------|------|
| Console (stdout) | 彩色文字 | 即時監控 |
| File (JSONL) | JSON Lines | 長期儲存 |
| Syslog | 結構化文字 | 系統整合 |
| Webhook | JSON POST | 外部監控 |

## 8. 建議實作

### 8.1 日誌級別過濾

```javascript
// 建議的預設日誌級別
const LOG_LEVELS = {
  System: 'INFO',
  WebSocket_Server: 'DEBUG',
  Agent_Manager: 'INFO',
  Agent: 'DEBUG'
};
```

### 8.2 速率限制

```
每個 Agent 每秒最多 100 條 DEBUG 日誌
每分鐘最多 10 條 ERROR 日誌（避免洪水）
```

### 8.3 敏感資訊過濾

自動過濾以下欄位：
- `password`
- `token`
- `secret`
- `authorization`

---

**版本：** 1.0.0  
**建立日期：** 2026-03-28  
**適用系統：** OpenCLAW
