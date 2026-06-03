import { apiFetch } from './apiFetch';

/**
 * Servicio para gestión de usuarios (solo ADMIN).
 * Conecta con el endpoint /api/users.
 */
const userService = {
  async fetchAll() {
    const response = await apiFetch('/users');
    return response.json();
  },

  async fetchById(id) {
    const response = await apiFetch(`/users/${id}`);
    return response.json();
  },

  async update(id, data) {
    const response = await apiFetch(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(id) {
    await apiFetch(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

export default userService;
