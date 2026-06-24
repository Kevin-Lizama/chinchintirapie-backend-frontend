/*
 * ============================================================
 * NAVBAR.JSX — Barra de Navegación Superior
 * ============================================================
 * Aparece en TODAS las páginas (excepto login/password).
 * Es "sticky": se queda fija arriba al hacer scroll.
 *
 * ESTRUCTURA VISUAL (de izq a der):
 *   [Logo giratorio + "Chinchintirapié"]  [Links de navegación...]  [Contacto] [Usuario (solo logueado)]
 *
 * En móvil (<900px) colapsa en un menú hamburguesa ☰
 *
 * ESTILOS: Navbar.css
 *
 * DATOS DE LOS LINKS:
 *   Los links de navegación vienen de /data/navigation.js (NAV_LINKS).
 *   Ahí se puede agregar/quitar links del menú y sus submenús (dropdowns).
 *   "Contacto" está hardcodeado aquí directamente.
 *   "Tienda / Donaciones" está OCULTA (primera etapa). Ver Navbar.jsx línea ~146.
 *   "Ingresar" se movió al footer como "Acceso administradores".
 *
 * DROPDOWNS: Algunos links tienen submenú desplegable (ej: "Archivo" → CEDOC, Repositorio).
 *   Al hacer click se abre el dropdown. Al hacer click fuera, se cierra.
 *
 * AUTENTICACIÓN:
 *   - Si el usuario NO está logueado → muestra botón "Ingresar"
 *   - Si el usuario SÍ está logueado → muestra su nombre + dropdown con:
 *     - "Mi perfil"
 *     - "Panel Admin" (solo si es admin)
 *     - "Salir"
 * ============================================================
 */

import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { NAV_LINKS } from '../data/navigation';   // Links del menú (editar ahí para agregar/quitar)
import { useAuth } from '../context/AuthContext';  // Acceso al estado de login

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);    // ¿Está abierto el menú hamburguesa?
  const [openDropdown, setOpenDropdown] = useState(null);  // ¿Cuál dropdown está abierto? (null=ninguno)
  const navRef = useRef(null);                             // Referencia al <nav> para detectar clicks fuera
  const { user, isAuthenticated, logout } = useAuth();     // Estado de autenticación
  const navigate = useNavigate();

  // Cerrar sesión y volver al inicio
  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  // Cerrar dropdowns cuando el usuario hace click FUERA del navbar
  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Abrir/cerrar un dropdown específico
  const toggleDropdown = (label, e) => {
    e.stopPropagation();  // Evita que el click cierre inmediatamente el dropdown
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
      <nav className="navbar" ref={navRef} role="navigation" aria-label="Navegación principal">

        {/* ── Logo (izquierda) ──
            Logo giratorio + texto "Chinchintirapié / Escuela Carnavalera"
            Estilos: Navbar.css → .logo-wrap, .logo-img, .logo-text
            Imagen: /public/img/logo-chinchitirapie.webp
        */}
        <Link to="/" className="logo-wrap" onClick={() => setMobileOpen(false)}>
          <div className="logo-img">
            <img
                src="/img/logo-chinchitirapie.webp"
                alt="Logo Chinchintirapie"
            />
          </div>
          <div className="logo-text">
            <span className="logo-name">Chinchintirapié</span>
            <span className="logo-sub">Escuela Carnavalera</span>
          </div>
        </Link>

        {/* ── Botón Hamburguesa (solo visible en móvil) ──
            Muestra ☰ cuando está cerrado y ✕ cuando está abierto.
            Estilos: Navbar.css → .hamburger (display:none en desktop)
        */}
        <button
            className="hamburger"
            aria-label="Menú"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        {/* ── Links de Navegación ──
            En desktop: fila horizontal. En móvil: lista vertical desplegable.
            Los links vienen del array NAV_LINKS (archivo /data/navigation.js)
        */}
        <ul className={`nav-links${mobileOpen ? ' mobile-open' : ''}`} id="navLinks">
          {NAV_LINKS.map((item) =>
              // Si el link tiene "children", es un dropdown
              item.children ? (
                  <li
                      key={item.label}
                      className={`has-dropdown${openDropdown === item.label ? ' open' : ''}`}
                  >
                    {/* Botón que abre/cierra el dropdown */}
                    <button onClick={(e) => toggleDropdown(item.label, e)}>
                      {item.label} <span className="caret">▾</span>
                    </button>
                    {/* Menú desplegable — Estilos: Navbar.css → .dropdown */}
                    <div className="dropdown">
                      {item.children.map((child) => (
                          <NavLink
                              key={child.to}
                              to={child.to}
                              onClick={() => { setOpenDropdown(null); setMobileOpen(false); }}
                          >
                            {child.label}
                          </NavLink>
                      ))}
                    </div>
                  </li>
              ) : (
                  // Link simple sin submenú
                  <li key={item.label}>
                    <NavLink
                        to={item.to}
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                        onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
              )
          )}

          {/* ── Link "Contacto" ── */}
          <li>
            <NavLink to="/contacto" onClick={() => setMobileOpen(false)}>Contacto</NavLink>
          </li>

          {/* ── Botón de Usuario (solo visible si está logueado) ──
              Si está logueado: muestra "👤 NOMBRE ▾" con dropdown (perfil, admin, salir)
              Si NO está logueado: no se muestra nada (el login está en el footer)
              Estilos: Navbar.css → .nav-login-btn, .nav-user-btn, .user-dropdown
          */}
          {isAuthenticated && (() => {
            const roleLabel =
              user?.role === 'admin' || user?.role === 'ADMIN'
                ? 'Admin'
                : user?.role === 'client' || user?.role === 'CLIENT'
                  ? 'Cliente'
                  : 'Usuario';

            return (
              <li className={`has-dropdown${openDropdown === 'userMenu' ? ' open' : ''}`}>
                <button
                    onClick={(e) => toggleDropdown('userMenu', e)}
                    className="nav-login-btn nav-user-btn"
                >
                  <span className="nav-user-name">
                    👤 {user?.fullName?.split(' ')[0]?.toUpperCase()}
                  </span>
                  <span className="caret">▾</span>
                </button>
                {/* Dropdown del usuario — Estilos: Navbar.css → .user-dropdown */}
                <div className="dropdown user-dropdown">
                  <NavLink
                      to="/perfil"
                      onClick={() => { setOpenDropdown(null); setMobileOpen(false); }}
                  >
                    Mi perfil
                  </NavLink>
                  {/* "Panel Admin" solo se muestra si el usuario tiene rol admin */}
                  {(user?.role === 'admin' || user?.role === 'ADMIN') && (
                      <NavLink
                          to="/admin"
                          onClick={() => { setOpenDropdown(null); setMobileOpen(false); }}
                      >
                        Panel Admin
                      </NavLink>
                  )}
                  <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); setOpenDropdown(null); handleLogout(); }}
                  >
                    Salir
                  </a>
                </div>
              </li>
            );
          })()}
        </ul>
      </nav>
  );
}
