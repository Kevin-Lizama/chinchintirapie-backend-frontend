# 🧠 Memoria del Proyecto — Chinchintirapié

> Archivo de referencia rápida. Consultar antes de hacer cambios grandes.
> Última actualización: 2026-06-24

---

## 📌 Decisiones de Producción (Primera Etapa)

### Tienda / Donaciones — OCULTA (no eliminada)

**Estado:** La funcionalidad existe pero no es visible para los usuarios.

**Qué se hizo:**
- Se quitó el botón CTA rojo "Tienda / Donaciones" del **Navbar** (`Frontend/src/components/Navbar.jsx`)
- Se quitaron los links "Tienda" y "Donaciones" del **Footer** (`Frontend/src/data/navigation.js`, array `contacto`)
- La **ruta** `/tienda` sigue activa en `App.jsx` línea ~171 — si alguien escribe la URL directa, la página carga

**Cómo reactivar la Tienda:**

1. **Navbar** — En `Frontend/src/components/Navbar.jsx`, buscar el comentario `<!-- Link "Contacto" -->` (~línea 146) y agregar ANTES de él:
   ```jsx
   <li>
     <NavLink to="/tienda" className="nav-cta" onClick={() => setMobileOpen(false)}>
       Tienda&nbsp;/&nbsp;Donaciones
     </NavLink>
   </li>
   ```

2. **Footer** — En `Frontend/src/data/navigation.js`, en el array `FOOTER_LINKS.contacto`, agregar:
   ```js
   { label: 'Tienda', to: '/tienda' },
   { label: 'Donaciones', to: '/tienda#donaciones' },
   ```

3. La ruta en `App.jsx` y el lazy import de `Tienda.jsx` ya están listos, no hay que tocar nada ahí.

---

### Login / Ingresar — MOVIDO AL FOOTER (solo para admins)

**Estado:** El botón "Ingresar" ya no aparece en el Navbar. En su lugar hay un link discreto "Acceso administradores" en el pie de página (barra de copyright, esquina derecha).

**Qué se hizo:**
- Se eliminó el botón "Ingresar" del **Navbar** para usuarios no logueados
- El dropdown de usuario logueado (👤 nombre, perfil, panel admin, salir) **sigue funcionando** en el Navbar
- Se agregó `<Link to="/login" className="footer-admin-link">Acceso administradores</Link>` en el **Footer** (`Footer.jsx`, dentro de `.footer-bottom`)
- Se agregaron estilos en `Footer.css` para la clase `.footer-admin-link` (texto pequeño, baja opacidad, se mezcla con el copyright)

**Cómo devolver el Login al Navbar:**

1. **Navbar** — En `Frontend/src/components/Navbar.jsx`, buscar `{isAuthenticated && (() => {` y cambiar a:
   ```jsx
   {isAuthenticated ? (() => {
     // ... (dropdown del usuario, tal como está)
   })() : (
     <li>
       <NavLink to="/login" className="nav-login-btn" onClick={() => setMobileOpen(false)}>
         Ingresar
       </NavLink>
     </li>
   )}
   ```

2. **Footer** — Opcionalmente quitar el link "Acceso administradores" de `Footer.jsx` y sus estilos de `Footer.css`.

---

## 🗂️ Estructura Clave del Proyecto

| Archivo | Propósito |
|---|---|
| `Frontend/src/App.jsx` | Rutas de la app, layout general (navbar + footer + rutas) |
| `Frontend/src/components/Navbar.jsx` | Barra de navegación superior (sticky) |
| `Frontend/src/components/Footer.jsx` | Pie de página con links y redes sociales |
| `Frontend/src/data/navigation.js` | Datos centralizados de links (NAV_LINKS, FOOTER_LINKS, SOCIAL_LINKS) |
| `Frontend/src/styles/Navbar.css` | Estilos del navbar |
| `Frontend/src/styles/Footer.css` | Estilos del footer |
| `Frontend/src/context/AuthContext.jsx` | Estado de autenticación (login/logout) |
| `Frontend/src/components/AdminSidebar.jsx` | Sidebar del panel admin |

---

## 🎨 Convenciones de Diseño

- **Variables CSS**: Definidas en `global.css` — usar `var(--rojo)`, `var(--amarillo)`, `var(--naranja)`, `var(--oscuro)`, `var(--blanco)`, etc.
- **Fuentes**: `var(--font-titulo)` para títulos carnavalescos, sans-serif normal para cuerpo.
- **Comentarios**: Cada archivo tiene un bloque de documentación al inicio explicando estructura, estilos y datos. Mantener este patrón.
- **Lazy loading**: Todas las páginas usan `lazy()` + `<Suspense>` en `App.jsx`.

---

## 📝 Notas Generales

- El proyecto se refactorizó profesionalmente en la conversación `29e5b655` (2026-06-14).
- Las páginas de login/recuperar contraseña NO muestran Navbar ni Footer (controlado en `Layout()` de `App.jsx`).
- El widget de accesibilidad (`AccessibilityWidget.jsx`) siempre está visible (esquina inferior derecha).
