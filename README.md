# Proyecto Final: Aplicación Móvil Full-Stack (Ionic / .NET 8)

Aplicación móvil full-stack organizada como monorepo. Incluye registro e inicio de sesión, una vista de perfil y selección de una foto mediante Capacitor Camera. Es un proyecto académico/de demostración y no implementa autenticación segura para producción.

## 🛠️ Stack Tecnológico

### Frontend (Cliente Móvil / Web)

- **Framework:** Ionic v9 con Angular y componentes *Standalone*.
- **Lenguaje:** TypeScript.
- **Cámara:** `@capacitor/camera` y `@ionic/pwa-elements`; la foto se muestra temporalmente en el cliente y no se envía al servidor.
- **Gestor de paquetes:** `pnpm`.

### Backend (API REST)

- **Framework:** ASP.NET Core Web API sobre .NET 8.
- **Persistencia:** Entity Framework Core con SQLite local.
- **Arquitectura actual:** controlador y entidad de usuario. La base de datos se crea con `EnsureCreated()`; el proyecto no contiene una capa de servicios, DTOs ni migraciones de Entity Framework.

> **Importante:** las contraseñas se guardan como texto plano, y el inicio de sesión no emite un token. No uses este proyecto con cuentas o datos reales.

---

## 📁 Estructura del Monorepo

```text
.
├── backend/
│   └── BackendApi/       # API REST en C# .NET 8 (SQLite + EF Core)
├── frontend/
│   └── src/              # Aplicación Ionic / Angular Standalone
├── README.md
├── DOCUMENTACION.md
└── .gitignore            # Exclusiones de compilación y dependencias
```

---

## 🚀 Guía de Configuración y Ejecución Local

### Prerrequisitos

- .NET 8 SDK.
- Node.js y `pnpm`.

### 1. Ejecutar el Backend (API REST)

```bash
cd backend/BackendApi
dotnet run -- --urls http://localhost:5028
```

La API estará disponible en `http://localhost:5028`. En desarrollo, Swagger está disponible en `http://localhost:5028/swagger`. Al iniciar, se crea `app.db` si aún no existe.

### 2. Ejecutar el Frontend (Ionic)

```bash
cd frontend
pnpm install
pnpm start
```

Abre `http://localhost:4200`. El cliente está configurado para conectarse a la API en `http://localhost:5028`.

---

## 🔒 Endpoints Principales del Backend

- `POST /api/Auth/register`: registra un usuario; devuelve `400 Bad Request` si el correo ya existe.
- `POST /api/Auth/login`: valida las credenciales; devuelve `401 Unauthorized` si no coinciden. En caso de éxito, responde con el nombre de usuario y el correo; no crea una sesión ni emite un token.

**Nota de seguridad:** actualmente, las contraseñas se almacenan y comparan como texto plano. Esta implementación es solo para demostración.
