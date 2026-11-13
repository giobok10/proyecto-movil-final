# Documentación Técnica del Proyecto Móvil

## 1. Introducción y Objetivos

Este proyecto implementa una aplicación full-stack para practicar desarrollo móvil y web con Ionic, Angular y ASP.NET Core. Incluye registro e inicio de sesión, una vista de perfil y selección de una imagen. En el frontend se usan componentes *Standalone* y rutas con carga diferida. Esta documentación describe el comportamiento implementado y sus limitaciones actuales.

## 2. Arquitectura del Backend (.NET 8)

El backend está construido con **ASP.NET Core Web API** y utiliza **Entity Framework Core** con **SQLite**.

- **Modelo de datos (`User.cs`):** define las propiedades `Id`, `Username`, `Email` y `Password`.
- **Base de datos:** `AppDbContext` expone la entidad `User`. Durante el inicio, `Program.cs` llama a `EnsureCreated()` para crear el archivo y el esquema si aún no existen. El proyecto no configura migraciones de Entity Framework.
- **Controlador de autenticación (`AuthController.cs`):** expone `POST /api/Auth/register` y `POST /api/Auth/login`. El registro devuelve `400 Bad Request` si el correo ya existe; el inicio de sesión devuelve `401 Unauthorized` si las credenciales no coinciden. Ambos endpoints responden `200 OK` si la operación tiene éxito.
- **Persistencia de contraseñas:** la contraseña se almacena y compara como texto plano; no se cifra ni se aplica un hash.

## 3. Arquitectura del Frontend (Ionic / Angular)

El frontend usa Ionic v9 con Angular y componentes independientes (*Standalone*).

- **Enrutamiento y configuración:** `main.ts` registra `provideHttpClient()`. `app.routes.ts` configura las páginas de inicio de sesión, registro y perfil usando `loadComponent`.
- **Comunicación con la API:** `AuthService` realiza solicitudes HTTP a `http://localhost:5028/api/Auth`.
- **Cámara (`@capacitor/camera`):** la página de perfil solicita una fuente mediante `CameraSource.Prompt` y recibe el resultado como `DataUrl`. El cliente lo presenta en la vista con `DomSanitizer`; la imagen no se envía a la API ni se persiste al recargar la vista.
- **Datos del perfil:** después del inicio de sesión, el cliente guarda el nombre de usuario y el correo en `localStorage`; al cerrar sesión, limpia ese almacenamiento. Esto no constituye una sesión autenticada ni sustituye un token.

## 4. Consideraciones para ejecución y seguridad

- La API está configurada para permitir cualquier origen mediante CORS. Esta política debe limitarse antes de exponer la API fuera del entorno local.
- La URL de la API está definida directamente en el servicio del frontend. En un dispositivo físico, `localhost` apunta al propio dispositivo y debe reemplazarse por una dirección accesible desde él.
- `EnsureCreated()` crea el esquema inicial, pero no actualiza esquemas ya existentes como lo harían migraciones.
- Por el almacenamiento de contraseñas en texto plano y la ausencia de autenticación basada en tokens, este proyecto debe tratarse como una demostración y no usarse en producción.
