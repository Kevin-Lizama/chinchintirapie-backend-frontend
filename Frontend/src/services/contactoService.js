import { apiFetch } from './apiFetch';

/**
 * Servicio para el formulario de contacto.
 * Conecta con el endpoint /api/contacto.
 *
 * Nota: El endpoint POST /api/contacto es público (no requiere token JWT),
 * pero apiFetch solo envía el token si existe, así que no hay problema.
 */
const contactoService = {
  /**
   * Enviar datos de formulario de contacto
   * @param {object} formData - { nombre, email, telefono, asunto, mensaje }
   * @returns {Promise<object>}
   */
  async enviarMensaje(formData) {
    const response = await apiFetch('/contacto', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    // El backend puede responder con JSON o texto plano,
    // por eso verificamos el Content-Type antes de parsear
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      const text = await response.text();
      return { message: text };
    }
  },
};

export default contactoService;
