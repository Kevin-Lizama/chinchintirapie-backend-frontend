# 🎭 Chinchintirapie — Portal Escuela Carnavalera

> Portal web oficial de la Escuela Carnavalera Chinchintirapie, con más de 20 años de historia celebrando el carnaval chileno. Incluye gestión de contenidos, repositorio documental (CEDOC), talleres, multimedia y más.

---

## 👥 Equipo

| Rol | Nombre |
|-----|--------|
| 🧭 Product Owner | Kevin Lizama |
| 🔄 Scrum Master | Brandon Inostroza |
| 🎨 UX/UI · Dev Team | Natasha Cruz |
| 💻 Dev Team | Matías Celis |
| 💻 Dev Team | Camila Baldebenito |
| 💻 Dev Team | Valentina Llantén |

---

## 🛠 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + Vite 8 + React Router v7 |
| Backend | Spring Boot 3.3.6 + Java 21 |
| Base de datos | PostgreSQL (Neon — serverless) |
| Almacenamiento | Cloudflare R2 (imágenes, PDFs, videos) |
| Deploy frontend | Vercel |
| Deploy backend | Render |
| CI/CD | GitHub Actions |

---

## 📁 Estructura del Proyecto

```
chinchintirapie/
├── frontend/                  # React + Vite
│   ├── src/
│   │   ├── pages/             # Vistas principales
│   │   ├── components/        # Componentes reutilizables
│   │   ├── services/          # Llamadas a la API (apiFetch)
│   │   ├── context/           # AuthContext global
│   │   └── assets/            # Fuentes, imágenes estáticas
│   ├── public/
│   ├── vercel.json            # Rewrites SPA + proxy API
│   └── package.json
│
└── backend/                   # Spring Boot
    └── src/main/java/
        └── com/chinchintirapie/
            ├── articulos/     # Controller · Service · Repository · DTO · Mapper
            ├── multimedia/
            ├── contacto/
            ├── usuarios/
            ├── storage/
            └── auth/
```

---

## ⚙️ Variables de Entorno

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:8080
```

### Backend (`backend/src/main/resources/application.properties`)

```properties
# Base de datos
spring.datasource.url=jdbc:postgresql://<host_neon>/<db>?sslmode=require
spring.datasource.username=<usuario>
spring.datasource.password=<contraseña>

# JWT
jwt.secret=<tu_clave_secreta>
jwt.expiration=86400000

# Cloudflare R2
r2.access-key=<access_key>
r2.secret-key=<secret_key>
r2.bucket=<nombre_bucket>
r2.endpoint=https://<account_id>.r2.cloudflarestorage.com
```

> ⚠️ Nunca subas estos archivos al repositorio. Están incluidos en `.gitignore`.

---

## 🚀 Cómo correr el proyecto en local

### Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v18 o superior
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- [Java 21](https://adoptium.net/)
- [Maven](https://maven.apache.org/) 3.9+
- Acceso a una base de datos PostgreSQL (o cuenta en [Neon](https://neon.tech))

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-org/chinchintirapie.git
cd chinchintirapie
```

---

### 2. Correr el Backend

```bash
cd backend
```

Crea el archivo `src/main/resources/application.properties` con tus variables (ver sección anterior).

```bash
# Compilar y correr
mvn spring-boot:run
```

El backend quedará corriendo en `http://localhost:8080`.

Para verificar que está funcionando:

```bash
curl http://localhost:8080/api/health
```

---

### 3. Correr el Frontend

```bash
cd frontend
```

Crea el archivo `.env` con:

```env
VITE_API_URL=http://localhost:8080
```

Luego instala dependencias y levanta el servidor de desarrollo:

```bash
pnpm install
pnpm dev
```

El frontend quedará disponible en `http://localhost:5173`.

---

### 4. Acceso a la aplicación

| URL | Descripción |
|-----|-------------|
| `http://localhost:5173` | Aplicación frontend |
| `http://localhost:8080/api` | API REST backend |
| `http://localhost:8080/swagger-ui.html` | Documentación API (si está habilitado) |

---

## 🧪 Tests

### Backend

```bash
cd backend
mvn test
```

### Frontend

```bash
cd frontend
pnpm test
```

Los tests también se ejecutan automáticamente en cada push a `main` mediante GitHub Actions.

---

## 🌐 Deploy

El proyecto usa CI/CD con GitHub Actions.

- Cada push a `main` ejecuta los tests.
- Si los tests pasan, el frontend se despliega automáticamente en **Vercel**.
- El backend se despliega automáticamente en **Render** vía deploy hook.

---

## 📄 Licencia

Proyecto académico desarrollado para la Escuela Carnavalera Chinchintirapie. Todos los derechos reservados © 2026.
