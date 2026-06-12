<div align="center">

# 🎯 ChinchinTirapie — Plataforma Web

**Monorepo full-stack: Spring Boot 3 + React 19 + Vite 8**

[![Backend CI](https://github.com/Kevin-Lizama/chinchintirapie-backend-frontend/actions/workflows/backend-tests.yml/badge.svg)](https://github.com/Kevin-Lizama/chinchintirapie-backend-frontend/actions/workflows/backend-tests.yml)
[![Deploy](https://github.com/Kevin-Lizama/chinchintirapie-backend-frontend/actions/workflows/deploy-render.yml/badge.svg)](https://github.com/Kevin-Lizama/chinchintirapie-backend-frontend/actions/workflows/deploy-render.yml)

</div>

---

## 📑 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Configuración del Entorno](#-configuración-del-entorno)
- [Instalación y Ejecución Local](#-instalación-y-ejecución-local)
- [Docker](#-docker)
- [Estructura de Carpetas](#-estructura-de-carpetas)
- [Convenciones de Código](#-convenciones-de-código)
- [Convenciones de Git](#-convenciones-de-git)
- [CI/CD](#-cicd)
- [Manejo de Variables de Entorno](#-manejo-de-variables-de-entorno)
- [API REST — Convenciones](#-api-rest--convenciones)
- [Testing](#-testing)
- [Seguridad](#-seguridad)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 📝 Descripción del Proyecto

**ChinchinTirapie** es una plataforma web dedicada a la difusión cultural del Chinchintirapie. Incluye gestión de noticias, crónicas, material educativo, repositorio multimedia, centro documental (CEDOC), tienda virtual y panel de administración.

---

## 🛠 Stack Tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| **Frontend** | React + Vite | 19.x / 8.x |
| **Routing** | React Router DOM | 7.x |
| **Estilos** | CSS Vanilla (por módulo) | — |
| **Autenticación FE** | @react-oauth/google | 0.13.x |
| **Backend** | Spring Boot | 3.3.6 |
| **Lenguaje** | Java | 21 |
| **Build Tool** | Maven Wrapper | — |
| **Base de Datos** | PostgreSQL (Neon) | — |
| **ORM** | Spring Data JPA / Hibernate | — |
| **Seguridad** | Spring Security + JWT | jjwt 0.11.5 |
| **OAuth** | Google API Client | 2.2.0 |
| **Almacenamiento** | Cloudflare R2 (AWS S3 SDK) | 2.21.29 |
| **Email** | SendGrid (SMTP) | — |
| **Utilidades** | Lombok | 1.18.34 |
| **Testing** | JUnit 5 + Mockito + H2 | — |
| **Cobertura** | JaCoCo | 0.8.11 |
| **Linting FE** | ESLint + react-hooks + react-refresh | 10.x |
| **Contenedores** | Docker + Docker Compose | — |
| **CI/CD** | GitHub Actions | — |
| **Deploy Backend** | Render | — |
| **Deploy Frontend** | Vercel | — |

---

## 🏗 Arquitectura del Proyecto

```
┌──────────────────────────────────────────────────────────────┐
│                      MONOREPO ROOT                           │
├──────────────────────┬───────────────────────────────────────┤
│     Frontend/        │             backend/                  │
│   (React + Vite)     │        (Spring Boot 3)                │
│                      │                                       │
│  ┌───────────────┐   │   ┌──────────────────────────────┐    │
│  │  pages/       │   │   │  articulo/                   │    │
│  │  components/  │   │   │  auth/                       │    │
│  │  services/ ───┼───┼──▶│  contacto/                   │    │
│  │  context/     │   │   │  multimedia/                  │    │
│  │  hooks/       │   │   │  user/                        │    │
│  │  styles/      │   │   │  storage/                     │    │
│  │  utils/       │   │   │  security/                    │    │
│  │  data/        │   │   │  health/                      │    │
│  └───────────────┘   │   └───────────┬──────────────────┘    │
│                      │               │                       │
│                      │   ┌───────────▼──────────────────┐    │
│                      │   │    PostgreSQL (Neon)          │    │
│                      │   │    Cloudflare R2              │    │
│                      │   │    SendGrid                   │    │
│                      │   └──────────────────────────────┘    │
└──────────────────────┴───────────────────────────────────────┘
```

Cada módulo del backend sigue la arquitectura **MVC por capas**:

```
modulo/
├── controller/     → Endpoints REST
├── dto/            → Data Transfer Objects (Request/Response)
├── mapper/         → Conversión Entity ↔ DTO
├── model/          → Entidades JPA
├── repository/     → Interfaces JPA Repository
└── service/        → Lógica de negocio
```

---

## ✅ Requisitos Previos

| Herramienta | Versión mínima |
|---|---|
| **Java JDK** | 21 |
| **Node.js** | 18+ |
| **npm** o **pnpm** | 9+ / 8+ |
| **Docker** *(opcional)* | 24+ |
| **Docker Compose** *(opcional)* | 2.x |
| **Git** | 2.40+ |

---

## ⚙ Configuración del Entorno

Crea un archivo **`.env`** en la raíz del proyecto con las siguientes variables:

```env
# ─── Base de Datos (PostgreSQL) ───
DB_URL=jdbc:postgresql://<host>/<database>?sslmode=require
DB_USERNAME=<usuario>
DB_PASSWORD=<contraseña>

# ─── JWT ───
JWT_SECRET=<clave_base64_codificada>
JWT_EXPIRATION=3600000

# ─── Cloudflare R2 (Almacenamiento) ───
R2_ACCESS_KEY=<access_key>
R2_SECRET_KEY=<secret_key>
R2_ACCOUNT_ID=<account_id>
R2_BUCKET_NAME=<bucket_name>
R2_PUBLIC_URL=<public_url>

# ─── Email (SendGrid) ───
MAIL_FROM=<email_remitente>
SENDGRID_API_KEY=<api_key>

# ─── Google OAuth ───
GOOGLE_CLIENT_ID=<client_id>

# ─── URLs ───
FRONTEND_URL=http://localhost:5173
```

> [!CAUTION]
> **Nunca** subas el archivo `.env` al repositorio. Ya está incluido en `.gitignore`.

---

## 🚀 Instalación y Ejecución Local

### Backend (Spring Boot)

```bash
# Desde la raíz del proyecto
cd backend

# Dar permisos al wrapper (Linux/Mac)
chmod +x mvnw

# Ejecutar en modo desarrollo
./mvnw spring-boot:run

# En Windows
mvnw.cmd spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### Frontend (React + Vite)

```bash
cd Frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

> [!TIP]
> El Vite dev server tiene configurado un **proxy** hacia `http://localhost:8080` para todas las rutas `/api/*`, por lo que no necesitas configurar CORS en desarrollo.

---

## 🐳 Docker

### Levantar todo el stack con Docker Compose

```bash
# Desde la raíz del proyecto
docker-compose up --build
```

| Servicio | Puerto |
|---|---|
| Backend | `8080` (configurable con `BACKEND_PORT`) |
| Frontend (Nginx) | `80` (configurable con `FRONTEND_PORT`) |

### Comandos útiles

```bash
# Levantar en segundo plano
docker-compose up -d --build

# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Detener
docker-compose down

# Reconstruir un servicio específico
docker-compose build backend
```

---

## 📂 Estructura de Carpetas

```
chinchintirapie-backend-frontend/
│
├── .github/
│   └── workflows/
│       ├── backend-tests.yml        # CI: Tests del backend
│       └── deploy-render.yml        # CD: Deploy automático a Render
│
├── backend/                         # 🟢 API REST — Spring Boot 3
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/bootcamp/chinchintirapie/
│   │   │   │   ├── BackendApplication.java
│   │   │   │   ├── articulo/        # Módulo Artículos (CRUD)
│   │   │   │   ├── auth/            # Autenticación (Login, Register, OAuth)
│   │   │   │   ├── contacto/        # Formulario de contacto
│   │   │   │   ├── health/          # Health check endpoint
│   │   │   │   ├── multimedia/      # Gestión multimedia
│   │   │   │   ├── security/        # Configuración Spring Security + JWT
│   │   │   │   ├── storage/         # Integración Cloudflare R2
│   │   │   │   └── user/            # Gestión de usuarios
│   │   │   └── resources/
│   │   │       ├── application.yaml
│   │   │       └── application-dev.yml
│   │   └── test/                    # Tests unitarios e integración
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   └── Dockerfile
│
├── Frontend/                        # 🔵 SPA — React 19 + Vite 8
│   ├── src/
│   │   ├── App.jsx                  # Router principal
│   │   ├── main.jsx                 # Entry point
│   │   ├── components/              # Componentes reutilizables
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── AccessibilityWidget.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── ...
│   │   ├── pages/                   # Vistas/Páginas
│   │   │   ├── Home.jsx
│   │   │   ├── Noticias.jsx
│   │   │   ├── Cronicas.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Admin/               # Panel de administración
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   └── ...Admin.jsx / ...List.jsx
│   │   │   └── ...
│   │   ├── services/                # Llamadas a la API
│   │   │   ├── apiConfig.js
│   │   │   ├── apiFetch.js
│   │   │   ├── authService.js
│   │   │   └── ...
│   │   ├── context/                 # React Context (estado global)
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/                   # Custom hooks
│   │   │   └── useReveal.js
│   │   ├── styles/                  # CSS por componente/página
│   │   │   ├── global.css
│   │   │   └── [Componente].css
│   │   ├── data/                    # Datos estáticos
│   │   └── utils/                   # Funciones auxiliares
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── vercel.json
│   ├── nginx.conf
│   ├── package.json
│   └── Dockerfile
│
├── .env                             # Variables de entorno (NO commitear)
├── .gitignore
├── .dockerignore
├── docker-compose.yml
├── Dockerfile                       # Multi-stage build del backend
└── README.md
```

---

## 📏 Convenciones de Código

### 🟢 Backend (Java / Spring Boot)

#### Nomenclatura

| Elemento | Convención | Ejemplo |
|---|---|---|
| Clases | `PascalCase` | `ArticuloService`, `UserController` |
| Métodos | `camelCase` | `findById()`, `createArticulo()` |
| Variables | `camelCase` | `userName`, `isActive` |
| Constantes | `UPPER_SNAKE_CASE` | `MAX_FILE_SIZE`, `JWT_EXPIRATION` |
| Paquetes | `lowercase` | `com.bootcamp.chinchintirapie.articulo` |
| Tablas BD | `snake_case` | `material_educativo` |

#### Organización por Módulo

Cada dominio de negocio se organiza en su propio paquete con subcarpetas:

```
modulo/
├── controller/     → Solo recibe requests y delega al service
├── dto/            → Objetos de transferencia (nunca exponer entidades)
├── mapper/         → Conversiones Entity ↔ DTO (sin lógica de negocio)
├── model/          → Entidades JPA con anotaciones
├── repository/     → Interfaces que extienden JpaRepository
└── service/        → Toda la lógica de negocio aquí
```

#### Reglas del Backend

1. **Nunca exponer entidades JPA directamente** — Usar siempre DTOs.
2. **Inyección por constructor** — No usar `@Autowired` en campos. Usar `@RequiredArgsConstructor` de Lombok.
3. **Validaciones en DTOs** — Usar anotaciones `@Valid`, `@NotBlank`, `@Size`, etc.
4. **Manejo de excepciones** — Usar `@ControllerAdvice` para manejar errores globalmente.
5. **Transacciones** — Anotar servicios con `@Transactional` donde corresponda.
6. **Logging** — Usar `@Slf4j` de Lombok en vez de `System.out.println`.
7. **Lombok** — Preferir `@Data`, `@Builder`, `@RequiredArgsConstructor` para reducir boilerplate.

```java
// ✅ Correcto
@Service
@RequiredArgsConstructor
@Slf4j
public class ArticuloService {
    private final ArticuloRepository articuloRepository;
    private final ArticuloMapper articuloMapper;

    public ArticuloResponseDTO findById(Long id) {
        Articulo articulo = articuloRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Artículo no encontrado"));
        return articuloMapper.toDTO(articulo);
    }
}

// ❌ Incorrecto
@Service
public class ArticuloService {
    @Autowired
    private ArticuloRepository repo; // No usar @Autowired en campos

    public Articulo findById(Long id) { // No retornar entidad directamente
        return repo.findById(id).get(); // No usar .get() sin manejar Optional
    }
}
```

---

### 🔵 Frontend (React / JavaScript)

#### Nomenclatura

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes | `PascalCase.jsx` | `Navbar.jsx`, `AdminDashboard.jsx` |
| Hooks | `camelCase` con prefijo `use` | `useReveal.js`, `useAuth.js` |
| Services | `camelCase` con sufijo `Service` | `authService.js`, `articuloService.js` |
| Utilidades | `camelCase` | `passwordStrength.js` |
| Estilos | `PascalCase.css` (match con componente) | `Home.css`, `Navbar.css` |
| Variables/Funciones | `camelCase` | `handleSubmit`, `isLoading` |
| Constantes | `UPPER_SNAKE_CASE` | `API_BASE_URL` |

#### Estructura de Componentes

```
src/
├── components/     → Componentes reutilizables (Navbar, Footer, Cards...)
├── pages/          → Vistas completas vinculadas a rutas
│   └── Admin/      → Sub-páginas del panel admin
├── services/       → Funciones para llamadas HTTP a la API
├── context/        → Providers de React Context
├── hooks/          → Custom hooks reutilizables
├── styles/         → Un archivo CSS por cada componente/página
├── data/           → Datos estáticos y constantes
└── utils/          → Funciones auxiliares puras
```

#### Reglas del Frontend

1. **Un componente por archivo** — Exportar con `export default`.
2. **CSS modular** — Cada componente/página tiene su propio archivo `.css` en `styles/`.
3. **Servicios centralizados** — Todas las llamadas HTTP pasan por `apiFetch.js`.
4. **Estado global con Context** — Usar `AuthContext` para autenticación; para estados locales, usar `useState`/`useReducer`.
5. **No hardcodear URLs** — Usar `apiConfig.js` para configurar la base URL.
6. **Componentes funcionales** — No usar componentes de clase.
7. **Destructuring** — Destructurar props y estados siempre.

```jsx
// ✅ Correcto
import { useState, useEffect } from 'react';
import { fetchArticulos } from '../services/articuloService';
import '../styles/Noticias.css';

export default function Noticias() {
  const [articulos, setArticulos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticulos()
      .then(setArticulos)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Cargando...</p>;

  return (
    <section className="noticias-container">
      {articulos.map(({ id, titulo }) => (
        <article key={id}>{titulo}</article>
      ))}
    </section>
  );
}

// ❌ Incorrecto
export default function Noticias() {
  const [data, setData] = useState(null); // Nombre genérico

  useEffect(() => {
    fetch('http://localhost:8080/api/articulos') // URL hardcodeada
      .then(r => r.json())
      .then(d => setData(d));
  });  // Sin array de dependencias = loop infinito

  return <div>{data && data.map(item => <div>{item.titulo}</div>)}</div>; // Sin key
}
```

---

### 🎨 Estilos (CSS)

1. **Un archivo `.css` por componente/página** — Nombrado igual al componente.
2. **Estilos globales** en `global.css` — Variables CSS, resets, tipografía base.
3. **Clases descriptivas con kebab-case** — Ej: `noticias-container`, `hero-section`.
4. **No usar estilos inline** a menos que sean dinámicos.
5. **Variables CSS** para colores, espaciado y tipografía recurrente.
6. **Mobile-first** — Diseñar primero para móvil, luego adaptar con `@media`.

```css
/* ✅ Correcto — styles/Home.css */
.hero-section {
  display: flex;
  align-items: center;
  padding: var(--spacing-lg);
  background: var(--color-primary);
}

/* ❌ Incorrecto */
.div1 {
  display: flex;
  align-items: center;
  padding: 24px; /* Valor mágico */
  background: #3a7d44; /* Color sin variable */
}
```

---

## 🔀 Convenciones de Git

### Estructura de Ramas

| Rama | Propósito |
|---|---|
| `main` | Rama de producción (protegida). Solo recibe merges via PR. |
| `develop` | Rama de desarrollo e integración. |
| `feature/<nombre>` | Nuevas funcionalidades. Se crea desde `develop`. |
| `bugfix/<nombre>` | Corrección de bugs. |
| `hotfix/<nombre>` | Fix urgente en producción. Se crea desde `main`. |

### Convención de Commits (Conventional Commits)

```
<tipo>(<alcance>): <descripción breve>

[cuerpo opcional]
[footer opcional]
```

#### Tipos de Commit

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambios en documentación |
| `style` | Formato, punto y coma, espacios (sin cambio de lógica) |
| `refactor` | Refactorización sin cambio de funcionalidad |
| `test` | Agregar o corregir tests |
| `chore` | Tareas de mantenimiento (deps, config, CI) |
| `perf` | Mejora de rendimiento |
| `ci` | Cambios en archivos de CI/CD |

#### Ejemplos

```bash
feat(auth): agregar login con Google OAuth
fix(articulo): corregir paginación en listado de noticias
docs(readme): agregar guía de instalación local
style(navbar): ajustar espaciado en menú mobile
refactor(services): extraer lógica de fetch a apiFetch.js
test(user): agregar tests unitarios para UserService
chore(deps): actualizar Spring Boot a 3.3.6
ci(actions): agregar cache de Maven en workflow
```

### Flujo de Trabajo con Pull Requests

1. Crear rama desde `develop`: `git checkout -b feature/mi-feature develop`
2. Hacer commits atómicos y descriptivos.
3. Push y crear **Pull Request** hacia `develop`.
4. La PR debe:
   - Tener título descriptivo siguiendo Conventional Commits.
   - Incluir descripción de los cambios.
   - Pasar todos los checks de CI.
   - Tener al menos 1 review aprobado.
5. Hacer **Squash Merge** para mantener historial limpio.

---

## 🔄 CI/CD

### GitHub Actions — Workflows

#### 1. `backend-tests.yml` — Tests Automáticos

- **Trigger**: Push o PR a `main`.
- **Job**: Ejecuta `mvnw test` con Java 21 y perfil `test`.
- **Cache**: Repositorio local de Maven (`.m2/repository`).

#### 2. `deploy-render.yml` — Deploy Automático

- **Trigger**: Push a `main`.
- **Job**: Dispara deploy hook de Render vía `curl`.
- **Secret necesario**: `RENDER_BACKEND_DEPLOY_HOOK_URL`.

### Pipeline Ideal

```
Push a feature/* ──▶ PR a develop ──▶ Tests CI ──▶ Review
                                                     │
                    PR a main ◀──────────────────────┘
                        │
                  Tests CI + Deploy automático a Render
```

---

## 🔐 Manejo de Variables de Entorno

### Reglas

1. **Nunca** commitear archivos `.env` con credenciales reales.
2. Documentar **todas** las variables necesarias en este README (sin valores reales).
3. Usar **valores por defecto** en `docker-compose.yml` y `application-dev.yml` para facilitar el desarrollo.
4. Los **secrets de producción** se configuran en:
   - **Render**: Dashboard → Environment Variables.
   - **Vercel**: Settings → Environment Variables.
   - **GitHub Actions**: Settings → Secrets and Variables → Actions.

### Archivo `.env.example`

> [!IMPORTANT]
> Se recomienda crear un archivo `.env.example` con las variables sin valores sensibles y commitearlo al repositorio como referencia para nuevos colaboradores.

---

## 🌐 API REST — Convenciones

### Formato de Endpoints

```
/api/{recurso}                          → GET (listar), POST (crear)
/api/{recurso}/{id}                     → GET (detalle), PUT (actualizar), DELETE (eliminar)
/api/{recurso}/{id}/{sub-recurso}       → Recursos anidados
```

### Respuestas HTTP

| Código | Uso |
|---|---|
| `200 OK` | Operación exitosa |
| `201 Created` | Recurso creado correctamente |
| `204 No Content` | Eliminación exitosa |
| `400 Bad Request` | Error de validación |
| `401 Unauthorized` | No autenticado (JWT inválido o ausente) |
| `403 Forbidden` | Sin permisos suficientes |
| `404 Not Found` | Recurso no encontrado |
| `500 Internal Server Error` | Error del servidor |

### Formato de Errores

```json
{
  "timestamp": "2026-06-12T09:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "El campo 'titulo' es obligatorio",
  "path": "/api/articulos"
}
```

### Convenciones de la API

1. **Plural para recursos**: `/api/articulos`, no `/api/articulo`.
2. **Verbos HTTP, no en la URL**: `DELETE /api/articulos/5`, no `POST /api/articulos/eliminar/5`.
3. **Kebab-case para URLs**: `/api/material-educativo`, no `/api/materialEducativo`.
4. **Paginación**: Usar query params `?page=0&size=10&sort=createdAt,desc`.
5. **JSON** como formato de intercambio por defecto.
6. **DTOs diferentes para Request y Response** cuando sea necesario.

---

## 🧪 Testing

### Backend

```bash
# Ejecutar todos los tests
cd backend
./mvnw test

# Ejecutar tests con reporte de cobertura (JaCoCo)
./mvnw test jacoco:report

# Ver reporte de cobertura
# Abrir: backend/target/site/jacoco/index.html
```

#### Convenciones de Tests

| Aspecto | Convención |
|---|---|
| Nombre de clase | `[Clase]Test.java` — Ej: `ArticuloServiceTest.java` |
| Nombre de método | `should_[resultado]_when_[condición]` |
| Framework | JUnit 5 + Mockito |
| BD en tests | H2 en memoria (perfil `test`) |
| Cobertura mínima | Apuntar a ≥ 80% en la capa de servicio |

```java
@ExtendWith(MockitoExtension.class)
class ArticuloServiceTest {

    @Mock
    private ArticuloRepository articuloRepository;

    @InjectMocks
    private ArticuloService articuloService;

    @Test
    void should_returnArticulo_when_idExists() {
        // Arrange
        Articulo articulo = new Articulo();
        articulo.setId(1L);
        when(articuloRepository.findById(1L)).thenReturn(Optional.of(articulo));

        // Act
        ArticuloResponseDTO result = articuloService.findById(1L);

        // Assert
        assertNotNull(result);
        verify(articuloRepository).findById(1L);
    }

    @Test
    void should_throwException_when_idNotFound() {
        when(articuloRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class,
            () -> articuloService.findById(99L));
    }
}
```

### Frontend

```bash
cd Frontend

# Ejecutar linter
npm run lint
```

> [!NOTE]
> Se recomienda integrar **Vitest** + **React Testing Library** para tests unitarios del frontend en el futuro.

---

## 🛡 Seguridad

### Autenticación

- **JWT (JSON Web Tokens)**: Token firmado con clave secreta (HS256).
- **Google OAuth 2.0**: Login social como alternativa.
- El token se envía en el header `Authorization: Bearer <token>`.
- Expiración configurable via `JWT_EXPIRATION` (default: 1 hora).

### Buenas Prácticas Implementadas

1. **Nunca almacenar contraseñas en texto plano** — Usar BCrypt.
2. **Validar inputs** — Spring Validation en todos los DTOs.
3. **CORS configurado** — Solo permitir orígenes autorizados.
4. **Variables sensibles fuera del código** — Todo en variables de entorno.
5. **Dependencias actualizadas** — Revisar periódicamente por vulnerabilidades.
6. **Rate limiting** — Considerar implementar en endpoints críticos (login, registro).

### Headers de Seguridad Recomendados (Nginx)

```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

---

## 🚢 Despliegue

### Backend → Render

1. Push a `main` dispara automáticamente el deploy via GitHub Actions.
2. El workflow `deploy-render.yml` ejecuta el deploy hook configurado.
3. Las variables de entorno se configuran en el dashboard de Render.

### Frontend → Vercel

1. Conectar el repositorio en Vercel.
2. Configurar:
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Configurar `vercel.json` para SPA routing (ya incluido).

### Docker (Producción)

```bash
# Build y deploy con Docker Compose
docker-compose -f docker-compose.yml up -d --build
```

---

## 🤝 Contribuir

### Antes de empezar

1. Lee completamente este README.
2. Configura tu entorno local siguiendo las instrucciones.
3. Asegúrate de que los tests pasan antes de hacer push.

### Checklist para Pull Requests

- [ ] Mi código sigue las convenciones descritas en este README.
- [ ] He agregado tests para la nueva funcionalidad (backend).
- [ ] Los tests existentes pasan correctamente (`mvnw test`).
- [ ] El linter no reporta errores (`npm run lint`).
- [ ] He actualizado la documentación si fue necesario.
- [ ] El título del PR sigue el formato de Conventional Commits.
- [ ] No hay credenciales ni secrets en el código.

### Revisión de Código

- Todo cambio requiere al menos **1 aprobación** antes de merge.
- Se prioriza legibilidad y mantenibilidad sobre cleverness.
- Comentar el **porqué**, no el **qué** (el código debe hablar por sí mismo).

---

## 📄 Licencia

Este proyecto es de uso interno / privado. Todos los derechos reservados.

---

<div align="center">

**Hecho con ❤️ por el equipo ChinchinTirapie**

</div>
