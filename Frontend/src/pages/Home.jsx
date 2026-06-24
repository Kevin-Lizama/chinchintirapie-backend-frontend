/*
 * ============================================================
 * HOME.JSX — Página Principal
 * ============================================================
 * Esta es la página que se ve al entrar a la web (URL: /).
 * Se divide en 4 secciones visuales de arriba a abajo:
 *
 *   1. Ticker: Cinta de texto animada ("marquesina") arriba de todo
 *   2. Hero: Banner grande con foto de fondo y título principal
 *   3. "Lo que hace vibrar": Noticias + Crónicas + Multimedia del backend
 *   4. "20 Años": Sección oscura con estadísticas
 *   5. Talleres: Cards con los 3 talleres (Baile, Banda, Figurines)
 *
 * ESTILOS:
 *   - Home.css → Estilos de todas las secciones de esta página
 *   - Noticias.css → Estilos de las cards (noticias-card, noticias-card-body, etc.)
 *     Se importa aquí porque las cards de noticias se reutilizan en el Home.
 *
 * DATOS:
 *   - Las noticias, crónicas y multimedia se cargan del BACKEND automáticamente.
 *   - Los talleres y estadísticas son datos ESTÁTICOS definidos aquí abajo.
 * ============================================================
 */

import { Link } from 'react-router-dom';
import Ticker from '../components/Ticker';
import { useState, useEffect } from "react";
import articuloService from '../services/articuloService';       // Llama al backend: GET /api/articulos
import multimediaService from '../services/multimediaService';   // Llama al backend: GET /api/multimedia
import MultimediaCard from '../components/MultimediaCard';       // Card para items del repositorio/cedoc
import ArticuloCard from '../components/ArticuloCard.jsx';       // Card para noticias/crónicas
import MediaThumbnail from '../components/MediaThumbnail';       // Miniatura inteligente (YouTube, PDF, imagen)
import { useReveal } from '../hooks/useReveal';                  // Activa animaciones al hacer scroll
import '../styles/Noticias.css';                                 // Estilos de las cards de noticias
import '../styles/Home.css';                                     // Estilos de las secciones del Home


/* ── Datos Estáticos ──
   Estos datos NO vienen del backend. Si la diseñadora quiere cambiar
   los números o agregar un taller, se editan directamente aquí.
*/

// Estadísticas que aparecen en la sección "20 años"
const STATS = [
  { num: '500+', label: 'Estudiantes' },
  { num: '20',   label: 'Años' },
  { num: '4',    label: 'Talleres' },
  { num: '∞',    label: 'Fiesta' },
];

// Cards de talleres (las imágenes están en /public/img/)
const TALLERES = [
  { img: '/img/Taller-baile.webp', title: 'Baile',    phrase: 'Cuerpo en movimiento' },
  { img: '/img/Taller-banda.webp', title: 'Banda',    phrase: 'Pulso de la calle' },
  { img: '/img/Taller-figurines.webp', title: 'Figurines', phrase: 'Color y memoria' },
];

