/**
 * apiConfig.js — Configuración centralizada de la URL de la API.
 *
 * Este archivo existe para que la lógica de "¿cuál es la URL del backend?"
 * esté en UN SOLO LUGAR en vez de repetida en cada servicio.
 *
 * ¿Cómo funciona?
 *
 * EN DESARROLLO (cuando corres `npm run dev`):
 *   - No existe la variable VITE_API_URL
 *   - API_BASE queda como '/api'
 *   - Vite tiene un "proxy" configurado en vite.config.js que intercepta
 *     todas las peticiones a '/api/...' y las redirige a localhost:8080
 *     (donde corre el backend Spring Boot)
 *
 * EN PRODUCCIÓN (Vercel):
 *   - VITE_API_URL tiene la URL real del backend
 *   - API_BASE se construye a partir de esa URL
 */

let apiBase = '/api';

if (import.meta.env.VITE_API_URL) {
  let url = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
  // Limpiar sufijos que a veces se ponen por error
  url = url.replace(/\/auth\/?$/, '');
  if (!url.endsWith('/api')) {
    apiBase = `${url}/api`;
  } else {
    apiBase = url;
  }
}

export const API_BASE = apiBase;
