# Classroom Inclusive

Una plataforma educativa inclusiva desarrollada con Next.js y Firebase que permite la gestión de cursos especializados en lenguaje de señas, braille y código morse.

## 🚀 Características

- **Autenticación de Usuarios**: Sistema de registro e inicio de sesión para profesores y estudiantes
- **Roles de Usuario**: Diferenciación entre profesores y estudiantes con diferentes permisos y vistas
- **Gestión de Cursos**: Creación, visualización y eliminación de cursos
- **Tipos de Cursos**: Soporte para cursos de:
  - Lenguaje de Señas
  - Braille
  - Código Morse
- **Almacenamiento de Archivos**: Integración con Firebase Storage para gestionar imágenes de cursos
- **Interfaz Moderna**: Diseño responsivo utilizando Ant Design

## 🛠️ Tecnologías

- **Frontend**: Next.js, React
- **UI Framework**: Ant Design
- **Backend**: Firebase
  - Authentication
  - Firestore
  - Storage
- **Estilos**: CSS Modules, Emotion

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno creando un archivo `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## 🌟 Características Principales

### Para Profesores

- Crear y gestionar cursos
- Subir materiales educativos
- Seguimiento de estudiantes

### Para Estudiantes

- Acceso a cursos
- Visualización de materiales
- Interfaz adaptada a sus necesidades

## 🔒 Seguridad

- Autenticación segura con Firebase
- Protección de rutas
- Validación de roles de usuario

## 🚀 Despliegue

La aplicación está configurada para ser desplegada en GitHub Pages utilizando GitHub Actions. El flujo de trabajo está definido en `.github/workflows/deploy.yml`.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## ✨ Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.
