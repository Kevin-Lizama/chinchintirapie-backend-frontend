import { useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Organizacion.css';

const CUERPOS = [
  {
    img: '/img/cuerpo_banda.webp',
    title: 'Cuerpo de Banda',
    category: 'Música y Ritmo',
    color: 'var(--verde-agua, #20B2AA)',
    desc: 'El motor percusivo y melódico de nuestra identidad. Son la base rítmica implacable que marca el pulso de la calle en cada presentación.',
    contenidos: ['Percusión', 'Vientos', 'Arreglos'],
    miembros: 45,
  },
  {
    img: '/img/cuerpo_baile.webp',
    title: 'Cuerpo de Baile',
    category: 'Movimiento',
    color: 'var(--coral, #FF7F50)',
    desc: 'La manifestación física de nuestro sonido. Transforman el ritmo en movimiento vibrante, conectando con la emoción y energía del público.',
    contenidos: ['Coreografía', 'Expresión Corporal', 'Danzas Afro'],
    miembros: 60,
  },
  {
    img: '/img/cuerpo_figurines.webp',
    title: 'Cuerpo de Figurines',
    category: 'Diseño y Mística',
    color: 'var(--violeta, #8A2BE2)',
    desc: 'Los guardianes de la mística, la sátira y la memoria. Encarnan el alma histórica de La Chinchin a través del diseño de personajes.',
    contenidos: ['Vestuario', 'Maquillaje', 'Personajes'],
    miembros: 15,
  },
];

const ENGRANAJES = [
  {
    title: 'Equipo de Autogestión',
    desc: 'El motor de nuestra independencia. Diseñan las estrategias financieras y logísticas que aseguran la viabilidad del colectivo.',
    area: 'autogestion',
  },
  {
    title: 'Equipo de Investigación',
    desc: 'Los arqueólogos de nuestra cultura. Rescatan, analizan y documentan saberes mediante metodologías propias.',
    area: 'investigacion',
  },
  {
    title: 'Equipo de Pedagogía',
    desc: 'La academia de la calle. A través de sistemas de enseñanza exclusivos, forman a las nuevas generaciones.',
    area: 'pedagogia',
  },
  {
    title: 'Equipo de Diseño',
    desc: 'Los arquitectos de nuestra identidad visual. Traducen nuestro sonido y furia en colores, formas y estéticas.',
    area: 'diseno',
  },
  {
    title: 'Equipo de Comunicaciones',
    desc: 'La voz del colectivo. Proyectan nuestra narrativa hacia el mundo, conectando a La Chinchin con festivales.',
    area: 'comunicaciones',
  },
  {
    title: 'Equipo de Protocolo',
    desc: 'Encargado de redactar y mantener los estatutos de convivencia, promoviendo el respeto, la organización y el buen funcionamiento dentro de la agrupación.',
    area: 'protocolo',
  },
  {
    title: 'Equipo de Cariñitos',
    desc: 'El corazón de La Chinchin. Equipo de bienestar interno dedicado a cuidar nuestra gente y mejorar la convivencia.',
    area: 'carinitos',
  },
];

export default function Organizacion() {
  useReveal();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [hash]);

  return (
    <>
      <Ticker text="Ecosistema vivo · Tres cuerpos · Autogestión · Maquinaria cultural · Disciplina colectiva" />
      <PageHero
        badge="Ecosistema Vivo"
        title="ecosistema: la maquinaria detrás del latido"
        titleEm="Nuestro"
        description="Conoce cómo nos organizamos para sostener el arte, la autogestión y la disciplina colectiva."
        variant="purple"
      />

      <main className="organizacion-page">
        <section className="organizacion-intro reveal">
          <div className="organizacion-intro-grid">
            <img
              src="/img/organizacion-.webp"
              alt="Miembros de Chinchintirapie reunidos"
              className="organizacion-hero-img"
            />
            <p className="organizacion-text">
              En la calle nacimos y en la calle vibramos. Lo que el público experimenta como una explosión
              visceral de energía es el resultado de una maquinaria cultural perfectamente engranada.{' '}
              <strong>La Chinchin no es solo una agrupación; es un ecosistema vivo.</strong>{' '}
              La autogestión, cuando se hace con disciplina, crea un modelo de trabajo capaz de inspirar
              a cualquier colectivo artístico.
            </p>
          </div>
        </section>

        <style>{`
          .custom-cuerpos-header h2 {
            font-size: clamp(2.5rem, 4vw, 3.5rem);
            font-weight: 800;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            color: #FFD700;
          }
          .custom-cuerpos-header p {
            color: #FFD700;
            font-size: 1.1rem;
            margin-top: 0.5rem;
            margin-bottom: 3rem;
          }
          .custom-cuerpos-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
          }
          .custom-cuerpo-card {
            background: #111;
            border-radius: 16px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid #222;
          }
          .custom-cuerpo-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          .custom-img-container {
            position: relative;
            height: 260px;
            width: 100%;
          }
          .custom-img-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .custom-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.9) 100%);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 1.5rem;
          }
          .custom-badge {
            align-self: flex-start;
            padding: 0.5rem 1.2rem;
            border-radius: 30px;
            font-weight: 700;
            font-size: 0.85rem;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          }
          .custom-title {
            color: #fff;
            font-size: 1.8rem;
            font-weight: 800;
            margin: 0;
            text-align: left;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          }
          .custom-body {
            padding: 2rem 1.5rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            justify-content: space-between;
          }
          .custom-desc {
            color: #ccc;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 2.5rem;
            text-align: left;
          }
          .custom-footer {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          .custom-footer-text {
            color: #666;
            font-size: 0.95rem;
            margin: 0;
            font-weight: 500;
          }
          .custom-btn {
            display: inline-block;
            padding: 1rem 2rem;
            border-radius: 40px;
            color: #fff;
            text-decoration: none;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: filter 0.3s ease, transform 0.2s ease;
            width: 100%;
            text-align: center;
            border: none;
            cursor: pointer;
          }
          .custom-btn:hover {
            filter: brightness(1.2);
            transform: scale(1.02);
          }
          @media (max-width: 992px) {
            .custom-cuerpos-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 768px) {
            .custom-cuerpos-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <section className="organizacion-body" id="los-tres-cuerpos">
          <div className="custom-cuerpos-header reveal" style={{ textAlign: 'center' }}>
            <h2>Los tres <span>cuerpos</span></h2>
            <div className="deco-line"></div>
            <p>El frente de acción que da vida a nuestra identidad en el espacio público.</p>
          </div>
          <div className="custom-cuerpos-grid">
            {CUERPOS.map(({ img, title, desc, category, color }) => (
              <article key={title} className="custom-cuerpo-card reveal">
                <div className="custom-img-container">
                  <img src={img} alt={title} loading="lazy" />
                  <div className="custom-overlay">
                    <span className="custom-badge" style={{ backgroundColor: color }}>{category}</span>
                    <h3 className="custom-title">{title}</h3>
                  </div>
                </div>
                <div className="custom-body">
                  <p className="custom-desc">{desc}</p>
                  <div className="custom-footer">
                    <p className="custom-footer-text">¿Te interesa sumarte?</p>
                    <Link to="/contacto" className="custom-btn" style={{ backgroundColor: color }}>Ver inscripción</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="organizacion-gear-section">
          <div className="section-header reveal gear-header-override">
            <span className="gear-eyebrow">ESTRUCTURA INTERNA</span>
            <h2 style={{ color: 'var(--morado-o)' }}>El engranaje <span style={{ color: 'var(--morado-o)' }}>interno</span></h2>
            <div className="gear-divider"></div>
            <p className="gear-subtitle"><em>Para que el arte explote en la calle, el trabajo en la sombra debe ser impecable.</em></p>
          </div>
          <div className="organizacion-gear-grid">
            {ENGRANAJES.map(({ title, desc }) => (
              <article key={title} className="organizacion-gear-card reveal">
                <div className="organizacion-gear-content">
                  <h3 className="organizacion-gear-title">{title}</h3>
                  <p className="organizacion-gear-desc">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}