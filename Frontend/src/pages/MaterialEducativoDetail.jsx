import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import multimediaService from '../services/multimediaService';
import PageHero from '../components/PageHero';
import '../styles/MaterialEducativoDetail.css';

export default function MaterialEducativoDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await multimediaService.fetchById(id);
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return (
    <div className="page-empty">
      <h2>Cargando...</h2>
    </div>
  );

  if (error || !item) return (
    <div className="page-empty">
      <h2>Material no encontrado</h2>
      <p>{error}</p>
      <Link to="/material-educativo" className="back-link">Volver</Link>
    </div>
  );

  return (
    <>
      <PageHero badge="📚 Material Educativo" title={item.title} description={item.author ? `Por ${item.author}` : ''} />
      <div className="educativo-detail">
        <Link to="/material-educativo" className="back-link">← Volver a Material Educativo</Link>
        <div className="educativo-card">
          <div className="educativo-icon" style={item.url ? { background: 'transparent', overflow: 'hidden' } : {}}>
            {item.url ? (
              <img src={item.url} alt={item.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px' }} />
            ) : (
              "📚"
            )}
          </div>
          <h3 className="educativo-title">{item.title}</h3>
          <p className="educativo-copy">{item.description || 'Este material es de libre distribución para fines pedagógicos.'}</p>
          <p style={{ color: '#999', fontSize: '.9rem' }}>
            {item.author && `Por ${item.author}`}
            {item.uploadedAt && ` · ${new Date(item.uploadedAt).toLocaleDateString()}`}
          </p>
        </div>
      </div>
    </>
  );
}
