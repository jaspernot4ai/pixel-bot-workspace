// Main server entry point
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { initializeBotStates } from './services/botState.js';
import { initializeWebSocket } from './services/websocket.js';
import botsRouter from './routes/bots.js';
import mapRouter from './routes/map.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/bots', botsRouter);
app.use('/api/map', mapRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Create HTTP server
const server = createServer(app);

// Initialize services
initializeBotStates();
initializeWebSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║         Pixel Bot Monitor - Backend Server                ║
╠═══════════════════════════════════════════════════════════╣
║  REST API:  http://localhost:${PORT}                        ║
║  WebSocket: ws://localhost:${PORT}/ws/bots                  ║
╠═══════════════════════════════════════════════════════════╣
║  Endpoints:                                              ║
║    GET  /api/bots      - List all bots                   ║
║    GET  /api/bots/:id  - Get bot by ID                   ║
║    PATCH /api/bots/:id/status    - Update status          ║
║    PATCH /api/bots/:id/task      - Update task            ║
║    PATCH /api/bots/:id/position  - Update position        ║
║    POST /api/bots/:id/message    - Send message event     ║
║    POST /api/bots/:id/error      - Set error state        ║
║    GET  /api/map        - Get map config                 ║
║    WS   /ws/bots         - WebSocket events              ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
