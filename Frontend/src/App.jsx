/*
 * ============================================================
 * APP.JSX — Archivo Raíz del Frontend
 * ============================================================
 * Este archivo controla la ESTRUCTURA GENERAL de la aplicación:
 * - Qué páginas existen y en qué URL se muestran
 * - Qué elementos aparecen en TODAS las páginas (Navbar, Footer)
 * - El sistema de autenticación (login/logout)
 *
 * MAPA DEL SITIO (todas las URLs del sitio están aquí):
 *
 * PÚBLICAS:
 *   /                    → Home (página principal)
 *   /historia            → Historia de la escuela
 *   /organizacion        → Organización y talleres
 *   /noticias            → Listado de noticias
 *   /cronicas            → Listado de crónicas
 *   /repositorio         → Repositorio audiovisual
 *   /cedoc               → Centro de documentación
 *   /material-educativo  → Material pedagógico
 *   /contacto            → Formulario de contacto
 *   /tienda              → Tienda y donaciones
 *
 * DETALLES (una sola noticia/crónica/etc):
 *   /noticias/123        → Detalle de noticia con id=123
 *   /cronicas/123        → Detalle de crónica
 *   /repositorio/123     → Detalle de elemento del repositorio
 *   /cedoc/123           → Detalle de documento CEDOC
 *   /material-educativo/123 → Detalle de material educativo
 *
 * AUTENTICACIÓN:
 *   /login               → Inicio de sesión
 *   /recuperar-password  → Solicitar recuperación de contraseña
 *   /reset-password      → Cambiar contraseña (con token)
 *   /perfil              → Perfil del usuario logueado
 *
 * ADMIN (panel de administración, requiere rol admin):
 *   /admin               → Dashboard principal
 *   /admin/noticias      → Crear/editar noticia
 *   /admin/cronicas      → Crear/editar crónica
 *   /admin/material      → Crear/editar material educativo
 *   /admin/repositorio   → Crear/editar elemento del repositorio
 *   /admin/cedoc         → Crear/editar documento CEDOC
 *   /admin/eventos       → Crear/editar eventos
 *   /admin/usuarios      → Gestión de usuarios
 * ============================================================
 */

import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

/* Componentes que se cargan SIEMPRE (aparecen en todas las páginas) */
import Navbar from './components/Navbar.jsx'           // Barra de navegación superior
import Footer from './components/Footer.jsx'           // Pie de página
import ScrollToTop from './components/ScrollToTop.jsx' // Botón "volver arriba"
import { AuthProvider } from './context/AuthContext'    // Manejo de sesión del usuario
import './styles/global.css'                           // Estilos globales (colores, fuentes, etc.)
import AccessibilityWidget from './components/AccessibilityWidget' // Widget de accesibilidad (contraste, texto grande, etc.)


/*
 * ── Lazy Loading ──
 * Las páginas se cargan "bajo demanda": solo cuando el usuario las visita.
 * Esto hace que la carga inicial sea más rápida porque no descarga todo de golpe.
 * Mientras se descarga una página, se muestra el PageLoader ("🥁 Cargando...").
 */

// Páginas principales del sitio público
const Home            = lazy(() => import('./pages/Home.jsx'))
const Historia        = lazy(() => import('./pages/Historia.jsx'))
const Organizacion    = lazy(() => import('./pages/Organizacion.jsx'))
const Noticias        = lazy(() => import('./pages/Noticias.jsx'))
const CEDOC           = lazy(() => import('./pages/CEDOC.jsx'))
const Contacto        = lazy(() => import('./pages/Contacto.jsx'))
const Tienda          = lazy(() => import('./pages/Tienda.jsx'))
const Login           = lazy(() => import('./pages/Login.jsx'))
const RecuperarPassword = lazy(() => import('./pages/RecuperarPassword.jsx'))
const ResetPassword   = lazy(() => import('./pages/ResetPassword.jsx'))
const Perfil          = lazy(() => import('./pages/Perfil.jsx'))


