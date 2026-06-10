import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import articuloService from '../services/articuloService';
import PageHero from '../components/PageHero';
import '../styles/NoticiaDetail.css';

export default function NoticiaDetail() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const data = await articuloService.fetchById(id);
        setNoticia(data);
        articuloService.incrementViewCount(id).catch(console.error);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNoticia();
  }, [id]);

  if (loading) return (
    <div className="page-empty">
      <h2>Cargando...</h2>
    </div>
  );

  if (error || !noticia) return (
    <div className="page-empty">
      <h2>Noticia no encontrada</h2>
      <p>{error}</p>
      <Link to="/noticias" className="back-link">Volver</Link>
    </div>
  );

  return (
    <>
      <PageHero badge="Noticia" title={noticia.title} description="" />
      <div className="noticia-detail">
        <Link to="/noticias" className="back-link">← Volver a Noticias</Link>
        {noticia.urlPhoto ? (
          noticia.urlPhoto.match(/\.(mp4|webm|ogg)$/i) ? (
            <video controls src={noticia.urlPhoto} className="noticia-media" style={{ background: '#000' }} />
          ) : noticia.urlPhoto.includes('youtube.com/') || noticia.urlPhoto.includes('youtu.be/') ? (
            <iframe src={noticia.urlPhoto.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} className="noticia-media" style={{ border: 'none', height: '400px' }} allowFullScreen title={noticia.title} />
          ) : (
            <img src={noticia.urlPhoto} alt={noticia.title} className="noticia-media" />
          )
        ) : (
          <div className="noticia-media" style={{ background: 'linear-gradient(135deg, var(--rojo), var(--naranja))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', minHeight: '300px' }}>📰</div>
        )}
        <p className="noticia-desc">{noticia.body || noticia.description}</p>
        <p className="noticia-author" style={{ marginTop: '1rem', color: '#999', fontSize: '.9rem' }}>
          Por {noticia.author} · {noticia.createdAt ? new Date(noticia.createdAt).toLocaleDateString() : ''}
        </p>
      </div>
    </>
  );
}
