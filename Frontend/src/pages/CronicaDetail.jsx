import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import articuloService from '../services/articuloService';
import PageHero from '../components/PageHero';

export default function CronicaDetail() {
  const { id } = useParams();
  const [cronica, setCronica] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCronica = async () => {
      try {
        setLoading(true);
        // Llamamos al backend usando el servicio que ya tenías creado
        const data = await articuloService.fetchById(id);
        setCronica(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCronica();
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '5rem' }}><h2>Cargando crónica...</h2></div>;
  }

  if (error || !cronica) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <h2>Crónica no encontrada</h2>
        <Link to="/cronicas">Volver</Link>
      </div>
    );
  }

  // Formateamos la fecha que viene del backend (ej: "2026-05-25T15:30:00")
  const fechaFormateada = new Date(cronica.createdAt).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <PageHero 
        badge="📰 Crónica" 
        title={cronica.title} 
        description={`Por ${cronica.author} | ${fechaFormateada}`} 
      />
      <div style={{ maxWidth: 800, margin: '4rem auto', padding: '0 2rem' }}>
        <Link to="/cronicas" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--purpura)', fontWeight: 'bold', textDecoration: 'none' }}>
          ← Volver a Crónicas
        </Link>
        {cronica.urlPhoto ? (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img src={cronica.urlPhoto} alt={cronica.title} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,.1)' }} />
          </div>
        ) : (
          <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '2rem' }}>📰</div>
        )}
        
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
          <span className="meta-tag">{cronica.type}</span>
        </div>
        
        <div style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#444', background: 'var(--crema)', padding: '2rem', borderRadius: 16 }}>
          {/* El body puede contener saltos de línea, así que lo mostramos respetando el formato */}
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {cronica.body}
          </div>
        </div>
      </div>
    </>
  );
}
