// En desarrollo usa el proxy de vite.config.js ('/api')
// En producción usará la URL del backend
let apiBase = '/api';
if (import.meta.env.VITE_API_URL) {
  let url = import.meta.env.VITE_API_URL.trim().replace(/\/+$/, '');
  url = url.replace(/\/auth\/?$/, '');
  if (!url.endsWith('/api')) {
    apiBase = `${url}/api`;
  } else {
    apiBase = url;
  }
}
const API_BASE = apiBase;

/**
 * Servicio para artículos (Noticias y Crónicas).
 * Conecta con el endpoint /api/articulos.
 */
const articuloService = {
  /**
   * Obtener todos los artículos
   */
  async fetchAll() {
    const response = await fetch(`${API_BASE}/articulos`);
    if (!response.ok) throw new Error('Error al obtener artículos');
    return response.json();
  },

  /**
   * Obtener un artículo por ID
   */
  async fetchById(id) {
    const response = await fetch(`${API_BASE}/articulos/${id}`);
    if (!response.ok) throw new Error('Artículo no encontrado');
    return response.json();
  },

  /**
   * Obtener artículos por tipo (NOTICIA o CRONICA)
   */
  async fetchByType(type) {
    const response = await fetch(`${API_BASE}/articulos/type/${type}`);
    if (!response.ok) throw new Error('Error al obtener artículos por tipo');
    return response.json();
  },

  /**
   * Obtener solo noticias
   */
  async fetchNoticias() {
    return this.fetchByType('NOTICIA');
  },

  /**
   * Obtener solo crónicas
   */
  async fetchCronicas() {
    return this.fetchByType('CRONICA');
  },
};

export default articuloService;
