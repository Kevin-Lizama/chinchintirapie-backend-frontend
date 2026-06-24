/*
 * ============================================================
 * PAGEHERO.JSX — Header Reutilizable de Páginas Internas
 * ============================================================
 * Componente que muestra un header grande tipo "hero" para
 * las páginas internas (Historia, Organización, etc.)
 *
 * Se usa en: Historia.jsx, Organizacion.jsx, y otras páginas
 *
 * ESTILOS: PageHero.css → .page-hero, .page-hero-badge
 *
 * PROPS:
 *   badge       → Texto del badge superior (ej: "· Nuestra Historia ·")
 *   title       → Título principal
 *   titleEm     → Parte del título en cursiva/destacada (opcional)
 *   description → Texto descriptivo debajo del título (opcional)
 *   variant     → Variante visual ('default', 'historia', etc.)
 *                  Agrega clase .page-hero--{variant} para estilos distintos
 *
 * EJEMPLO DE USO:
 *   <PageHero
 *     badge="· Nuestra Historia ·"
 *     titleEm="20 años"
 *     title="de carnaval en la calle"
 *     description="Conoce nuestro recorrido..."
 *     variant="historia"
 *   />
 * ============================================================
 */

import '../styles/PageHero.css';

export default function PageHero({ badge, title, titleEm, description, variant = 'default' }) {
  return (
    <div className={`page-hero page-hero--${variant}`}>
      {/* Badge superior — solo se muestra si se pasa la prop */}
      {badge && <div className="page-hero-badge">{badge}</div>}

      {/* Título — puede tener una parte en cursiva (titleEm) */}
      <h1>
        {titleEm && <em>{titleEm} </em>}
        {title}
      </h1>

      {/* Descripción — solo se muestra si se pasa la prop */}
      {description && <p>{description}</p>}
    </div>
  );
}
