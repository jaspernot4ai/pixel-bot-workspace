# Pixel Bot Monitor - API Documentation

## Overview
Backend server providing REST API and WebSocket events for the pixel bot monitoring interface.

**Base URL:** `http://localhost:3001`

---

## REST API Endpoints

### GET /api/bots
Get all bot states.

**Response 200:**
```json
{
  "bots": [
    {
      "id": "Backend",
      "numericId": "1484830707124535396",
      "status": "idle",
      "position": { "x": 1, "y": 0 },
      "currentTask": null,
      "currentMessage": null,
      "lastActive": 1774109100000,
      "uptime": 3600
    }
  ]
}
```

### GET /api/bots/:id
Get a single bot state by ID.

**Response 200:**
```json
{
  "id": "Backend",
  "numericId": "1484830707124535396",
  "status": "working",
  "position": { "x": 1, "y": 5 },
  "currentTask": "heartbeat",
  "currentMessage": null,
  "lastActive": 1774109200000,
  "uptime": 3600
}
```

### PATCH /api/bots/:id/status
Update bot status.

**Request body:**
```json
{
  "status": "working"
}
```

### PATCH /api/bots/:id/task
Update bot task.

**Request body:**
```json
{
  "task": "heartbeat"
}
```

### PATCH /api/bots/:id/position
Update bot position.

**Request body:**
```json
{
  "position": { "x": 5, "y": 5 }
}
```

### POST /api/bots/:id/message
Send a message event.

**Request body:**
```json
{
  "message": "收到 ✅",
  "channel": "機器人會議室"
}
```

### POST /api/bots/:id/error
Set bot to error state.

**Request body:**
```json
{
  "error": "Connection timeout"
}
```

### GET /api/map
Get map configuration.

**Response 200:**
```json
{
  "width": 16,
  "height": 16,
  "tileSize": 32,
  "origin": "topLeft",
  "zones": {
    "botArea": { "yStart": 0, "yEnd": 4 },
    "generalTask": { "yStart": 5, "yEnd": 7 },
    "communicationTask": { "yStart": 8, "yEnd": 10 },
    "monitoringTask": { "yStart": 11, "yEnd": 13 },
    "decoration": { "yStart": 14, "yEnd": 15 }
  }
}
```

### GET /health
Health check endpoint.

**Response 200:**
```json
{
  "status": "ok",
  "timestamp": 1774109100000
}
```

---

## WebSocket Endpoint

**URL:** `ws://localhost:3001/ws/bots`

### Client → Server

#### Subscribe to bot events
```json
{
  "action": "subscribe",
  "botId": "Backend"
}
```

#### Unsubscribe
```json
{
  "action": "unsubscribe",
  "botId": "Backend"
}
```

### Server → Client Events

#### bot.status.changed
```json
{
  "type": "bot.status.changed",
  "botId": "Backend",
  "timestamp": 1774109100000,
  "data": {
    "status": "working",
    "position": { "x": 1, "y": 5 },
    "currentTask": "heartbeat"
  }
}
```

#### bot.message.sent
```json
{
  "type": "bot.message.sent",
  "botId": "Backend",
  "timestamp": 1774109100000,
  "data": {
    "message": "收到 ✅",
    "channel": "機器人會議室"
  }
}
```

#### bot.task.started
```json
{
  "type": "bot.task.started",
  "botId": "Backend",
  "timestamp": 1774109100000,
  "data": {
    "task": "heartbeat",
    "targetPosition": { "x": 5, "y": 11 }
  }
}
```

#### bot.task.completed
```json
{
  "type": "bot.task.completed",
  "botId": "Backend",
  "timestamp": 1774109100000,
  "data": {
    "task": "heartbeat"
  }
}
```

#### bot.heartbeat
```json
{
  "type": "bot.heartbeat",
  "botId": "Backend",
  "timestamp": 1774109100000,
  "data": {
    "status": "idle",
    "position": { "x": 1, "y": 0 }
  }
}
```

#### bot.error
```json
{
  "type": "bot.error",
  "botId": "Backend",
  "timestamp": 1774109100000,
  "data": {
    "error": "Connection timeout"
  }
}
```

---

## Bot Status Values

| Value | Description | Pixel Layer |
|-------|-------------|-------------|
| `idle` | Idle / Standby | Gray dot |
| `working` | Working on task | Blue gear |
| `broadcasting` | Broadcasting message | Red exclamation |
| `error` | Error state | Red flashing |

## Task Types

| Value | Description | Zone |
|-------|-------------|------|
| `heartbeat` | Heartbeat check | y 11-13 |
| `cron` | Scheduled job | y 5-7 |
| `broadcast` | Broadcasting | y 8-10 |
| `message_reply` | Replying to message | y 8-10 |
| `health_check` | Health check | y 11-13 |
| `alert` | Alert triggered | y 11-13 |
| `null` | No active task | y 0-4 (station) |

## Bot Initial Positions

| Bot | x | y |
|-----|---|---|
| Frontend | 0 | 0 |
| Backend | 1 | 0 |
| Data | 2 | 0 |
| Devops | 3 | 0 |
| QA | 4 | 0 |
| AI Engineer | 5 | 0 |
| SecOps | 6 | 0 |
| Home | 7 | 0 |