// ADMIN — Páginas del panel de administración
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard.jsx'))
const NoticiasAdmin  = lazy(() => import('./pages/Admin/NoticiasAdmin.jsx'))
const AdminLayout    = lazy(() => import('./pages/Admin/AdminLayout.jsx'))
const NoticiasList   = lazy(() => import('./pages/Admin/NoticiasList.jsx'))
const AdminList      = lazy(() => import('./pages/Admin/AdminList.jsx'))
const AdminForm      = lazy(() => import('./pages/Admin/AdminForm.jsx'))
const CronicasAdmin  = lazy(() => import('./pages/Admin/CronicasAdmin.jsx'))
const CronicasList   = lazy(() => import('./pages/Admin/CronicasList.jsx'))
const UsuariosAdmin  = lazy(() => import('./pages/Admin/UsuariosAdmin.jsx'))
const UsuariosList   = lazy(() => import('./pages/Admin/UsuariosList.jsx'))
const MaterialAdmin  = lazy(() => import('./pages/Admin/MaterialAdmin.jsx'))
const MaterialList   = lazy(() => import('./pages/Admin/MaterialList.jsx'))
const RepositorioAdmin = lazy(() => import('./pages/Admin/RepositorioAdmin.jsx'))
const RepositorioList  = lazy(() => import('./pages/Admin/RepositorioList.jsx'))
const CedocAdmin     = lazy(() => import('./pages/Admin/CedocAdmin.jsx'))
const CedocList      = lazy(() => import('./pages/Admin/CedocList.jsx'))

// Páginas de contenido adicional
const Cronicas          = lazy(() => import('./pages/Cronicas.jsx'))
const Repositorio       = lazy(() => import('./pages/Repositorio.jsx'))
const MaterialEducativo = lazy(() => import('./pages/MaterialEducativo.jsx'))

// Páginas de detalle individual (cuando haces click en una noticia, crónica, etc.)
const NoticiaDetail           = lazy(() => import('./pages/NoticiaDetail.jsx'))
const CronicaDetail           = lazy(() => import('./pages/CronicaDetail.jsx'))
const RepositorioDetail       = lazy(() => import('./pages/RepositorioDetail.jsx'))
const CEDOCDetail             = lazy(() => import('./pages/CEDOCDetail.jsx'))
const MaterialEducativoDetail = lazy(() => import('./pages/MaterialEducativoDetail.jsx'))

/*
 * ── PageLoader ──
 * Componente que se muestra mientras una página se está descargando.
 * Aparece centrado en la pantalla con el emoji 🥁 y "Cargando..."
 * Estilos en: global.css → .page-loader
 */
function PageLoader() {
    return (
        <div className="page-loader">
            🥁 Cargando...
        </div>
    )
}

/*
 * ── Layout ──
 * Componente que define la ESTRUCTURA de todas las páginas:
 *   1. Navbar (arriba) — excepto en login/password
 *   2. Contenido de la página (en medio)
 *   3. Footer (abajo) — excepto en login/password
 *   4. Widget de accesibilidad (siempre visible, esquina inferior derecha)
 *   5. Botón "volver arriba" (aparece al hacer scroll)
 *
 * También controla que al cambiar de página, se haga scroll al inicio.
 */
