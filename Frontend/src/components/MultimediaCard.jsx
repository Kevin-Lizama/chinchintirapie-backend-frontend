/*
 * ============================================================
 * MULTIMEDIACARD.JSX — Card de Multimedia (Repositorio/CEDOC)
 * ============================================================
 * Muestra una card con miniatura inteligente, tag, título,
 * descripción y botón. Usa MediaThumbnail para la miniatura.
 *
 * Se usa en: Home.jsx (sección multimedia), Repositorio.jsx
 *
 * ESTILOS: Noticias.css → .noticias-card, .noticias-card-media, etc.
 *   (Reutiliza los mismos estilos que ArticuloCard)
 *
 * PROPS (datos que recibe del padre):
 *   multimedia.url          → URL del archivo (video, PDF, imagen)
 *   multimedia.thumbnailUrl → URL de miniatura personalizada (opcional)
 *   multimedia.title        → Título
 *   multimedia.type         → "REPOSITORIO" o "CEDOC"
 *   multimedia.description  → Texto descriptivo (opcional)
 *   multimedia.id           → ID para el link
 *
 * DIFERENCIA CON ArticuloCard:
 *   ArticuloCard muestra una imagen directa (urlPhoto).
 *   MultimediaCard usa MediaThumbnail que detecta automáticamente
 *   si es YouTube, PDF, video o imagen y muestra la miniatura apropiada.
 * ============================================================
 */

import { Link } from 'react-router-dom';
import MediaThumbnail from './MediaThumbnail';

export default function MultimediaCard({ multimedia }) {
    return (
        <article className="noticias-card">

            {/* Miniatura inteligente — detecta tipo de archivo automáticamente */}
            <div className="noticias-card-media">
                <MediaThumbnail
                    url={multimedia.url}
                    thumbnailUrl={multimedia.thumbnailUrl}
                    alt={multimedia.title}
                    typeEmoji="📂"
                />
            </div>

            {/* Cuerpo de la card */}
            <div className="noticias-card-body">

                {/* Tag con el tipo (REPOSITORIO, CEDOC) */}
                <span className="noticias-card-tag">
                    {multimedia.type}
                </span>

                <h3>{multimedia.title}</h3>

                {/* Descripción — solo se muestra si existe */}
                {multimedia.description && (
                    <p>{multimedia.description}</p>
                )}

                {/* Botón que lleva al detalle */}
                <Link
                    to={`/multimedia/${multimedia.id}`}
                    className="link-reset"
                >
                    <button>
                        Ver contenido
                    </button>
                </Link>

            </div>

        </article>
    );
}