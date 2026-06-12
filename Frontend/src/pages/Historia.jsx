import { useState, useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import Ticker from '../components/Ticker';
import { TIMELINE } from '../data/historiaData';
import '../styles/Historia.css';
import '../styles/Cedoc.css';

const STORY_CARDS = [
  {
    title: 'Origen y rebeldía',
    body: 'Lo que hoy ves estallar en la calle con challa y sudor, nació de un susurro ancestral y un acto de rebeldía en la Plaza de Armas en 2005. Allí, entre el asfalto y la bota policial, Rosita Jiménez entendió que el Chinchín no era un accesorio; era el Tambor Callejero Original y Genuino de este país.',
  },
  {
    title: 'De la resistencia a la escuela',
    body: 'Fundada oficialmente el 23 de julio de 2006, la Escuela Carnavalera Chinchintirapié no nació para ser una academia, sino una trinchera de creación social. Somos una organización autogestionada y sin fines de lucro que decidió que la cultura no se pide, se toma.',
  },
  {
    title: 'Aprender-haciendo la fiesta',
    body: 'No buscamos virtuosos, buscamos comunidad. Nuestra propuesta musical no imita ritmos ajenos; construye sobre el latido del Chinchín. Resignificamos la cueca, la cumbia y el huaino para devolverle al pueblo su derecho a la fiesta.',
  },
  {
    title: '20 años de identidad innegociable',
    body: 'Desde la Pincoya hasta el Paseo Ahumada, desde los Mil Tambores hasta la Población El Volcán, hemos regado la ciudad con una verdad incómoda para el sistema: somos dueños de nuestra alegría. Somos una escuela sin paredes.',
  },
];

export default function Historia() {
  useReveal();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fotosRepositorio, setFotosRepositorio] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    setFotosRepositorio([
      { url: '/img/1.webp', caption: 'Ensayos y escuela en movimiento', desc: 'Formación, comunidad y trabajo colectivo.' },
      { url: '/img/2.webp', caption: 'La calle como escenario', desc: 'Comparsas, desfiles, challa y presencia territorial.' },
      { url: '/img/3.webp', caption: 'Memoria, archivo y futuro', desc: 'Hitos, retratos de integrantes y celebraciones importantes.' },
    ]);
  }, []);

  useEffect(() => {
    if (fotosRepositorio.length === 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % fotosRepositorio.length);
    }, 8000);
    return () => clearInterval(intervalRef.current);
  }, [fotosRepositorio.length]);

  const nextImage = () => {
    if (fotosRepositorio.length === 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentImageIndex(prev => (prev + 1) % fotosRepositorio.length);
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(p => (p + 1) % fotosRepositorio.length);
    }, 8000);
  };

  const prevImage = () => {
    if (fotosRepositorio.length === 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentImageIndex(prev => (prev - 1 + fotosRepositorio.length) % fotosRepositorio.length);
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(p => (p + 1) % fotosRepositorio.length);
    }, 8000);
  };

  return (
    <>
      <Ticker text="📜 Historia · Memoria viva · 2006–2026 · Escuela Carnavalera · Autogestión · Comunidad" />

      <main id="contenido">

        {/* HERO */}
        <section className="hero-history">
          <div className="hero-history-inner">
            <div>
              <p className="hero-history-tagline">Escuela carnavalera · 2006–2026</p>
              <h1 className="hero-history-title">Nuestra historia suena en la calle.</h1>
              <p className="hero-history-copy">
                Dos décadas de memoria, autogestión y tambor primario convertidas en escuela, comunidad y fiesta popular.
              </p>
              <div className="hero-history-actions">
                <a href="#historia" className="btn btn-primary">Leer historia</a>
                <a href="#galeria" className="btn btn-secondary">Ver fotos</a>
              </div>
            </div>
            <aside className="hero-history-aside">
              <p className="hero-history-quote">"Me contaron los abuelos que hace tiempo..."</p>
              <p className="hero-history-copy">
                Lo que hoy estalla con challa y sudor nació como un gesto de resistencia cultural y se volvió una escuela sin paredes.
              </p>
              <small className="hero-history-note">Tambor callejero original y genuino</small>
            </aside>
          </div>
        </section>

        {/* HISTORIA EDITORIAL */}
        <section className="story-section section-crema" id="historia">
          <div className="section-inner">
            <div className="section-header">
              <p>Memoria viva</p>
              <h2>CHINCHINTIRAPIÉ: LA MAQUINARIA DEL TAMBOR PRIMARIO</h2>
            </div>
            <div className="story-grid">
              {STORY_CARDS.map(({ title, body }) => (
                <article key={title} className="story-card">
                  <h3 className="story-card-title">{title}</h3>
                  <p className="story-card-copy">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LÍNEA DE TIEMPO */}
        <section className="timeline-section" style={{ padding: '4rem 2rem', background: 'var(--crema)' }}>
          <div className="section-inner">
            <div className="section-header">
              <p>Hitos históricos</p>
              <h2>Línea de tiempo</h2>
            </div>
            <div className="timeline">
              {TIMELINE.map(({ year, text }) => (
                <div className="timeline-item" key={year}>
                  <div className="timeline-year">{year}</div>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISIÓN Y VISIÓN */}
        <section className="mission-section">
          <div className="section-inner">
            <div className="section-header">
              <p style={{ color: '#ffffff' }}>Horizonte colectivo</p>
              <h2>Misión y visión</h2>
            </div>
            <div className="mission-grid">
              {[
                {
                  tag: 'Misión',
                  title: 'El latido que organiza',
                  body: 'Nuestra misión es rescatar, fortalecer y proyectar el Chinchín como expresión viva de identidad popular, formando comunidad a través del arte callejero. Defendemos la autogestión cultural como un acto de dignidad.',
                },
                {
                  tag: 'Visión',
                  title: 'El futuro suena a calle',
                  body: 'Proyectamos un Chile donde el Chinchín y la cultura carnavalera sean reconocidos como patrimonio vivo, presente en cada barrio, población y territorio. Una ciudad donde el ritmo no sea silenciado.',
                },
              ].map(({ tag, title, body }) => (
                <article key={tag} className="mission-card">
                  <span className="mission-badge">{tag}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* GALERÍA */}
        <section className="gallery-section section-crema" id="galeria">
          <div className="section-inner">
            <div className="section-header">
              <p>Archivo visual</p>
              <h2>Galería fotográfica</h2>
            </div>

            <div className="gallery-carousel">
              {fotosRepositorio.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '2rem' }}>Próximamente fotos del Archivo</p>
              ) : (
                <>
                  <div className="carousel-container">
                    <img
                      src={fotosRepositorio[currentImageIndex].url}
                      alt={fotosRepositorio[currentImageIndex].caption}
                      className="gallery-img"
                      loading="lazy"
                    />
                    <button className="carousel-btn carousel-btn--left" onClick={prevImage}>❮</button>
                    <button className="carousel-btn carousel-btn--right" onClick={nextImage}>❯</button>
                    <div className="carousel-dots">
                      {fotosRepositorio.map((_, i) => (
                        <button
                          key={i}
                          className={'carousel-dot' + (i === currentImageIndex ? ' active' : '')}
                          onClick={() => setCurrentImageIndex(i)}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="carousel-desc">
                    {fotosRepositorio[currentImageIndex].desc}
                  </p>
                </>
              )}
            </div>

          </div>
        </section>

      </main>
    </>
  );
}