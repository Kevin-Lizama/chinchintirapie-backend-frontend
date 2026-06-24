/*
 * ============================================================
 * ARTICULOCARD.JSX — Card de Noticia/Crónica
 * ============================================================
 * Muestra una card con imagen, tag de tipo, título, descripción y botón.
 * Se usa en: Home.jsx (sección "Lo que hace vibrar"), Noticias.jsx
 *
 * ESTILOS: Noticias.css → .noticias-card, .noticias-card-media, etc.
 *
 * PROPS (datos que recibe del padre):
 *   articulo.urlPhoto    → URL de la imagen de portada
 *   articulo.title       → Título del artículo
 *   articulo.type        → "NOTICIA" o "CRONICA" (se muestra como tag)
 *   articulo.description → Texto descriptivo (opcional)
 *   articulo.id          → ID para el link "Leer más"
 *
 * NOTA: Este componente es casi idéntico a MultimediaCard.
 * En la Fase 3 de refactorización se planea unificarlos.
 * ============================================================
 */

import { Link } from 'react-router-dom';

export default function ArticuloCard({ articulo }) {
    return (
        <article className="noticias-card">

            {/* Imagen de portada — estilos: .noticias-card-media img */}
            <div className="noticias-card-media">
                <img
                    src={articulo.urlPhoto}
                    alt={articulo.title}
                />
            </div>

            {/* Cuerpo de la card */}
            <div className="noticias-card-body">
                {/* Tag rojo con el tipo (NOTICIA, CRONICA) */}
                <span className="noticias-card-tag">{articulo.type}</span>

                <h3>{articulo.title}</h3>

                {/* Descripción — solo se muestra si existe */}
                {articulo.description && (
                    <p>{articulo.description}</p>
                )}

                {/* Botón "Leer más" — lleva al detalle de la noticia */}
                <Link
                    to={`/noticias/${articulo.id}`}
                    className="link-reset"
                >
                    <button>
                        Leer más
                    </button>
                </Link>
            </div>

        </article>
    );
}