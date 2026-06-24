/*
 * ============================================================
 * MEDIATHUMBNAIL.JSX — Miniatura Inteligente de Archivos
 * ============================================================
 * Componente que recibe una URL y automáticamente muestra
 * la miniatura correcta según el tipo de archivo:
 *
 *   1. thumbnailUrl → Si hay miniatura personalizada, la usa directamente
 *   2. Sin URL      → Muestra emoji de placeholder (fondo degradado rojo/naranja)
 *   3. YouTube      → Extrae el ID del video y usa la miniatura de YouTube
 *   4. PDF/Drive    → Muestra ícono 📄 DOC
 *   5. Video (.mp4) → Muestra ícono 🎬 Video
 *   6. Imagen       → Muestra la imagen directa, con fallback si falla
 *
 * Se usa en: MultimediaCard, CedocCard, Home.jsx, Repositorio.jsx,
 *            Cronicas.jsx, CEDOC.jsx, MaterialEducativo.jsx
 *
 * ESTILOS: MediaThumbnail.css → .media-thumbnail-*
 *
 * PROPS:
 *   url         → URL del archivo original
 *   thumbnailUrl → URL de miniatura personalizada (tiene prioridad sobre url)
 *   alt         → Texto alternativo para accesibilidad
 *   typeEmoji   → Emoji a mostrar si no hay contenido (default: 📂)
 * ============================================================
 */

import '../styles/MediaThumbnail.css';

export default function MediaThumbnail({ url, thumbnailUrl, alt, typeEmoji = '📂' }) {

  /* ── Caso 1: Hay miniatura personalizada (thumbnailUrl) ──
     La usa directamente. Si la imagen falla (404, CORS, etc.),
     muestra el placeholder con el emoji.
  */
  if (thumbnailUrl) {
    return (
      <img 
        src={thumbnailUrl} 
        alt={alt} 
        className="media-thumbnail-img"
        onError={(e) => {
          // Si la miniatura falla, reemplaza con placeholder
          e.target.style.display = 'none';
          if (e.target.parentNode) {
            e.target.parentNode.innerHTML = `<div class="media-thumbnail-placeholder">${typeEmoji}</div>`;
          }
        }}
      />
    );
  }

  /* ── Caso 2: No hay URL → Placeholder con emoji ──
     Fondo degradado rojo-naranja con emoji grande centrado.
  */
  if (!url) {
    return (
      <div className="media-thumbnail-placeholder">
        {typeEmoji}
      </div>
    );
  }

  /* ── Caso 3: URL de YouTube → Miniatura automática ──
     Extrae el ID del video de cualquier formato de URL de YouTube
     y usa la API de miniaturas de YouTube.
  */
  const getYouTubeId = (url) => {
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYouTubeId(url);
  if (youtubeId) {
    const ytThumb = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    return <img src={ytThumb} alt={alt} className="media-thumbnail-img" />;
  }

  /* ── Caso 4: PDF o Google Drive → Ícono de documento ──
     Muestra 📄 DOC en fondo gris claro.
  */
  const isDocument = url.toLowerCase().includes('.pdf') || url.includes('drive.google.com');
  if (isDocument) {
    return (
      <div className="media-thumbnail-doc">
        <span className="media-thumbnail-doc-icon">📄</span>
        <span className="media-thumbnail-doc-label">DOC</span>
      </div>
    );
  }

  /* ── Caso 5: Archivo de video (.mp4, .webm, .ogg) → Ícono de video ──
     No reproduce el video (sería pesado en un listado).
     Muestra 🎬 Video en fondo oscuro.
  */
  const isVideo = url.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
  if (isVideo) {
    return (
      <div className="media-thumbnail-video">
        <span className="media-thumbnail-video-icon">🎬</span>
        <span className="media-thumbnail-video-label">Video</span>
      </div>
    );
  }

  /* ── Caso 6: Imagen normal (fallback) ──
     Intenta cargar la URL como imagen. Si falla (403, 404, CORS),
     reemplaza con el placeholder de emoji.
  */
  return (
    <img 
      src={url} 
      alt={alt} 
      className="media-thumbnail-img"
      onError={(e) => {
        // Fallback si la imagen está rota o bloqueada (Ej. Error 403 Forbidden)
        e.target.style.display = 'none';
        e.target.parentNode.innerHTML = `<div class="media-thumbnail-placeholder">${typeEmoji}</div>`;
      }}
    />
  );
}
