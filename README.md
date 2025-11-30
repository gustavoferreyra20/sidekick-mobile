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
├── android/                        # Archivos nativos de Android
├── ios/                            # Archivos nativos de iOS
├── App.js                          # Punto de entrada principal de la app
│
├── assets/                         # Recursos estáticos
│   ├── img/                        # Iconos e imágenes
│   └── scripts/                    # Estilos globales y utilidades
│
├── components/                     # Componentes UI reutilizables
│   ├── applications/               # Componentes visuales usados en Solicitudes
│   ├── notifications/              # Componentes UI de notificaciones
│   ├── popups/                     # Popups y modales reutilizables
│   ├── posts/                      # Componentes UI para posts
│   ├── reviews/                    # Componentes UI de reseñas
│   └── reward/                     # Componentes UI de recompensas
│
├── controllers/                    # Lógica de negocio por feature
│   ├── applications/
│   ├── auth/
│   ├── config/
│   ├── games/
│   ├── home/
│   ├── notifications/
│   ├── posts/
│   ├── profile/
│   ├── rate/
│   └── store/
│
├── middleware/                     # Configuración de Axios / interceptores
│
├── navigators/                     # Navegadores personalizados
│   ├── DrawerContentView.js
│   └── DrawerCustomNavigator.js
│
├── screens/                        # Pantallas del sistema
│   ├── applications/
│   ├── auth/
│   ├── config/
│   ├── games/
│   ├── home/
│   ├── notifications/
│   ├── posts/
│   ├── profile/
│   ├── rate/
│   └── store/
│
├── services/                       # Servicios (API calls)
│   ├── AuthService.js
│   ├── ContactInfService.js
│   ├── GameService.js
│   ├── ModeService.js
│   ├── NotificationService.js
│   ├── NotificationStateService.js
│   ├── PaymentService.js
│   ├── PlatformService.js
│   ├── PopupService.js
│   ├── PostService.js
│   ├── ReviewService.js
│   ├── RewardService.js
│   └── UserService.js
│
├── .gitignore
├── app.json
├── package.json
└── README.md
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