function Layout() {
    const { pathname, hash } = useLocation()

    // Las páginas de login/recuperar contraseña NO muestran Navbar ni Footer
    const isLogin = pathname.startsWith('/login')
        || pathname.startsWith('/recuperar-password')
        || pathname.startsWith('/reset-password')

    // Al cambiar de página, vuelve al inicio (excepto si hay un #ancla en la URL)
    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0)
        }
    }, [pathname, hash])

    return (
        <>
            {/* Navbar: solo se muestra si NO estamos en login/password */}
            {!isLogin && <Navbar />}

            {/* Suspense: mientras se carga una página, muestra PageLoader */}
            <Suspense fallback={<PageLoader />}>
                <Routes>

                    {/* ── PÁGINAS PÚBLICAS ── */}
                    <Route path="/" element={<Home />} />
                    <Route path="/historia" element={<Historia />} />
                    <Route path="/organizacion" element={<Organizacion />} />
                    <Route path="/noticias" element={<Noticias />} />
                    <Route path="/cronicas" element={<Cronicas />} />
                    <Route path="/repositorio" element={<Repositorio />} />
                    <Route path="/cedoc" element={<CEDOC />} />
                    <Route path="/material-educativo" element={<MaterialEducativo />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/tienda" element={<Tienda />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/recuperar-password" element={<RecuperarPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/perfil" element={<Perfil />} />

                    {/* ── PÁGINAS DE DETALLE ──
                        El :id es dinámico. Ejemplo: /noticias/5 muestra la noticia con id=5
                    */}
                    <Route path="/noticias/:id" element={<NoticiaDetail />} />
                    <Route path="/cronicas/:id" element={<CronicaDetail />} />
                    <Route path="/repositorio/:id" element={<RepositorioDetail />} />
                    <Route path="/cedoc/:id" element={<CEDOCDetail />} />
                    <Route path="/material-educativo/:id" element={<MaterialEducativoDetail />} />
                   

                    {/* ── PANEL ADMIN ──
                        AdminLayout envuelve todas las sub-rutas de admin.
                        Contiene el sidebar lateral y el área de contenido.
                        Solo accesible para usuarios con rol "admin".
                    */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />

                        <Route path="noticias" element={<NoticiasAdmin />} />
                        <Route path="noticias/editar" element={<NoticiasList />} />

                        <Route path="cronicas" element={<CronicasAdmin />} />
                        <Route path="cronicas/editar" element={<CronicasList />} />

                        <Route path="material" element={<MaterialAdmin />} />
                        <Route path="material/editar" element={<MaterialList />} />

                        <Route path="repositorio" element={<RepositorioAdmin />} />
                        <Route path="repositorio/editar" element={<RepositorioList />} />

                        <Route path="cedoc" element={<CedocAdmin />} />
                        <Route path="cedoc/editar" element={<CedocList />} />

                        <Route path="eventos" element={<AdminForm tipo="evento" />} />
                        <Route path="eventos/editar" element={<AdminList tipo="eventos" />} />

                        <Route path="usuarios" element={<UsuariosAdmin />} />
                        <Route path="usuarios/listar" element={<UsuariosList />} />
                    </Route>

                    {/* ── PÁGINA 404 ──
                        Se muestra cuando el usuario visita una URL que no existe.
                        Estilos en: global.css → .not-found
                    */}
                    <Route path="*" element={
                        <div className="not-found">
                            <div className="not-found-emoji">🎭</div>
                            <h1>
                                Página no encontrada
                            </h1>
                            <p>
                                Parece que esta calle no lleva al carnaval.
                            </p>
                            <a href="/" className="btn btn-primary">← Volver al inicio</a>
                        </div>
                    } />

                </Routes>
            </Suspense>

            {/* Footer: solo se muestra si NO estamos en login/password */}
            {!isLogin && <Footer />}

            {/* Widget de accesibilidad: siempre visible, botón flotante abajo-derecha */}
            <AccessibilityWidget />

            {/* Botón "volver arriba": aparece al hacer scroll hacia abajo */}
            <ScrollToTop />
        </>
    )
}

/*
 * ── App (Componente Raíz) ──
 * BrowserRouter: habilita la navegación por URL (react-router)
 * AuthProvider: da acceso al estado de login/logout a toda la app
 * Layout: la estructura visual (navbar + contenido + footer)
 */
export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Layout />
            </AuthProvider>
        </BrowserRouter>
    )
}