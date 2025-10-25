# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2025-10-17

### Agregado
- ✨ Dashboard inicial con métricas en tiempo real
- 📊 Gráficos interactivos de humedad, temperatura y riego
- 🗂️ Sistema de pestañas para 4 zonas de cultivo
- 🎛️ Panel de control manual de riego
- 📈 Visualización de estado del sistema
- 💧 Seguimiento de ahorro de agua
- 📱 Diseño responsive para mobile, tablet y desktop
- 🎨 Tarjetas de métricas con colores temáticos
- 🔄 Estados dinámicos: Óptimo, Necesita Riego, Regando
- 📅 Programación y tracking de ciclos de riego
- 🔔 Sistema de notificaciones (UI)
- 📥 Botón de exportación de datos (UI)

### Componentes
- `Header` - Barra de navegación superior
- `CampoBanner` - Banner informativo del campo
- `ZoneTabs` - Navegación entre zonas
- `MetricsSection` - Tarjetas de métricas
- `ChartSection` - Gráficos históricos
- `ControlPanel` - Panel de control lateral

### Datos
- `zones.json` - Configuración de zonas con métricas

### Tecnologías
- Next.js 14.0.4
- React 18.2.0
- Bootstrap 5.3.2
- Chart.js 4.4.0
- React Chart.js 2 5.2.0

---

## Formato de Versiones

### [X.Y.Z] - YYYY-MM-DD

### Agregado
Para nuevas funcionalidades.

### Cambiado
Para cambios en funcionalidades existentes.

### Deprecado
Para funcionalidades que serán removidas.

### Removido
Para funcionalidades removidas.

### Corregido
Para corrección de bugs.

### Seguridad
Para vulnerabilidades.

