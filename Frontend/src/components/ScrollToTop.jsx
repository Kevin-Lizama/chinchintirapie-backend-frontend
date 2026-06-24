/*
 * ============================================================
 * SCROLLTOTOP.JSX — Botón "Volver Arriba"
 * ============================================================
 * Botón flotante con flecha ↑ que aparece cuando el usuario
 * ha scrolleado más de 300px hacia abajo.
 * Al hacer click, hace scroll suave hasta el inicio de la página.
 *
 * Se usa en: App.jsx (aparece en todas las páginas)
 *
 * ESTILOS: ScrollToTop.css
 * ============================================================
 */

import { useState, useEffect } from 'react';
import '../styles/ScrollToTop.css';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Escuchar scroll: mostrar botón cuando scrollY > 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Al hacer click: scroll suave hasta arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Volver arriba"
    >
      {/* Ícono SVG de flecha hacia arriba */}
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    </button>
  );
}
