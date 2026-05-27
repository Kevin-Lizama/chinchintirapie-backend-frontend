import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import multimediaService from '../services/multimediaService';
import PageHero from '../components/PageHero';
import '../styles/CedocDetail.css';

export default function CEDOCDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await multimediaService.fetchById(id);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return (
    <div className="page-empty-state">
      <h2>Cargando...</h2>
    </div>
  );

  if (error || !article) return (
    <div className="page-empty-state">
      <h2>Artículo no encontrado</h2>
      <p>{error}</p>
      <Link to="/cedoc" className="page-back-link">Volver</Link>
    </div>
  );

  return (
    <>
      <PageHero badge="📄 CEDOC" title={article.title} description="" />
      <div className="page-container">
        <Link to="/cedoc" className="page-back-link">← Volver al CEDOC</Link>
        <div className="detail-page-row">
          <div className="article-icon detail-article-icon" style={article.url ? { padding: 0, overflow: 'hidden', background: 'transparent' } : { background: 'linear-gradient(135deg, var(--purpura), var(--azul))' }}>
            {article.url ? (
              <img src={article.url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              "📚"
            )}
          </div>
          <div>
            <div className="tag-row">
              {article.categories && article.categories.map((t) => <span key={t} className="meta-tag topic-pill">{t}</span>)}
              <span className="meta-tag topic-pill">CEDOC</span>
            </div>
            <p className="detail-article-description">{article.description}</p>
            <p style={{ marginTop: '1rem', color: '#999', fontSize: '.9rem' }}>
              Por {article.author} · {article.uploadedAt ? new Date(article.uploadedAt).toLocaleDateString() : ''}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
