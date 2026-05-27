import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import Ticker from '../components/Ticker';
import articuloService from '../services/articuloService';

export default function Cronicas() {
  const [cronicas, setCronicas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Le pasamos [cronicas] para que vuelva a ejecutar la animación cuando lleguen los datos
  useReveal([cronicas]);

  useEffect(() => {
    const fetchCronicas = async () => {
      try {
        setLoading(true);
        const data = await articuloService.fetchCronicas();
        // Ordenar por fecha de creación (más recientes primero)
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCronicas(sortedData);
      } catch (error) {
        console.error("Error al obtener crónicas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCronicas();
  }, []);

  return (
    <>
      <Ticker text="📰 Crónicas · Relatos vivos · Historia contada desde adentro · Escuela Carnavalera" />
      <PageHero badge="📰 Periodismo Carnavalero" title="Crónicas" description="Relatos, entrevistas y notas que cuentan la historia viva de la escuela y sus protagonistas en las calles." />
      <section style={{ padding: '4rem 2rem', background: 'var(--crema)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>Cargando crónicas...</div>
          ) : cronicas.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>No hay crónicas disponibles en este momento.</div>
          ) : (
            cronicas.map(({ id, urlPhoto, createdAt, title, body, author, type }) => {
              const fechaFormateada = new Date(createdAt).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });
              const previewBody = body && body.length > 150 ? body.substring(0, 150) + '...' : body;

              return (
                <Link to={`/cronicas/${id}`} key={id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article className="reveal" style={{
                    background: '#fff',
                    borderRadius: 20,
                    padding: '2rem',
                    boxShadow: '0 8px 24px rgba(0,0,0,.07)',
                    display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                  }}>
                    {urlPhoto ? (
                      <div style={{
                        width: 100, height: 100, borderRadius: 12, flexShrink: 0,
                        backgroundImage: `url(${urlPhoto})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }} />
                    ) : (
                      <div style={{
                        width: 64, height: 64, borderRadius: 12, flexShrink: 0,
                        background: 'linear-gradient(135deg, var(--morado-o), var(--purpura))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
                      }}>📰</div>
                    )}
                    
                    <div style={{ flex: 1 }}>
                      <p style={{ color: '#999', fontSize: '.78rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '.3rem' }}>{fechaFormateada}</p>
                      <h3 style={{ fontFamily: 'Boogaloo, cursive', fontSize: '1.4rem', color: 'var(--oscuro)', marginBottom: '.5rem' }}>{title}</h3>
                      <p style={{ color: '#5a3e2b', lineHeight: 1.7, fontSize: '.95rem', marginBottom: '.8rem' }}>{previewBody}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '.5rem' }}>
                        <div style={{ display: 'flex', gap: '.5rem' }}>
                          <span className="meta-tag">{type}</span>
                        </div>
                        <span style={{ color: '#999', fontSize: '.82rem' }}>Por {author}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })
          )}
          
        </div>
      </section>
    </>
  );
}