export default function Home() {
  // useReveal() activa la animación "reveal" cuando los elementos entran en pantalla
  useReveal();

  /* ── Estado (datos del backend) ──
     Estos se llenan automáticamente cuando carga la página.
     Si el backend está caído, quedan vacíos y la sección no se muestra.
  */
  const [noticiasRecientes, setNoticiasRecientes] = useState([]);   // [0]=hero, [1]=side
  const [cronicaReciente, setCronicaReciente] = useState(null);     // La crónica más popular
  const [reposDestacados, setReposDestacados] = useState([]);       // 2 repos más populares
  const [cedocDestacado, setCedocDestacado] = useState(null);       // 1 doc CEDOC más popular

  /* ── Carga de Contenido desde el Backend ──
     Al montar el componente, trae todos los artículos y multimedia.
     Luego los filtra y ordena para mostrar los más relevantes.
     
     LÓGICA DE SELECCIÓN:
     - Noticias: de las 20 más recientes, toma la MÁS RECIENTE como hero
       y la MÁS POPULAR (por viewCount) como secundaria.
     - Crónica: de las 20 más recientes, toma la MÁS POPULAR.
     - Repos: de los 20 más recientes, toma los 2 MÁS POPULARES.
     - CEDOC: de los 20 más recientes, toma el MÁS POPULAR.
  */
  useEffect(() => {
    const cargarContenido = async () => {
      try {
        // Traer TODOS los artículos del backend y ordenar por fecha
        const articulos = await articuloService.fetchAll();
        const ordenados = articulos.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Noticias: filtrar solo type='NOTICIA', tomar las 20 más recientes
        const noticiasRecientes = ordenados.filter((a) => a.type === 'NOTICIA').slice(0, 20);
        const noticiaHero = noticiasRecientes.length > 0 ? noticiasRecientes[0] : null;
        // De las 19 restantes, ordenar por popularidad y tomar la primera
        const noticiasRestantes = noticiasRecientes.slice(1).sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        const noticiaSide = noticiasRestantes.length > 0 ? noticiasRestantes[0] : null;
        
        setNoticiasRecientes([noticiaHero, noticiaSide].filter(Boolean));

        // Crónicas: filtrar solo type='CRONICA', elegir la más popular
        const cronicasRecientes = ordenados.filter((a) => a.type === 'CRONICA').slice(0, 20);
        const cronicasPopulares = [...cronicasRecientes].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        setCronicaReciente(cronicasPopulares.length > 0 ? cronicasPopulares[0] : null);

        // Multimedia: traer todos y ordenar por fecha de subida
        const multimedia = await multimediaService.fetchAll();
        const multOrdenada = multimedia.sort(
          (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
        );

        // Repositorios: filtrar solo type='REPOSITORIO', tomar los 2 más populares
        const reposRecientes = multOrdenada.filter((m) => m.type === 'REPOSITORIO').slice(0, 20);
        const reposPopulares = [...reposRecientes].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        setReposDestacados(reposPopulares.slice(0, 2));

        // CEDOC: filtrar solo type='CEDOC', tomar el más popular
        const cedocRecientes = multOrdenada.filter((m) => m.type === 'CEDOC').slice(0, 20);
        const cedocPopulares = [...cedocRecientes].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        setCedocDestacado(cedocPopulares.length > 0 ? cedocPopulares[0] : null);
      } catch (error) {
        console.error('Error cargando contenido:', error);
      }
    };

    cargarContenido();
  }, []);


  return (
      <>
        {/* ═══════════════════════════════════════════════════════════
            SECCIÓN 1: TICKER (cinta de texto animada)
            Componente: Ticker.jsx → Estilos: Ticker.css
            El texto pasa de derecha a izquierda en loop infinito.
            Para cambiar el texto, editar la prop "text" aquí abajo.
            ═══════════════════════════════════════════════════════════ */}
        <Ticker text="🥁 ¡20 años haciendo carnaval en la calle!   ·   🎺 Próximas fechas: 19 horas · 23 feb · 23 mar   ·   Nuevas inscripciones abiertas para Figurines   ·   Proyectos comunitarios activos en toda la ciudad   ·   Baile · Diseño de figurines · banda" />

        {/* ═══════════════════════════════════════════════════════════
            SECCIÓN 2: HERO (banner grande de bienvenida)
            Estilos: Home.css → .hero, .hero-bg, .hero-content, etc.
            
            IMAGEN DE FONDO: /public/img/chinchintirapie-banner-index.webp
            Para cambiarla: editar la url() en el style del hero-bg.
            
            El gradiente rojo-transparente hace que el texto sea legible
            sobre la foto. Se puede ajustar los % de opacidad.
            
            NOTA: Este inline style se mantiene porque la imagen de fondo
            es dinámica (podría venir del backend en el futuro).
            ═══════════════════════════════════════════════════════════ */}
        <section className="hero" id="inicio">
          <div className="hero-bg" style={{
            background: `
                linear-gradient(
                  to bottom,
                  rgba(190,0,60,0.70) 0%,
                  rgba(190,0,60,0.62) 20%,
                  rgba(190,0,60,0.40) 30%,
                  rgba(190,0,60,0.10) 40%
                ),
                url('/img/chinchintirapie-banner-index.webp') center/cover no-repeat
              `
          }} />
          {/* Contenido del hero: badge + título + botones */}
          <div className="hero-content">
            <div className="hero-badge">
              · Escuela Carnavalera Chinchintirapié ·
            </div>
            <h1 className="hero-title">
              <em className="hero-title-em">20 años </em>de Carnaval y educación popular
            </h1>

            {/* Botones CTA (Call to Action) — estilos en global.css */}
            <div className="hero-btns">
              <Link to="/historia" className="btn btn-primary">Historia</Link>
              <Link to="/repositorio" className="btn btn-secondary">Archivo</Link>
            </div>
          </div>
          {/* Texto "Descubrir" con animación de rebote — invita a scrollear */}
          <div className="scroll-hint">Descubrir</div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECCIÓN 3: "LO QUE HACE VIBRAR LA ESCUELA"
            Estilos: Home.css → .cards-section, .home-vibrar-*
            
            Muestra contenido dinámico del backend en 2 sub-secciones:
            
            A) NOTICIAS RECIENTES (grid de 2 columnas):
               - Izquierda: noticia hero (grande, con overlay de texto)
               - Derecha: 2 cards pequeñas (noticia + crónica)
               
            B) MULTIMEDIAS DESTACADOS (grid de 3 columnas):
               - 2 MultimediaCard del repositorio
               - 1 card CEDOC construida inline
            ═══════════════════════════════════════════════════════════ */}
        <section className="cards-section" id="hitos">
          {/* Header de la sección con título y línea decorativa */}
          <div className="section-header reveal">
            <h2>Lo que hace <span>vibrar</span> la escuela</h2>
            <div className="deco-line"><span></span></div>
            <p>Archivo, crónicas y ensayos que documentan 20 años de fiesta comunitaria.</p>
          </div>

          {/* ── Sub-sección A: Noticias Recientes ── */}
          <div className="home-subsection-wrap">
            {/* Barra con título + línea + botones de navegación */}
            <div className="home-subsection-header reveal">
              <div className="home-subsection-label"> Noticias Recientes</div>
              <div className="home-subsection-line"></div>
              <div className="home-subsection-actions">
                <Link to="/noticias" className="btn-ghost">Todas las Noticias</Link>
                <Link to="/cronicas" className="btn-ghost">Crónicas</Link>
              </div>
            </div>
          </div>

          {/* Grid principal: hero grande (izq) + 2 cards pequeñas (der) */}
          <div className="home-vibrar-grid reveal">
            {/* Hero: la noticia principal, ocupa toda la columna izquierda */}
            {noticiasRecientes[0] && (
              <Link to={`/noticias/${noticiasRecientes[0].id}`} className="home-vibrar-hero">
                <div className="home-vibrar-hero-img">
                  <img
                    src={noticiasRecientes[0].urlPhoto}
                    alt={noticiasRecientes[0].title}
                  />
                </div>
                {/* Overlay oscuro sobre la foto para que el texto sea legible */}
                <div className="home-vibrar-hero-overlay">
                  <span className="noticias-card-tag">{noticiasRecientes[0].type}</span>
                  <h3>{noticiasRecientes[0].title}</h3>
                  {noticiasRecientes[0].description && (
                    <p>{noticiasRecientes[0].description}</p>
                  )}
                  <span className="hero-read-more">Leer más →</span>
                </div>
              </Link>
            )}

            {/* Side: columna derecha con 2 ArticuloCards apiladas */}
            <div className="home-vibrar-side">
              {noticiasRecientes[1] && (
                <ArticuloCard key={noticiasRecientes[1].id} articulo={noticiasRecientes[1]} />
              )}
              {cronicaReciente && (
                <ArticuloCard key={cronicaReciente.id} articulo={cronicaReciente} />
              )}
            </div>
          </div>

          {/* ── Sub-sección B: Multimedias Destacados ── */}
          <div className="home-subsection-wrap">
            <div className="home-subsection-header reveal">
              <div className="home-subsection-label"> Multimedias Destacados</div>
              <div className="home-subsection-line"></div>
              <div className="home-subsection-actions">
                <Link to="/repositorio" className="btn-ghost">Repositorio Audiovisual</Link>
                <Link to="/cedoc" className="btn-ghost">Cedoc</Link>
              </div>
            </div>
          </div>

          {/* Grid de 3 columnas: 2 repos + 1 CEDOC */}
          <div className="home-vibrar-bottom reveal">
            {/* Las 2 primeras cards usan el componente MultimediaCard */}
            {reposDestacados.map((item) => (
              <MultimediaCard key={item.id} multimedia={item} />
            ))}

            {/* La card CEDOC se construye inline porque tiene estructura distinta */}
            {cedocDestacado && (
              <article className="noticias-card">
                <div className="noticias-card-media">
                  <MediaThumbnail
                    url={cedocDestacado.url}
                    thumbnailUrl={cedocDestacado.thumbnailUrl}
                    alt={cedocDestacado.title}
                    typeEmoji="📚"
                  />
                </div>
                <div className="noticias-card-body">
                  <span className="noticias-card-tag">📚 Investigación</span>
                  <h3>{cedocDestacado.title}</h3>
                  {cedocDestacado.description && (
                    <p>{cedocDestacado.description}</p>
                  )}
                  <Link to={`/cedoc/${cedocDestacado.id}`} className="link-reset">
                    <button>Ver investigación</button>
                  </Link>
                </div>
              </article>
            )}
          </div>


        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECCIÓN 4: "20 AÑOS"
            Estilos: Home.css → .años-section, .años-inner, .años-number
            
            Fondo oscuro/morado con el número "20" gigante a la izquierda
            y texto + estadísticas a la derecha.
            
            El anillo SVG gira lentamente alrededor del "20" con texto
            "★ CHINCHINTIRAPIÉ ★ ESCUELA CARNAVALERA ★ DESDE 2004 ★"
            
            Las estadísticas (500+, 20, 4, ∞) se editan en el array STATS arriba.
            ═══════════════════════════════════════════════════════════ */}
        <section className="años-section" id="historia">
          <div className="años-inner">
            {/* Columna izquierda: número 20 gigante con anillo giratorio */}
            <div className="años-visual reveal">
              <div className="años-number">20</div>
              <div className="años-badge-ring">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path id="circ" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" fill="none" />
                  <text fontSize="14" letterSpacing="4">
                    <textPath href="#circ">★ CHINCHINTIRAPIÉ ★ ESCUELA CARNAVALERA ★ DESDE 2004 ★ </textPath>
                  </text>
                </svg>
              </div>
            </div>
            {/* Columna derecha: texto descriptivo + estadísticas */}
            <div className="años-text reveal">
              <h2>Dos décadas haciendo <span>carnaval</span> con el barrio</h2>
              <p>
                Chinchintirapié nació en las calles como una apuesta por recuperar la cultura popular
                latinoamericana a través del cuerpo, el ritmo y la comunidad. En 20 años hemos formado
                cientos de artistas, construido redes comunitarias y llevado el carnaval a cada rincón de la ciudad.
              </p>
              <p>
                Nuestra misión es que la fiesta sea de todos: sin importar edad, origen o experiencia previa.
                La escuela es un espacio de encuentro, creación y transformación social.
              </p>
              {/* Fila de cajitas con estadísticas — se editan en el array STATS */}
              <div className="stats-row">
                {STATS.map(({ num, label }) => (
                    <div className="stat-box" key={label}>
                      <span className="num">{num}</span>
                      <span className="label">{label}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════
            SECCIÓN 5: TALLERES
            Estilos: Home.css → .talleres-section, .taller-mini-card
            
            Muestra los 3 talleres (Baile, Banda, Figurines) como cards.
            Los datos se editan en el array TALLERES arriba.
            Las imágenes están en /public/img/Taller-*.webp
            
            Al final hay un botón que lleva a /organizacion#los-tres-cuerpos
            ═══════════════════════════════════════════════════════════ */}
        <section className="talleres-section" id="talleres">
          <div className="section-header reveal">
            <h2 >Nuestros <span>Talleres</span></h2>
            <div className="deco-line"><span></span></div>
            <p>Descubre los tres pilares fundamentales de nuestra escuela.</p>
          </div>
          {/* Grid de 3 cards de talleres */}
          <div className="talleres-mini-grid">
                {TALLERES.map(({ img, title, phrase }) => (
                  <div className="taller-mini-card reveal" key={title}>
                    <div className="taller-icon">
                      <img src={img} alt={title} />
                    </div>
                    <div className="taller-info">
                      <h3>{title}</h3>
                      <p>{phrase}</p>
                    </div>
                  </div>
                ))}
          </div>
          <div className="talleres-action reveal">
            <a href="/organizacion#los-tres-cuerpos" className="btn btn-primary">Ver Organización</a>
          </div>
        </section>

        {/* EVENTOS — sección pendiente de implementación */}

      </>
  );
}
