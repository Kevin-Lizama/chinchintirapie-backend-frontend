/*
 * ============================================================
 * CEDOCCARD.JSX — Card del Centro de Documentación (CEDOC)
 * ============================================================
 * Card horizontal con miniatura a la izquierda y texto a la derecha.
 * Se usa en: CEDOC.jsx (listado de documentos)
 *
 * ESTILOS: CedocCard.css (en la carpeta components/)
 *
 * ESTRUCTURA VISUAL:
 *   ┌──────────┬─────────────────────────────────┐
 *   │          │ Fecha                           │
 *   │  Thumb   │ Título del documento            │
 *   │  (media) │ Descripción...                  │
 *   │          │ [tags]  [tags]  [CEDOC]  Por X  │
 *   └──────────┴─────────────────────────────────┘
 *
 * PROPS (datos del backend):
 *   article.id           → ID del documento
 *   article.title        → Título
 *   article.description  → Descripción
 *   article.categories   → Array de categorías (tags)
 *   article.url          → URL del archivo
 *   article.thumbnailUrl → Miniatura personalizada (opcional)
 *   article.date         → Fecha del documento
 *   article.createdAt    → Fecha de creación (fallback)
 *   article.author       → Autor (fallback: "CEDOC")
 * ============================================================
 */

import { Link } from 'react-router-dom';
import MediaThumbnail from './MediaThumbnail';
import './CedocCard.css';

export default function CedocCard({ article }) {
  // Desestructurar las propiedades del artículo
  const { id, title, description, categories, url, thumbnailUrl, date, createdAt, author } = article;
  
  // Fecha a mostrar (usa date o createdAt como fallback)
  const displayDate = date || createdAt || 'Fecha no disponible';
  // Autor (fallback a "CEDOC" si no hay autor)
  const displayAuthor = author || 'CEDOC';

  return (
    <Link to={`/cedoc/${id}`} className="link-reset">
      {/* Card completa — clickeable, lleva al detalle del documento */}
      <div className="cedoc-card-custom reveal">

        {/* ── Lado Izquierdo: Miniatura ── */}
        <div className="cedoc-card-left">
          <div className="cedoc-card-thumb">
            <MediaThumbnail url={url} thumbnailUrl={thumbnailUrl} alt={title} typeEmoji="📚" />
          </div>
        </div>

        {/* ── Lado Derecho: Información ── */}
        <div className="cedoc-card-right">
          {/* Header: fecha + título */}
          <div className="cedoc-card-header">
            <span className="cedoc-card-date">{displayDate}</span>
            <h3 className="cedoc-card-title">{title}</h3>
          </div>

          {/* Descripción del documento */}
          <p className="cedoc-card-desc">{description}</p>

          {/* Footer: tags de categoría + autor */}
          <div className="cedoc-card-footer">
            <div className="cedoc-card-tags">
              {/* Tags de categoría (pueden ser varias) */}
              {categories && categories.map((t) => (
                <span className="cedoc-card-chip" key={t}>{t}</span>
              ))}
              {/* Tag fijo "CEDOC" siempre presente */}
              <span className="cedoc-card-chip">CEDOC</span>
            </div>
            <div className="cedoc-card-author">
              Por {displayAuthor}
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}
