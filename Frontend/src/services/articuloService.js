import { apiFetch } from './apiFetch';

/**
 * Servicio para artículos (Noticias y Crónicas).
 * Conecta con el endpoint /api/articulos.
 *
 * Usa apiFetch que automáticamente:
 * - Construye la URL completa (API_BASE + endpoint)
 * - Agrega el token JWT en las cabeceras
 * - Maneja errores de red y sesión expirada
 */
const articuloService = {
  /**
   * Obtener todos los artículos
   */
  async fetchAll() {
    const response = await apiFetch('/articulos');
    return response.json();
  },

  /**
   * Obtener un artículo por ID
   */
  async fetchById(id) {
    const response = await apiFetch(`/articulos/${id}`);
    return response.json();
  },

  /**
   * Obtener artículos por tipo (NOTICIA o CRONICA)
   */
  async fetchByType(type) {
    const timestamp = new Date().getTime();
    const response = await apiFetch(`/articulos/type/${type}?t=${timestamp}`);
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

  /**
   * Crear un nuevo artículo
   */
  async create(data) {
    const response = await apiFetch('/articulos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Actualizar un artículo
   */
  async update(id, data) {
    const response = await apiFetch(`/articulos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  /**
   * Eliminar un artículo
   */
  async delete(id) {
    await apiFetch(`/articulos/${id}`, {
      method: 'DELETE',
    });
  },
};

export default articuloService;
