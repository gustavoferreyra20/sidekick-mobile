# Sidekick Mobile App 📱

Aplicación móvil en React Native diseñada para conectar jugadores, facilitar la formación de equipos y mejorar la experiencia de juego.

## 🚀 Funcionalidades principales

- **Autenticación**: Inicio de sesión seguro, registro y recuperación de contraseña.
- **Navegación**: Menú lateral para acceder fácilmente a las distintas secciones de la app.
- **Gestión de Publicaciones**: Crear, buscar y visualizar publicaciones de juegos para encontrar compañeros.
- **Gestión de Solicitudes**: Enviar y recibir solicitudes para unirse a sesiones de juego.
- **Gestión de Perfil**: Configurar perfiles de usuario, actualizar contraseñas y administrar la configuración de la cuenta.
- **Sistema de Recompensas**: Obtener y canjear recompensas a través de la tienda integrada.
- **Notificaciones Push**: Mantenerse al día con notificaciones dentro de la aplicación.
- **Búsqueda de Juegos**: Buscar juegos y consultar información de plataformas.

## 🛠️ Stack Tecnológico

- **Frontend**:
    - **React Native**: Framework principal para construir aplicaciones móviles multiplataforma.
    - **React**: Librería de JavaScript para crear interfaces de usuario.
    - **React Navigation**: Manejo de la navegación dentro de la app.
    - **Expo**: Framework y plataforma para el desarrollo de aplicaciones universales en React.
    - **NativeBase**: Librería de componentes UI para React Native.
    - **Async Storage**: Persistencia de datos de forma local.
    - **React Native Vector Icons**: Íconos vectoriales escalables.
    - **React Native Safe Area Context**: Manejo de las áreas seguras en pantalla.
    - **React Native Picker**: Componente para crear menús desplegables.

## 💻 Estructura del Proyecto

```
├── android/ # Archivos específicos de Android
├── ios/ # Archivos específicos de iOS
├── App.js # Punto de entrada principal de la aplicación
├── assets/ # Recursos estáticos (imágenes, fuentes, etc.)
│ └── scripts/ # Estilos y scripts
├── components/ # Componentes de React
│ ├── applications/ # Componentes de la pantalla de solicitudes
│ ├── auth/ # Servicio de autenticación
│ ├── config/ # Componentes de configuración
│ ├── forgotPassword/ # Componentes de recuperación de contraseña
│ ├── games/ # Componentes de la pantalla de juegos
│ ├── home/ # Componentes de la pantalla principal
│ ├── login/ # Componentes de inicio de sesión
│ ├── newPost/ # Componentes para crear nuevas publicaciones
│ ├── notifications/ # Componentes de notificaciones
│ ├── popups/ # Servicio de pop-ups
│ ├── postSearchForm/ # Componentes del formulario de búsqueda de posts
│ ├── posts/ # Componentes de publicaciones
│ ├── profile/ # Componentes de perfil
│ ├── rate/ # Componentes de calificación
│ ├── registration/ # Componentes de registro
│ ├── reward/ # Componentes de recompensas
│ ├── reviews/ # Componentes de reseñas
│ └── store/ # Componentes de la tienda
├── middleware/ # Configuración de la instancia de Axios
├── navigators/ # Componentes de navegación
├── .gitignore # Archivos ignorados por Git
├── app.json # Archivo de configuración de Expo
├── package.json # Dependencias y scripts del proyecto
└── README.md # Documentación del proyecto
```

## 📌 Requisitos Previos

- **Node.js (>=16)**
- **npm o yarn**
- **Expo CLI** (instalar con: `npm install -g expo-cli`)

## 📦 Instalación y Ejecución

1. **Instalar dependencias**

```bash
npm install
```

2. **Iniciar el servidor de desarrollo**

```bash
npm start
```

3. **Visualizar la aplicación**

En un dispositivo físico:

- Instalar la app **Expo Go**.
- Escanear el código QR generado.

Una vez escaneado o abierto el emulador, la aplicación se cargará automáticamente.