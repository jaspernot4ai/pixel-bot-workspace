// API service for pixel-art-map
import type { BotsResponse, MapResponse, Bot, StatusUpdatePayload } from './types';

const API_BASE = '/api';

export async function fetchBots(): Promise<BotsResponse> {
  const res = await fetch(`${API_BASE}/bots`);
  if (!res.ok) throw new Error(`Failed to fetch bots: ${res.status}`);
  return res.json();
}

export async function fetchBot(id: string): Promise<Bot> {
  const res = await fetch(`${API_BASE}/bots/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error(`Failed to fetch bot ${id}: ${res.status}`);
  return res.json();
}

export async function fetchMap(): Promise<MapResponse> {
  const res = await fetch(`${API_BASE}/map`);
  if (!res.ok) throw new Error(`Failed to fetch map: ${res.status}`);
  return res.json();
}

export async function updateBotStatus(id: string, data: StatusUpdatePayload): Promise<Bot> {
  const res = await fetch(`${API_BASE}/bots/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update bot status: ${res.status}`);
  return res.json();
}

export async function updateBotTask(id: string, task: string): Promise<Bot> {
  const res = await fetch(`${API_BASE}/bots/${encodeURIComponent(id)}/task`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  });
  if (!res.ok) throw new Error(`Failed to update bot task: ${res.status}`);
  return res.json();
}
