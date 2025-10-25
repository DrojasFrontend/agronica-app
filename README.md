# 🌱 AGRONICA - Plataforma de Riego Inteligente

Dashboard web para monitoreo y control de sistemas de riego inteligente en agricultura de precisión.

![AGRONICA](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple?style=flat-square&logo=bootstrap)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🎨 Lineamientos de Diseño

### Colores
- **Encabezado**: Gris suave (#E8EBED)
- **Fondo general**: Gris nube (#F5F7F8)
- **Texto principal**: Azul oscuro (#1C2E3E)
- **Botones principales**: Verde agrónico (#39B54A)
- **Color de alerta**: Amarillo campo (#FFC107)
- **Bordes y divisiones**: Gris tenue (#E0E0E0)

### Tipografía
- **Títulos y encabezados** (Montserrat Bold - 700):
  - Logo y título principal
  - Encabezados de campo
  - Títulos principales de sección

- **Subtítulos y secciones** (Montserrat SemiBold - 600):
  - Encabezados de tarjetas métricas
  - Títulos de secciones
  - Encabezados de paneles de control

- **Textos y menús** (Roboto):
  - Textos regulares (Regular - 400):
    - Descripciones de métricas
    - Textos informativos
    - Subtextos
  - Elementos interactivos (Medium - 500):
    - Botones
    - Pestañas
    - Menús

### Tarjetas Métricas
- **Humedad**: Azul corporativo (#6599ad) con fondo rgba(101, 153, 173, 0.15)
- **Temperatura**: Amarillo (#FFC107) con fondo rgba(255, 193, 7, 0.15)
- **Flujo de agua**: Verde (#39B54A) con fondo rgba(57, 181, 74, 0.15)
- **Ahorro**: Azul oscuro (#1C2E3E) con fondo rgba(28, 46, 62, 0.15)

## 🚀 Tecnologías

- **Next.js 14** - Framework React para producción
- **Bootstrap 5** - Framework CSS responsive
- **Chart.js** - Biblioteca de gráficos interactivos
- **React Chart.js 2** - Wrapper de Chart.js para React
- **JavaScript** - Sin TypeScript para máxima simplicidad

## ✨ Características Principales

- 📊 **Dashboard en Tiempo Real** - Monitoreo continuo de métricas de riego
- 📈 **Gráficos Interactivos** - Visualización de humedad, temperatura y flujo de agua
- 🎛️ **Control Manual** - Control directo de sistemas de riego
- 🌡️ **Múltiples Zonas** - Gestión de 4 zonas de cultivo diferentes
- 💧 **Ahorro de Agua** - Tracking de eficiencia vs. riego tradicional
- 📱 **Diseño Responsive** - Optimizado para desktop, tablet y móvil
- 🔄 **Estados Dinámicos** - 3 estados: Óptimo, Necesita Riego, Regando

## 📦 Instalación

### Prerrequisitos

- Node.js 16.x o superior
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone git@github.com:DrojasFrontend/agronica-app.git
cd agronica-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 🏗️ Build para Producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
agronica-app/
├── components/              # Componentes React
│   ├── Header.js           # Cabecera con logo y controles
│   ├── CampoBanner.js      # Banner de información del campo
│   ├── ZoneTabs.js         # Pestañas de zonas de cultivo
│   ├── MetricsSection.js   # Tarjetas de métricas con estados
│   ├── ChartSection.js     # Gráficos históricos interactivos
│   └── ControlPanel.js     # Panel de control y resumen
├── data/                    # Datos JSON
│   └── zones.json          # Configuración de zonas y métricas
├── pages/                   # Páginas Next.js
│   ├── _app.js             # Configuración global de la app
│   ├── _document.js        # HTML base
│   └── index.js            # Página principal (dashboard)
├── styles/                  # Estilos CSS
│   └── globals.css         # Estilos globales personalizados
├── public/                  # Archivos estáticos
├── .gitignore              # Archivos ignorados por Git
├── .gitattributes          # Configuración de Git
├── next.config.js          # Configuración de Next.js
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo
```

## 🎨 Componentes

### 🏠 Header
Barra superior con:
- Logo y nombre de la aplicación
- Fecha y hora actual
- Notificaciones (badge con contador)
- Botón de exportación de datos

### 📊 CampoBanner
Banner informativo con:
- Nombre y ubicación del campo
- 4 métricas principales: Zonas activas, Sensores, Válvulas, Ahorro promedio
- Degradado de color verde a azul

### 🗂️ ZoneTabs
Navegación entre zonas:
- 4 zonas de cultivo (Paltos, Tomates, Lechugas, Maíz)
- Información de área y sensores
- Estado visual con iconos

### 💧 MetricsSection
4 tarjetas de métricas con colores temáticos:
- **Humedad** (azul) - Con barra de progreso
- **Temperatura** (naranja) - Con rango óptimo
- **Flujo de agua** (verde) - En litros/minuto
- **Ahorro** (morado) - Vs. riego tradicional

### 📈 ChartSection
Gráficos históricos:
- Selector de rango temporal (24h, 7 días, 30 días)
- 3 métricas: Humedad, Temperatura, Riego Activo
- Valores actuales debajo del gráfico
- Card de programación de riego

### 🎛️ ControlPanel
Panel lateral con:
- Botones de control manual (Iniciar, Pausar, Reiniciar, Configurar)
- Estado del sistema (Sensores, Válvulas, Presión, Conectividad)
- Resumen del día (Agua utilizada/ahorrada, Tiempo, Eficiencia)

## 🗂️ Datos JSON

El archivo `data/zones.json` contiene la configuración de cada zona:

```json
{
  "id": 0,
  "name": "Sector Norte - Paltos",
  "status": "Óptimo",
  "metrics": {
    "humidity": 65,
    "temperature": 22,
    "waterFlow": 0,
    "savings": 45
  }
}
```

## 🎭 Estados de Zona

1. **🟢 Óptimo** - Condiciones ideales, sin necesidad de riego
2. **🟠 Necesita riego** - Humedad baja, se requiere riego pronto
3. **🔵 Regando** - Sistema de riego activo

## 🌐 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo en puerto 3000 |
| `npm run build` | Construye la aplicación para producción |
| `npm start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint para verificar el código |

## 🔧 Configuración

### Variables de Entorno (Opcional)

Crea un archivo `.env.local` para configuraciones personalizadas:

```env
NEXT_PUBLIC_API_URL=http://tu-api.com
NEXT_PUBLIC_CAMPO_NAME=Campo San José
```

## 📱 Responsive Design

- **Desktop** (1400px+): Layout completo de 2 columnas
- **Tablet** (768px-1199px): Adaptación de columnas
- **Móvil** (<768px): Layout de 1 columna apilado

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👥 Autor

Desarrollado por AGRONICA Technologies

## 📧 Contacto

Para preguntas o soporte: info@agronica.com

---

⭐️ Si este proyecto te fue útil, considera darle una estrella en GitHub

