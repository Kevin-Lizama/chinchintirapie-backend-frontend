/*
 * ============================================================
 * TICKER.JSX — Cinta de Texto Animada (Marquesina)
 * ============================================================
 * Barra horizontal con texto que se desplaza infinitamente de der a izq.
 * Se usa en: Home.jsx (arriba de todo, antes del hero)
 *
 * ESTILOS: Ticker.css
 *
 * CÓMO FUNCIONA:
 *   El texto se duplica (<span> × 2) para crear un loop infinito.
 *   La animación CSS mueve el contenedor 50% a la izquierda,
 *   y al repetirse, el segundo <span> toma la posición del primero.
 *
 * PROPS:
 *   text → El texto a mostrar (se pasa desde Home.jsx)
 *
 * aria-hidden="true" → Los lectores de pantalla lo ignoran (es decorativo)
 * ============================================================
 */

import '../styles/Ticker.css';

export default function Ticker({ text }) {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-inner">
        {/* El texto se duplica para crear efecto de loop infinito */}
        <span className="ticker-content">{text}</span>
        <span className="ticker-content">{text}</span>
      </div>
    </div>
  );
}
